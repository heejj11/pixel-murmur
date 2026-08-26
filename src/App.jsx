import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  GithubLogo,
  List,
  X,
} from '@phosphor-icons/react'

const objects = [
  {
    id: 'PM-001',
    name: 'Bread Power Bank',
    status: 'Just a Pixel',
    reality: 0,
    image: '/objects/pm-001-bread-power-bank.webp',
    accent: '#824817',
    alt: '토스트가 꽂힌 크림색 토스터 형태의 무선 보조배터리 콘셉트 렌더',
  },
  {
    id: 'PM-002',
    name: 'Cassette Memo Case',
    status: 'Maybe Real',
    reality: 20,
    image: '/objects/pm-002-cassette-memo-case.webp',
    accent: '#45423d',
    alt: '카세트테이프 형태의 크림색 데스크 메모 케이스 콘셉트 렌더',
  },
  {
    id: 'PM-003',
    name: 'Film Roll Tape',
    status: 'Making',
    reality: 50,
    image: '/objects/pm-003-film-roll-tape.webp',
    accent: '#514b3f',
    alt: '필름통과 테이프 디스펜서를 결합한 데스크 오브젝트 콘셉트 렌더',
  },
  {
    id: 'PM-004',
    name: 'Pixel Alarm Clock',
    status: 'Soon',
    reality: 80,
    image: '/objects/pm-004-pixel-alarm-clock.webp',
    accent: '#825000',
    alt: '졸린 픽셀 표정을 띄운 작은 CRT 모니터 형태의 알람시계 콘셉트 렌더',
  },
  {
    id: 'PM-005',
    name: 'Folding Mood Lamp',
    status: 'Shelved',
    reality: 0,
    image: '/objects/pm-005-folding-mood-lamp.webp',
    accent: '#4e4d45',
    alt: '작은 초승달 상태창이 있는 접이식 데스크 무드등 콘셉트 렌더',
  },
]

function PixelFace({ small = false }) {
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

function StatusGlyph() {
  return <span className="status-glyph" aria-hidden="true" />
}

function ProductImage({ src, alt, eager = false, className = '' }) {
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

function Header() {
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
      <a className="nav-wordmark" href="#top" aria-label="PixelMurmur home">
        PixelMurmur
      </a>
      <nav
        className={`site-nav ${open ? 'is-open' : ''}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        <a href="#objects" onClick={closeMenu}>Objects</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#journal" onClick={closeMenu}>Journal</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
      <div className="nav-actions">
        <a
          className="nav-mark"
          href="#objects"
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

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 className="display-wordmark" id="hero-title">PIXELMURMUR</h1>
        <p className="hero-line">Things that don&apos;t exist.<br />Yet.</p>
        <p className="hero-korean" lang="ko">
          있었으면 하는 물건을 디자인합니다.<br />
          현재 대부분은 픽셀로만 존재합니다.
        </p>
        <a className="quiet-cta" href="#contact">
          <span>
            <strong>Want to make it real?</strong>
            <span lang="ko">제작, 협업, 라이선스 제안을 기다립니다.</span>
          </span>
          <ArrowRight size={20} weight="bold" aria-hidden="true" />
        </a>
      </div>

      <div className="hero-object" aria-label="Featured object PM-001 Bread Power Bank">
        <ProductImage
          className="hero-render"
          src={objects[0].image}
          alt={objects[0].alt}
          eager
        />
      </div>

      <div className="hero-meta">
        <div>
          <span className="meta-label">PM-001</span>
          <strong>Bread<br />Power Bank</strong>
        </div>
        <div className="status-chip">
          <StatusGlyph />
          <span>Just a Pixel</span>
        </div>
        <div className="reality-row">
          <span>Reality</span>
          <strong>0%</strong>
          <span className="reality-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

function ObjectCard({ object }) {
  return (
    <article className="object-card" style={{ '--object-accent': object.accent }}>
      <ProductImage src={object.image} alt={object.alt} />
      <div className="object-card__title">
        <span>{object.id}</span>
        <h3>{object.name}</h3>
      </div>
      <div className="object-card__status">
        <span><StatusGlyph />{object.status}</span>
      </div>
      <div className="object-card__reality">
        <span>Reality</span>
        <strong>{object.reality}%</strong>
        <span
          className="reality-ticks"
          aria-label={`Reality ${object.reality} percent`}
          style={{ '--reality': `${object.reality}%` }}
        />
      </div>
    </article>
  )
}

function Archive() {
  return (
    <section className="archive" id="objects" aria-labelledby="archive-title">
      <div className="section-heading archive-heading">
        <h2 id="archive-title">Unmade Objects</h2>
        <a href="#about">About the archive <ArrowRight size={16} weight="bold" /></a>
      </div>
      <div className="object-grid">
        {objects.map((object) => <ObjectCard key={object.id} object={object} />)}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-statement">
        <h2 id="about-title">Currently: pixels.<br />Hopefully: objects.</h2>
      </div>
      <div className="about-copy">
        <p lang="ko">
          PixelMurmur는 아직 실물이 되지 않은 아이디어를 조용히 쌓아두는 곳입니다.
          완성된 제품보다, 만들어질 가능성이 있는 순간을 기록합니다.
        </p>
        <p>
          Some will remain images. Some may become prototypes. Each object stays public
          while it waits for the right maker.
        </p>
      </div>
      <div className="pixel-window" aria-hidden="true">
        <PixelFace />
      </div>
    </section>
  )
}

function Journal() {
  return (
    <section className="journal" id="journal" aria-labelledby="journal-title">
      <div className="journal-heading">
        <h2 id="journal-title">From pixel to object</h2>
        <p lang="ko">REALITY는 아이디어가 실제 물건에 가까워지는 과정을 기록합니다.</p>
      </div>
      <ol className="reality-scale" aria-label="Reality scale">
        {[
          ['0%', 'Concept'],
          ['20%', 'Sourcing'],
          ['50%', 'Prototype'],
          ['80%', 'Production'],
          ['100%', 'Real'],
        ].map(([value, label]) => (
          <li key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">Can you make this?</h2>
        <p>For production, collaboration, or licensing, send us a note.</p>
        <a className="contact-email" href="mailto:hello@pixelmurmur.com">
          hello@pixelmurmur.com
        </a>
        <p className="contact-korean" lang="ko">픽셀을 물건으로 바꿀 수 있다면, 이야기해 주세요.</p>
      </div>
      <a
        className="primary-button"
        href="mailto:hello@pixelmurmur.com?subject=PixelMurmur%20inquiry"
      >
        Send an inquiry
        <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
      </a>
    </section>
  )
}

function Footer() {
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

export default function App() {
  return (
    <div className="site-shell" id="top">
      <Header />
      <main>
        <Hero />
        <Archive />
        <About />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
