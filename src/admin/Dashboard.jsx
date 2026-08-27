import { useCallback, useEffect, useState } from 'react'
import {
  ArrowClockwise,
  ArrowSquareOut,
  CheckCircle,
  InstagramLogo,
  WarningCircle,
  XLogo,
} from '@phosphor-icons/react'
import FollowerChart from './components/FollowerChart'
import { invokePlatformSync, loadAdminData, loadDemoData } from './adminData'

const ranges = [7, 30, 90]

const platformCopy = {
  all: {
    title: 'Social overview',
    titleKo: '소셜 전체 현황',
    description: 'Instagram과 X의 흐름을 한곳에서 확인합니다.',
  },
  instagram: {
    title: 'Instagram',
    titleKo: '인스타그램',
    description: '도달, 조회, 저장과 게시물 반응을 확인합니다.',
  },
  x: {
    title: 'X',
    titleKo: '엑스',
    description: '노출, 조회와 공개 참여 지표를 확인합니다.',
  },
}

const statusCopy = {
  pending: ['Pending / 연결 대기', 'pending'],
  syncing: ['Syncing / 동기화 중', 'syncing'],
  success: ['OK / 정상', 'success'],
  partial: ['Partial / 일부 수집', 'partial'],
  error: ['Error / 연결 오류', 'error'],
}

function formatNumber(value) {
  return new Intl.NumberFormat('ko-KR').format(value ?? 0)
}

function formatCompact(value) {
  return new Intl.NumberFormat('ko-KR', {
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value ?? 0)
}

function formatDateTime(value) {
  if (!value) return '동기화 기록 없음'
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function formatPublished(value) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value))
}

function truncate(value, length = 62) {
  if (!value) return '캡션 없음'
  return value.length > length ? `${value.slice(0, length).trim()}…` : value
}

function MetricLedger({ summary }) {
  const metrics = [
    {
      label: 'Followers',
      labelKo: '현재 팔로워',
      value: summary.followers,
      detail: `${summary.followerDelta >= 0 ? '+' : ''}${formatNumber(summary.followerDelta)} 기간 변화`,
    },
    {
      label: 'Views / impressions',
      labelKo: '조회·노출',
      value: summary.views,
      detail: '플랫폼 제공값 기준',
    },
    {
      label: 'Reach',
      labelKo: '도달',
      value: summary.reach,
      detail: '제공되지 않으면 0',
    },
    {
      label: 'Engagements',
      labelKo: '참여 합계',
      value: summary.engagements,
      detail: `좋아요 ${formatCompact(summary.likes)} · 댓글 ${formatCompact(summary.comments)}`,
    },
  ]

  return (
    <dl className="admin-metric-ledger">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt>
            <span>{metric.label}</span>
            <span lang="ko">{metric.labelKo}</span>
          </dt>
          <dd>{formatCompact(metric.value)}</dd>
          <span>{metric.detail}</span>
        </div>
      ))}
    </dl>
  )
}

function AccountStatus({ account }) {
  const Icon = account.platform === 'instagram' ? InstagramLogo : XLogo
  const [statusKo, status] = statusCopy[account.sync_status] ?? statusCopy.pending

  return (
    <article className="admin-account-row">
      <div className={`admin-platform-icon admin-platform-icon--${account.platform}`}>
        <Icon size={20} weight="bold" aria-hidden="true" />
      </div>
      <div>
        <strong>{account.platform === 'instagram' ? 'Instagram' : 'X'}</strong>
        <a href={account.profile_url} target="_blank" rel="noreferrer">
          @{account.username}
          <ArrowSquareOut size={13} weight="bold" aria-hidden="true" />
        </a>
      </div>
      <div>
        <span className={`admin-status admin-status--${status}`}>{statusKo}</span>
        <small>{formatDateTime(account.last_synced_at)}</small>
      </div>
      {account.last_sync_error && (
        <p role="status">
          <WarningCircle size={15} weight="fill" aria-hidden="true" />
          {account.last_sync_error}
        </p>
      )}
    </article>
  )
}

function PerformanceTable({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="admin-empty">
        <strong>선택 기간의 게시물이 없습니다.</strong>
        <span>기간을 넓히거나 첫 동기화를 실행해 주세요.</span>
      </div>
    )
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-performance-table">
        <thead>
          <tr>
            <th>Post / 게시물</th>
            <th>Platform / 플랫폼</th>
            <th>Date / 게시일</th>
            <th>Views / 조회·노출</th>
            <th>Likes / 좋아요</th>
            <th>Replies / 댓글</th>
            <th>Shares / 공유</th>
            <th aria-label="게시물 원문" />
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const metrics = post.metrics
            const visibility = metrics.views ?? metrics.impressions ?? 0
            return (
              <tr key={post.id}>
                <td data-label="Post / 게시물">
                  <div className="admin-post-cell">
                    <span className="admin-post-thumb">
                      {post.thumbnail_url ? (
                        <img src={post.thumbnail_url} alt="" loading="lazy" />
                      ) : (
                        post.platform === 'instagram' ? 'IG' : 'X'
                      )}
                    </span>
                    <span title={post.caption}>{truncate(post.caption)}</span>
                  </div>
                </td>
                <td data-label="Platform / 플랫폼"><span className={`admin-platform-label admin-platform-label--${post.platform}`}>{post.platform}</span></td>
                <td data-label="Date / 게시일">{formatPublished(post.published_at)}</td>
                <td data-label="Views / 조회·노출">{formatNumber(visibility)}</td>
                <td data-label="Likes / 좋아요">{formatNumber(metrics.likes)}</td>
                <td data-label="Replies / 댓글">{formatNumber(metrics.comments)}</td>
                <td data-label="Shares / 공유">{formatNumber(metrics.shares)}</td>
                <td data-label="Original / 원문">
                  <a className="admin-row-link" href={post.url} target="_blank" rel="noreferrer" aria-label="게시물 원문 열기">
                    <ArrowSquareOut size={16} weight="bold" aria-hidden="true" />
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="admin-skeleton" aria-label="통계를 불러오는 중" role="status">
      <span /><span /><span /><span />
    </div>
  )
}

export default function Dashboard({ platform = 'all', demo = false }) {
  const [days, setDays] = useState(30)
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [syncStatus, setSyncStatus] = useState('idle')
  const [syncMessage, setSyncMessage] = useState('')
  const copy = platformCopy[platform]

  const refresh = useCallback(async () => {
    setStatus('loading')
    setData(null)
    setErrorMessage('')
    try {
      const nextData = demo ? loadDemoData(days, platform) : await loadAdminData(days, platform)
      setData(nextData)
      setStatus('success')
      return true
    } catch (error) {
      setErrorMessage(error.message ?? '통계를 불러오지 못했습니다.')
      setStatus('error')
      return false
    }
  }, [days, demo, platform])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function handleSync() {
    if (demo) return
    setSyncStatus('loading')
    setSyncMessage('')
    setErrorMessage('')
    const platforms = platform === 'all' ? ['instagram', 'x'] : [platform]

    try {
      const results = await Promise.allSettled(platforms.map(invokePlatformSync))
      const refreshed = await refresh()
      if (!refreshed) {
        setSyncStatus('idle')
        return
      }
      const failedCount = results.filter((result) => result.status === 'rejected').length
      const partialCount = results.filter(
        (result) => result.status === 'fulfilled' && result.value.status === 'partial',
      ).length

      if (failedCount === platforms.length) {
        setSyncStatus('error')
        setSyncMessage('Sync failed / 동기화에 실패했습니다. 연결 상태를 확인해 주세요.')
      } else if (failedCount > 0 || partialCount > 0) {
        setSyncStatus('partial')
        setSyncMessage('Partially updated / 성공한 데이터는 반영했지만 일부 지표를 수집하지 못했습니다.')
      } else {
        setSyncStatus('success')
        setSyncMessage('Updated / 최신 통계를 저장했습니다.')
      }
    } catch (error) {
      setSyncStatus('error')
      setSyncMessage(error.message ?? 'Sync failed / 수동 동기화에 실패했습니다.')
    }
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-page-header">
        <div>
          <h1>{copy.title}</h1>
          <p><span lang="ko">{copy.titleKo}</span> · {copy.description}</p>
        </div>
        <div className="admin-header-actions">
          <div className="admin-range" role="group" aria-label="통계 기간">
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                aria-pressed={days === range}
                onClick={() => setDays(range)}
              >
                {range}D / {range}일
              </button>
            ))}
          </div>
          <button
            className="admin-sync-button"
            type="button"
            onClick={handleSync}
            disabled={syncStatus === 'loading' || demo}
            title={demo ? '개발 미리보기에서는 동기화할 수 없습니다.' : undefined}
          >
            <ArrowClockwise
              className={syncStatus === 'loading' ? 'is-spinning' : ''}
              size={17}
              weight="bold"
              aria-hidden="true"
            />
            <span>{syncStatus === 'loading' ? 'Syncing / 수집 중…' : 'Sync / 지금 동기화'}</span>
          </button>
        </div>
      </header>

      {demo && (
        <p className="admin-notice admin-notice--demo">
          개발용 예시 데이터입니다. 운영 빌드에는 표시되지 않습니다.
        </p>
      )}
      {errorMessage && (
        <div className="admin-notice admin-notice--error" role="alert">
          <WarningCircle size={18} weight="fill" aria-hidden="true" />
          <span>{errorMessage}</span>
          <button type="button" onClick={refresh}>Retry / 다시 시도</button>
        </div>
      )}
      {syncStatus === 'success' && (
        <div className="admin-notice admin-notice--success" role="status">
          <CheckCircle size={18} weight="fill" aria-hidden="true" />
          {syncMessage}
        </div>
      )}
      {syncStatus === 'partial' && (
        <div className="admin-notice admin-notice--partial" role="status">
          <WarningCircle size={18} weight="fill" aria-hidden="true" />
          {syncMessage}
        </div>
      )}
      {syncStatus === 'error' && syncMessage && (
        <div className="admin-notice admin-notice--error" role="alert">
          <WarningCircle size={18} weight="fill" aria-hidden="true" />
          {syncMessage}
        </div>
      )}

      {status === 'loading' && !data ? <DashboardSkeleton /> : data && (
        <>
          <MetricLedger summary={data.summary} />

          <section className="admin-chart-section" aria-labelledby="follower-trend-title">
            <div className="admin-section-heading">
              <div>
                <h2 id="follower-trend-title">Follower trend <span lang="ko">팔로워 추이</span></h2>
                <p>{days}일 동안 매일 저장된 계정 스냅샷</p>
              </div>
              <div className="admin-chart-legend" aria-label="그래프 범례">
                {platform !== 'x' && <span><i className="is-instagram" />Instagram</span>}
                {platform !== 'instagram' && <span><i className="is-x" />X</span>}
              </div>
            </div>
            <FollowerChart series={data.followerSeries} />
          </section>

          <section className="admin-accounts-section" aria-labelledby="connection-status-title">
            <div className="admin-section-heading">
              <div>
                <h2 id="connection-status-title">Connections <span lang="ko">연결 상태</span></h2>
                <p>마지막 동기화 {formatDateTime(data.lastSyncedAt)}</p>
              </div>
            </div>
            <div className="admin-account-list">
              {data.accounts.length > 0 ? data.accounts.map((account) => (
                <AccountStatus key={account.id} account={account} />
              )) : (
                <div className="admin-empty">
                  <strong>연결된 계정이 없습니다.</strong>
                  <span>마이그레이션과 Edge Function 설정을 확인해 주세요.</span>
                </div>
              )}
            </div>
          </section>

          <section className="admin-posts-section" aria-labelledby="post-performance-title">
            <div className="admin-section-heading">
              <div>
                <h2 id="post-performance-title">Recent post performance <span lang="ko">최근 게시물 성과</span></h2>
                <p>선택 기간에 게시된 콘텐츠의 최신 스냅샷</p>
              </div>
              <span>{data.posts.length} posts / 게시물 {data.posts.length}개</span>
            </div>
            <PerformanceTable posts={data.posts} />
          </section>
        </>
      )}
    </div>
  )
}
