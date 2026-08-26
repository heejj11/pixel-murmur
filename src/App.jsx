import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { objects } from './catalog'
import ProductDetail from './ProductDetail'
import {
  Footer,
  Header,
  PixelFace,
  ProductImage,
  StatusGlyph,
} from './SiteChrome'

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
        <a className="quiet-cta" href="/#contact">
          <span>
            <strong>Want to make it real?</strong>
            <span lang="ko">제작, 협업, 라이선스 제안을 기다립니다.</span>
          </span>
          <ArrowRight size={20} weight="bold" aria-hidden="true" />
        </a>
      </div>

      <a
        className="hero-object"
        href={objects[0].href}
        aria-label="View PM-001 Bread Power Bank"
      >
        <ProductImage
          className="hero-render"
          src={objects[0].image}
          alt={objects[0].alt}
          eager
        />
      </a>

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
  const content = (
    <>
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
    </>
  )

  return (
    <article className="object-card" style={{ '--object-accent': object.accent }}>
      {object.href ? (
        <a className="object-card__link" href={object.href} aria-label={`View ${object.name}`}>
          {content}
        </a>
      ) : content}
    </article>
  )
}

function Archive() {
  return (
    <section className="archive" id="objects" aria-labelledby="archive-title">
      <div className="section-heading archive-heading">
        <h2 id="archive-title">Unmade Objects</h2>
        <a href="/#about">About the archive <ArrowRight size={16} weight="bold" /></a>
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

function Homepage() {
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

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/objects/pm-001') {
    return <ProductDetail />
  }

  return <Homepage />
}
