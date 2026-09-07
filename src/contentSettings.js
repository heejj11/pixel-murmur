import { hasSupabaseConfig } from './lib/supabaseConfig'

export const DEFAULT_PUBLIC_OBJECT_IDS = new Set(['PM-001', 'PM-002', 'PM-018'])

const DEFAULT_SOCIAL_LINKS = {
  'PM-018': {
    instagram: ['https://www.instagram.com/pixelmurmur/p/Dc7rFxtEkAf/'],
    x: ['https://x.com/pixelmurmur/status/2096759400325394940'],
  },
}

function normalizeSocialUrls(values, legacyValue = null) {
  const source = Array.isArray(values)
    ? values
    : legacyValue
      ? [legacyValue]
      : []

  return [...new Set(source.map((value) => value?.trim()).filter(Boolean))]
}

export function defaultObjectSetting(objectId) {
  const socialLinks = DEFAULT_SOCIAL_LINKS[objectId] ?? { instagram: [], x: [] }

  return {
    object_id: objectId,
    is_published: DEFAULT_PUBLIC_OBJECT_IDS.has(objectId),
    instagram_url: socialLinks.instagram[0] ?? null,
    x_url: socialLinks.x[0] ?? null,
    instagram_urls: [...socialLinks.instagram],
    x_urls: [...socialLinks.x],
  }
}

export function createDefaultObjectSettings(objects) {
  return Object.fromEntries(
    objects.map((object) => [object.id, defaultObjectSetting(object.id)]),
  )
}

export function createHiddenObjectSettings(objects) {
  return Object.fromEntries(
    objects.map((object) => [object.id, {
      ...defaultObjectSetting(object.id),
      is_published: false,
    }]),
  )
}

export function mergeObjectSettings(objects, rows = [], { defaultToHidden = false } = {}) {
  const settings = defaultToHidden
    ? createHiddenObjectSettings(objects)
    : createDefaultObjectSettings(objects)

  for (const row of rows) {
    if (!settings[row.object_id]) continue
    settings[row.object_id] = {
      ...settings[row.object_id],
      ...row,
      is_published: Boolean(row.is_published),
      instagram_url: row.instagram_url || row.instagram_urls?.[0] || null,
      x_url: row.x_url || row.x_urls?.[0] || null,
      instagram_urls: normalizeSocialUrls(row.instagram_urls, row.instagram_url),
      x_urls: normalizeSocialUrls(row.x_urls, row.x_url),
    }
  }

  return settings
}

export function applyObjectSettings(objects, settings) {
  return objects
    .filter((object) => settings[object.id]?.is_published)
    .map((object) => ({
      ...object,
      socialLinks: {
        instagram: normalizeSocialUrls(
          settings[object.id]?.instagram_urls,
          settings[object.id]?.instagram_url,
        ),
        x: normalizeSocialUrls(
          settings[object.id]?.x_urls,
          settings[object.id]?.x_url,
        ),
      },
    }))
}

export async function loadPublicObjectSettings(objects) {
  if (!hasSupabaseConfig) {
    return createDefaultObjectSettings(objects)
  }

  const { supabase } = await import('./lib/supabase')

  const { data, error } = await supabase
    .from('object_publication')
    .select('object_id, is_published, instagram_url, x_url, instagram_urls, x_urls')
    .eq('is_published', true)

  if (error) throw error
  return mergeObjectSettings(objects, data ?? [], { defaultToHidden: true })
}
