import {
  ArrowSquareOut,
  ChartLineUp,
  InstagramLogo,
  SignOut,
  XLogo,
} from '@phosphor-icons/react'

const navItems = [
  { href: '/admin', label: 'Overview', labelKo: '전체 현황', icon: ChartLineUp, platform: 'all' },
  { href: '/admin/instagram', label: 'Instagram', labelKo: '인스타그램', icon: InstagramLogo, platform: 'instagram' },
  { href: '/admin/x', label: 'X', labelKo: '엑스', icon: XLogo, platform: 'x' },
]

export default function AdminShell({ activePlatform, demo = false, userEmail, onSignOut, children }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <a href="/" aria-label="PixelMurmur 홈페이지">
            <span className="admin-brand__mark" aria-hidden="true">PM</span>
            <span>
              <strong>PixelMurmur</strong>
              <small>Social desk / 소셜 데스크</small>
            </span>
          </a>
        </div>

        <nav className="admin-nav" aria-label="관리자 메뉴">
          {navItems.map(({ href, label, labelKo, icon: Icon, platform }) => (
            <a
              key={href}
              href={demo ? `${href}?demo=1` : href}
              aria-current={activePlatform === platform ? 'page' : undefined}
            >
              <Icon size={18} weight="bold" aria-hidden="true" />
              <span>
                <strong>{label}</strong>
                <small>{labelKo}</small>
              </span>
            </a>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noreferrer">
            <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
            <span>Public site / 공개 사이트</span>
          </a>
          <button type="button" onClick={onSignOut}>
            <SignOut size={17} weight="bold" aria-hidden="true" />
            <span>Logout / 로그아웃</span>
          </button>
          <p title={userEmail}>{userEmail}</p>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  )
}
