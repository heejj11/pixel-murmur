import { useEffect, useRef, useState } from 'react'
import { GithubLogo, List, X } from '@phosphor-icons/react'

const statusLabelKo = {
  'Just a Pixel': '아직은 픽셀',
  'Maybe Real': '제작 가능성 검토 중',
  Making: '제작 중',
  Soon: '곧 공개',
  Shelved: '잠시 보류',
}

export function PixelFace({ small = false }) {
  return (
    <span className={`pixel-face${small ? ' pixel-face--small' : ''}`} aria-hidden="true">
      <i className="pixel-face__eye pixel-face__eye--left" />
      <i className="pixel-face__eye pixel-face__eye--right" />
      <i className="pixel-face__mouth pixel-face__mouth--left" />
      <i className="pixel-face__mouth pixel-face__mouth--center" />
      <i className="pixel-face__mouth pixel-face__mouth--right" />
    </span>
  )
}

export function StatusGlyph() {
  return <span className="status-glyph" aria-hidden="true" />
}

export function StatusLabel({ status }) {
  return (
    <span className="status-label">
      <span>{status}</span>
      <span className="status-label__ko" lang="ko">
        {statusLabelKo[status] ?? '상태 미정'}
      </span>
    </span>
  )
}

export function ProductImage({ src, alt, eager = false, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`product-image ${loaded ? 'is-loaded' : ''} ${className}`}>
      {!loaded && !failed && <span className="image-skeleton" aria-hidden="true" />}
      {failed ? (
        <p className="image-error">Render unavailable.</p>
      ) : (
        <img
          src={src}
          alt={alt}
          lang="ko"
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef(null)

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    if (!open) return undefined

    const handleEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      requestAnimationFrame(() => menuButtonRef.current?.focus())
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open])

  return (
    <header className="site-header">
      <a className="nav-wordmark" href="/" aria-label="PixelMurmur home">
        PixelMurmur
      </a>
      <nav
        className={`site-nav ${open ? 'is-open' : ''}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        <a href="/#objects" onClick={closeMenu}>Objects</a>
        <a href="/#about" onClick={closeMenu}>About</a>
        <a href="/#journal" onClick={closeMenu}>Journal</a>
        <a href="/#contact" onClick={closeMenu}>Contact</a>
      </nav>
      <div className="nav-actions">
        <a
          className="nav-mark"
          href="/#objects"
          aria-label="Jump to the object archive"
        >
          <PixelFace small />
        </a>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-wordmark">PixelMurmur</span>
        <span>Unmade Objects</span>
      </div>
      <div className="footer-links">
        <a href="mailto:hello@pixelmurmur.com">hello@pixelmurmur.com</a>
        <a href="https://github.com/heejj11/pixel-murmur" target="_blank" rel="noreferrer">
          <GithubLogo size={18} weight="fill" aria-hidden="true" />
          GitHub
        </a>
        <a href="#top">Back to top</a>
      </div>
      <span>© 2026 PixelMurmur</span>
    </footer>
  )
}
