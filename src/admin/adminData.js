import { supabase } from '../lib/supabase'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function dateKey(date) {
  return new Date(date).toISOString().slice(0, 10)
}

function numeric(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function latestBy(values, keyForValue) {
  const map = new Map()

  for (const value of values) {
    const key = keyForValue(value)
    const current = map.get(key)
    if (!current || new Date(value.captured_at) > new Date(current.captured_at)) {
      map.set(key, value)
    }
  }

  return map
}

function sumMetric(values, metric) {
  return values.reduce((total, value) => total + numeric(value[metric]), 0)
}

function buildFollowerSeries(accounts, accountSnapshots) {
  const byDay = new Map()

  for (const snapshot of accountSnapshots) {
    const account = accounts.find((item) => item.id === snapshot.account_id)
    if (!account || snapshot.followers == null) continue

    const day = dateKey(snapshot.captured_at)
    const current = byDay.get(day) ?? { date: day, instagram: null, x: null }
    current[account.platform] = numeric(snapshot.followers)
    byDay.set(day, current)
  }

  return [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date))
}

export function buildDashboardModel({ accounts, posts, snapshots, days, platform = 'all' }) {
  const start = new Date(Date.now() - (days - 1) * MS_PER_DAY)
  start.setUTCHours(0, 0, 0, 0)
  const selectedAccounts = platform === 'all'
    ? accounts
    : accounts.filter((account) => account.platform === platform)
  const selectedAccountIds = new Set(selectedAccounts.map((account) => account.id))
  const selectedSnapshots = snapshots.filter((snapshot) => (
    selectedAccountIds.has(snapshot.account_id)
    && new Date(snapshot.captured_at) >= start
  ))
  const accountSnapshots = selectedSnapshots.filter((snapshot) => snapshot.post_id == null)
  const postSnapshots = selectedSnapshots.filter((snapshot) => snapshot.post_id != null)
  const latestAccountSnapshots = latestBy(accountSnapshots, (snapshot) => snapshot.account_id)
  const firstAccountSnapshots = new Map()

  for (const snapshot of [...accountSnapshots].sort(
    (a, b) => new Date(a.captured_at) - new Date(b.captured_at),
  )) {
    if (!firstAccountSnapshots.has(snapshot.account_id)) {
      firstAccountSnapshots.set(snapshot.account_id, snapshot)
    }
  }

  const latestPostSnapshots = latestBy(postSnapshots, (snapshot) => snapshot.post_id)
  const selectedPosts = posts
    .filter((post) => selectedAccountIds.has(post.account_id))
    .filter((post) => new Date(post.published_at) >= start)
  const performanceRows = selectedPosts
    .map((post) => {
      const account = selectedAccounts.find((item) => item.id === post.account_id)
      const metrics = latestPostSnapshots.get(post.id) ?? {}
      return {
        ...post,
        platform: account?.platform ?? 'unknown',
        username: account?.username ?? '',
        metrics,
      }
    })
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

  const latestPostMetrics = performanceRows.map((row) => row.metrics)
  const followers = [...latestAccountSnapshots.values()]
    .reduce((total, snapshot) => total + numeric(snapshot.followers), 0)
  const followerDelta = selectedAccounts.reduce((total, account) => {
    const latest = latestAccountSnapshots.get(account.id)
    const first = firstAccountSnapshots.get(account.id)
    return total + numeric(latest?.followers) - numeric(first?.followers)
  }, 0)
  const views = selectedAccounts.reduce((total, account) => {
    const dailyMetrics = accountSnapshots.filter((snapshot) => snapshot.account_id === account.id)
    const hasDailyVisibility = dailyMetrics.some(
      (snapshot) => snapshot.views != null || snapshot.impressions != null,
    )
    const metrics = hasDailyVisibility
      ? dailyMetrics
      : performanceRows
        .filter((row) => row.account_id === account.id)
        .map((row) => row.metrics)

    return total + metrics.reduce(
      (subtotal, snapshot) => subtotal + numeric(snapshot.views ?? snapshot.impressions),
      0,
    )
  }, 0)
  const reach = selectedAccounts.reduce((total, account) => {
    const dailyMetrics = accountSnapshots.filter((snapshot) => snapshot.account_id === account.id)
    const hasDailyReach = dailyMetrics.some((snapshot) => snapshot.reach != null)
    const metrics = hasDailyReach
      ? dailyMetrics
      : performanceRows
        .filter((row) => row.account_id === account.id)
        .map((row) => row.metrics)

    return total + sumMetric(metrics, 'reach')
  }, 0)
  const likes = sumMetric(latestPostMetrics, 'likes')
  const comments = sumMetric(latestPostMetrics, 'comments')
  const shares = sumMetric(latestPostMetrics, 'shares')
  const saves = sumMetric(latestPostMetrics, 'saves')

  return {
    days,
    platform,
    accounts: selectedAccounts,
    followerSeries: buildFollowerSeries(selectedAccounts, accountSnapshots),
    summary: {
      followers,
      followerDelta,
      views,
      reach,
      engagements: likes + comments + shares + saves,
      likes,
      comments,
      shares,
      saves,
    },
    posts: performanceRows.slice(0, 20),
    lastSyncedAt: selectedAccounts
      .map((account) => account.last_synced_at)
      .filter(Boolean)
      .sort()
      .at(-1) ?? null,
  }
}

export async function loadAdminData(days, platform = 'all') {
  if (!supabase) throw new Error('Supabase configuration is missing.')

  const since = new Date(Date.now() - (days - 1) * MS_PER_DAY)
  since.setUTCHours(0, 0, 0, 0)

  const [accountsResult, postsResult, snapshotsResult] = await Promise.all([
    supabase.from('social_accounts').select('*').order('platform'),
    supabase.from('social_posts').select('*').order('published_at', { ascending: false }).limit(100),
    supabase
      .from('social_metric_snapshots')
      .select('*')
      .gte('captured_at', since.toISOString())
      .order('captured_at'),
  ])

  const error = accountsResult.error ?? postsResult.error ?? snapshotsResult.error
  if (error) throw error

  return buildDashboardModel({
    accounts: accountsResult.data ?? [],
    posts: postsResult.data ?? [],
    snapshots: snapshotsResult.data ?? [],
    days,
    platform,
  })
}

export async function invokePlatformSync(platform) {
  if (!supabase) throw new Error('Supabase configuration is missing.')
  const functionName = platform === 'instagram' ? 'sync-instagram' : 'sync-x'
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: { source: 'manual' },
  })

  if (error) throw error
  if (!data?.ok) throw new Error(data?.error ?? `${platform} synchronization failed.`)
  return data
}

function makeDemoData() {
  const accounts = [
    {
      id: 'demo-instagram',
      platform: 'instagram',
      username: 'pixelmurmur',
      profile_url: 'https://www.instagram.com/pixelmurmur/',
      last_synced_at: new Date().toISOString(),
      sync_status: 'success',
      last_sync_error: null,
    },
    {
      id: 'demo-x',
      platform: 'x',
      username: 'pixelmurmur',
      profile_url: 'https://x.com/pixelmurmur',
      last_synced_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      sync_status: 'success',
      last_sync_error: null,
    },
  ]
  const posts = Array.from({ length: 8 }, (_, index) => {
    const isInstagram = index % 2 === 0
    const accountId = isInstagram ? accounts[0].id : accounts[1].id
    return {
      id: `demo-post-${index}`,
      account_id: accountId,
      external_post_id: String(1000 + index),
      url: isInstagram
        ? 'https://www.instagram.com/pixelmurmur/'
        : 'https://x.com/pixelmurmur',
      caption: [
        'PM-017 — Typewriter key magnets. 아직 없는 물건의 키감.',
        'A small archive update: pixels first, objects someday.',
        'PM-016 — 35mm index labeler / 필름 인덱스 라벨러',
        'Which unmade object should become real first?',
      ][index % 4],
      thumbnail_url: null,
      published_at: new Date(Date.now() - index * 2 * MS_PER_DAY).toISOString(),
      metadata: {},
    }
  })
  const snapshots = []

  for (let day = 29; day >= 0; day -= 1) {
    const capturedAt = new Date(Date.now() - day * MS_PER_DAY).toISOString()
    snapshots.push({
      id: `demo-ig-account-${day}`,
      account_id: accounts[0].id,
      post_id: null,
      captured_at: capturedAt,
      followers: 82 + (29 - day) * 2,
      views: 34 + ((29 - day) % 6) * 7,
      reach: 24 + ((29 - day) % 5) * 5,
    })
    snapshots.push({
      id: `demo-x-account-${day}`,
      account_id: accounts[1].id,
      post_id: null,
      captured_at: capturedAt,
      followers: 41 + (29 - day),
      views: null,
      reach: null,
    })
  }

  for (const [index, post] of posts.entries()) {
    snapshots.push({
      id: `demo-metric-${index}`,
      account_id: post.account_id,
      post_id: post.id,
      captured_at: new Date().toISOString(),
      views: 2100 - index * 143,
      reach: post.account_id === accounts[0].id ? 1420 - index * 90 : null,
      impressions: post.account_id === accounts[1].id ? 1870 - index * 105 : null,
      likes: 94 - index * 7,
      comments: 18 - index,
      shares: 12 - Math.floor(index / 2),
      saves: post.account_id === accounts[0].id ? 21 - index : null,
    })
  }

  return { accounts, posts, snapshots }
}

const demoData = makeDemoData()

export function loadDemoData(days, platform = 'all') {
  return buildDashboardModel({ ...demoData, days, platform })
}
