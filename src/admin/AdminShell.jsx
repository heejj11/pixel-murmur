import {
  ArrowSquareOut,
  ChartLineUp,
  Cube,
  InstagramLogo,
  SignOut,
  XLogo,
} from '@phosphor-icons/react'

const navItems = [
  { href: '/admin', label: 'Overview', labelKo: '전체 현황', icon: ChartLineUp, section: 'all' },
  { href: '/admin/objects', label: 'Objects', labelKo: '작품 공개 관리', icon: Cube, section: 'objects' },
  { href: '/admin/instagram', label: 'Instagram', labelKo: '인스타그램', icon: InstagramLogo, section: 'instagram' },
  { href: '/admin/x', label: 'X', labelKo: '엑스', icon: XLogo, section: 'x' },
]

export default function AdminShell({ activeSection, demo = false, userEmail, onSignOut, children }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <a href="/" aria-label="PixelMurmur 홈페이지">
            <span className="admin-brand__mark" aria-hidden="true">PM</span>
            <span>
              <strong>PixelMurmur</strong>
              <small>Studio desk / 운영 데스크</small>
            </span>
          </a>
        </div>

        <nav className="admin-nav" aria-label="관리자 메뉴">
          {navItems.map(({ href, label, labelKo, icon: Icon, section }) => (
            <a
              key={href}
              href={demo ? `${href}?demo=1` : href}
              aria-current={activeSection === section ? 'page' : undefined}
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
