import { hasSupabaseConfig, supabase } from './lib/supabase'

export const DEFAULT_PUBLIC_OBJECT_IDS = new Set(['PM-001', 'PM-002'])

export function defaultObjectSetting(objectId) {
  return {
    object_id: objectId,
    is_published: DEFAULT_PUBLIC_OBJECT_IDS.has(objectId),
    instagram_url: null,
    x_url: null,
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
      instagram_url: row.instagram_url || null,
      x_url: row.x_url || null,
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
        instagram: settings[object.id]?.instagram_url ?? null,
        x: settings[object.id]?.x_url ?? null,
      },
    }))
}

export async function loadPublicObjectSettings(objects) {
  if (!hasSupabaseConfig || !supabase) {
    return createDefaultObjectSettings(objects)
  }

  const { data, error } = await supabase
    .from('object_publication')
    .select('object_id, is_published, instagram_url, x_url')
    .eq('is_published', true)

  if (error) throw error
  return mergeObjectSettings(objects, data ?? [], { defaultToHidden: true })
}
