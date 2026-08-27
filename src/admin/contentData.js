import { objects } from '../catalog'
import {
  createDefaultObjectSettings,
  mergeObjectSettings,
} from '../contentSettings'
import { supabase } from '../lib/supabase'

function normalizeUrl(value) {
  return value.trim() || null
}

export function makeDemoContentRows() {
  const settings = createDefaultObjectSettings(objects)
  return objects.map((object) => ({ ...object, ...settings[object.id] }))
}

export async function loadContentRows() {
  if (!supabase) throw new Error('Supabase configuration is missing.')

  const { data, error } = await supabase
    .from('object_publication')
    .select('object_id, is_published, instagram_url, x_url, updated_at')
    .order('object_id')

  if (error) throw error

  const settings = mergeObjectSettings(objects, data ?? [])
  return objects.map((object) => ({
    ...object,
    ...settings[object.id],
  }))
}

export async function saveContentRows(rows) {
  if (!supabase) throw new Error('Supabase configuration is missing.')

  const payload = rows.map((row) => ({
    object_id: row.object_id,
    is_published: Boolean(row.is_published),
    instagram_url: normalizeUrl(row.instagram_url ?? ''),
    x_url: normalizeUrl(row.x_url ?? ''),
  }))

  const { data, error } = await supabase
    .from('object_publication')
    .upsert(payload, { onConflict: 'object_id' })
    .select('object_id, is_published, instagram_url, x_url, updated_at')

  if (error) throw error
  return data ?? []
}

export function validateSocialUrl(value, platform) {
  if (!value.trim()) return ''

  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:') return 'https:// 주소를 입력해 주세요.'

    const hostname = url.hostname.replace(/^www\./, '').toLowerCase()
    if (platform === 'instagram') {
      const isInstagramPost = hostname === 'instagram.com'
        && /^\/(p|reel|tv)\/[^/]+\/?$/.test(url.pathname)
      if (!isInstagramPost) {
        return 'Instagram 게시물 또는 릴스 주소를 입력해 주세요.'
      }
    }
    if (platform === 'x') {
      const isXPost = ['x.com', 'twitter.com'].includes(hostname)
        && /^\/[^/]+\/status\/\d+\/?$/.test(url.pathname)
      if (!isXPost) {
        return 'X 또는 Twitter 게시물 주소를 입력해 주세요.'
      }
    }
    return ''
  } catch {
    return '올바른 주소 형식으로 입력해 주세요.'
  }
}
