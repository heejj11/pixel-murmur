import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { objects } from './catalog'
import { Footer, Header, ProductImage, StatusGlyph } from './SiteChrome'

const statusFacts = [
  ['Status', 'Just a Pixel'],
  ['Reality', '0%'],
  ['Category', 'Unmade Object'],
  ['Type', 'Concept Product'],
  ['Possibility', 'Open for Collaboration'],
]

const conceptNotes = [
  {
    title: 'Interaction',
    copy: 'The toast-shaped battery returns to its base, turning charging into a small, familiar gesture.',
  },
  {
    title: 'Material direction',
    copy: 'A warm matte shell, tactile tan control, and dark inset display keep the object charming but grown-up.',
  },
  {
    title: 'Intended place',
    copy: 'Designed to stay visible on a desk, bedside table, or shelf instead of disappearing into a drawer.',
  },
  {
    title: 'Archive note',
    copy: 'This is an illustrative design study. No manufactured or production-ready version exists yet.',
  },
]

function RelatedObject({ object }) {
  return (
    <article className="related-object" style={{ '--object-accent': object.accent }}>
      <ProductImage src={object.image} alt={object.alt} />
      <div className="related-object__meta">
        <span>{object.id}</span>
        <h3>{object.name}</h3>
        <span className="related-object__status"><StatusGlyph />{object.status}</span>
      </div>
    </article>
  )
}

export default function ProductDetail() {
  const object = objects[0]

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Bread Power Bank — PixelMurmur'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="site-shell detail-shell" id="top">
      <Header />
      <main className="product-detail">
        <section className="detail-hero" aria-labelledby="detail-title">
          <div className="detail-trail">
            <a href="/#objects">
              <ArrowLeft size={15} weight="bold" aria-hidden="true" />
              Back to objects
            </a>
            <span>Objects / PM-001</span>
          </div>

          <div className="detail-layout">
            <figure className="detail-figure">
              <ProductImage
                className="detail-render"
                src={object.image}
                alt={object.alt}
                eager
              />
              <figcaption>
                <span>PM_001_OBJECT.webp</span>
                <span>Studio view / 01</span>
              </figcaption>
            </figure>

            <div className="detail-summary">
              <div className="detail-identity">
                <span>{object.id}</span>
                <h1 id="detail-title">Bread<br />Power Bank</h1>
              </div>

              <div className="status-chip">
                <StatusGlyph />
                <span>{object.status}</span>
              </div>

              <div className="detail-reality">
                <span>Reality</span>
                <strong>{object.reality}%</strong>
                <span className="detail-reality__track" aria-hidden="true" />
              </div>

              <div className="detail-intro">
                <p>
                  A familiar breakfast silhouette reimagined as a quiet charging object.
                  The toast-shaped battery and its base turn power into a small daily ritual.
                </p>
                <p lang="ko">
                  식빵과 토스터의 익숙한 동작을 충전 경험으로 바꾼 보조배터리 콘셉트입니다.
                </p>
              </div>

              <a
                className="primary-button"
                href="mailto:hello@pixelmurmur.com?subject=PM-001%20Bread%20Power%20Bank%20inquiry"
              >
                Make this real
                <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="concept-story" aria-labelledby="concept-title">
          <h2 id="concept-title">A small ritual,<br />recharged.</h2>
          <div className="concept-story__copy">
            <p>
              Most batteries disappear into bags and drawers. Bread Power Bank is meant
              to remain visible: a collectible desk object with a useful second life.
            </p>
            <p>
              Returning the toast to its base completes the silhouette and begins charging.
              Until that mechanism is engineered, the idea remains exactly where PixelMurmur
              begins — in pixels.
            </p>
          </div>
          <aside className="concept-story__aside">
            <span>Archive note</span>
            <strong>Currently: pixels.<br />Hopefully: objects.</strong>
          </aside>
        </section>

        <section className="status-ledger" aria-labelledby="status-title">
          <div className="detail-section-heading">
            <h2 id="status-title">Object state</h2>
            <span>Updated / 2026.08</span>
          </div>
          <dl>
            {statusFacts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="detail-notes" aria-labelledby="notes-title">
          <div className="detail-section-heading">
            <h2 id="notes-title">Concept notes</h2>
            <span>Direction, not specification</span>
          </div>
          <div className="detail-notes__grid">
            {conceptNotes.map((note) => (
              <article key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-contact" aria-labelledby="detail-contact-title">
          <div>
            <h2 id="detail-contact-title">Want to make<br />it real?</h2>
            <p>
              For production, collaboration, or licensing inquiries, tell us what you
              could bring to PM-001.
            </p>
            <p lang="ko">이 아이디어를 실제 물건으로 만들 수 있다면 이야기해 주세요.</p>
          </div>
          <a
            className="primary-button"
            href="mailto:hello@pixelmurmur.com?subject=PM-001%20collaboration%20inquiry"
          >
            Contact PixelMurmur
            <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
          </a>
        </section>

        <section className="related" aria-labelledby="related-title">
          <div className="detail-section-heading">
            <h2 id="related-title">Related objects</h2>
            <a href="/#objects">
              View all objects
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <div className="related-grid">
            {objects.slice(1).map((relatedObject) => (
              <RelatedObject key={relatedObject.id} object={relatedObject} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
