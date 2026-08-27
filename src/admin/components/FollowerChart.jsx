const chartWidth = 760
const chartHeight = 260
const padding = { top: 22, right: 22, bottom: 42, left: 58 }

function formatCompact(value) {
  return new Intl.NumberFormat('ko-KR', {
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value)
}

function formatDate(value) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${value}T00:00:00Z`))
}

export default function FollowerChart({ series }) {
  const values = series.flatMap((point) => [point.instagram, point.x]).filter(Number.isFinite)

  if (values.length === 0) {
    return (
      <div className="admin-empty admin-empty--chart">
        <strong>아직 팔로워 기록이 없습니다.</strong>
        <span>첫 동기화가 끝나면 일별 변화가 이곳에 표시됩니다.</span>
      </div>
    )
  }

  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const spread = Math.max(maxValue - minValue, 8)
  const minY = Math.max(0, minValue - spread * 0.14)
  const maxY = maxValue + spread * 0.14
  const plotWidth = chartWidth - padding.left - padding.right
  const plotHeight = chartHeight - padding.top - padding.bottom
  const x = (index) => padding.left + (series.length <= 1 ? plotWidth / 2 : index / (series.length - 1) * plotWidth)
  const y = (value) => padding.top + (maxY - value) / (maxY - minY) * plotHeight
  const pathFor = (platform) => series
    .map((point, index) => Number.isFinite(point[platform])
      ? { x: x(index), y: y(point[platform]) }
      : null)
    .filter(Boolean)
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(' ')
  const gridValues = [0, 0.5, 1].map((ratio) => minY + (maxY - minY) * ratio)
  const lastInstagram = [...series].reverse().find((point) => Number.isFinite(point.instagram))
  const lastX = [...series].reverse().find((point) => Number.isFinite(point.x))

  return (
    <div className="follower-chart">
      <svg
        role="img"
        aria-labelledby="follower-chart-title follower-chart-description"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        <title id="follower-chart-title">Instagram과 X의 팔로워 추이</title>
        <desc id="follower-chart-description">
          선택 기간 동안 수집한 일별 팔로워 수를 비교하는 선 그래프입니다.
        </desc>
        {gridValues.map((value) => {
          const gridY = y(value)
          return (
            <g key={value}>
              <line
                className="follower-chart__grid"
                x1={padding.left}
                x2={chartWidth - padding.right}
                y1={gridY}
                y2={gridY}
              />
              <text className="follower-chart__axis" x={padding.left - 12} y={gridY + 4} textAnchor="end">
                {formatCompact(Math.round(value))}
              </text>
            </g>
          )
        })}
        <path className="follower-chart__line follower-chart__line--instagram" d={pathFor('instagram')} />
        <path className="follower-chart__line follower-chart__line--x" d={pathFor('x')} />
        {lastInstagram && (
          <circle
            className="follower-chart__point follower-chart__point--instagram"
            cx={x(series.indexOf(lastInstagram))}
            cy={y(lastInstagram.instagram)}
            r="4"
          />
        )}
        {lastX && (
          <circle
            className="follower-chart__point follower-chart__point--x"
            cx={x(series.indexOf(lastX))}
            cy={y(lastX.x)}
            r="4"
          />
        )}
        <text className="follower-chart__axis" x={padding.left} y={chartHeight - 13}>
          {formatDate(series[0].date)}
        </text>
        <text className="follower-chart__axis" x={chartWidth - padding.right} y={chartHeight - 13} textAnchor="end">
          {formatDate(series.at(-1).date)}
        </text>
      </svg>
      <table className="visually-hidden">
        <caption>팔로워 추이 원본 데이터</caption>
        <thead>
          <tr><th>날짜</th><th>Instagram</th><th>X</th></tr>
        </thead>
        <tbody>
          {series.map((point) => (
            <tr key={point.date}>
              <th>{point.date}</th>
              <td>{point.instagram ?? '-'}</td>
              <td>{point.x ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
