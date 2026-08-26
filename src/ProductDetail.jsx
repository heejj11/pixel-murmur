import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { objects } from './catalog'
import { Footer, Header, ProductImage, StatusGlyph } from './SiteChrome'

function RelatedObject({ object }) {
  const content = (
    <>
      <ProductImage src={object.image} alt={object.alt} />
      <div className="related-object__meta">
        <span>{object.id}</span>
        <h3>{object.name}</h3>
        <span className="related-object__status"><StatusGlyph />{object.status}</span>
      </div>
    </>
  )

  return (
    <article className="related-object" style={{ '--object-accent': object.accent }}>
      {object.href ? (
        <a href={object.href} aria-label={`View ${object.name}`}>
          {content}
        </a>
      ) : content}
    </article>
  )
}

function ProductGallery({ object }) {
  const gallery = object.gallery.slice(1)

  if (!gallery.length) return null

  return (
    <section className="product-gallery" aria-labelledby="gallery-title">
      <div className="detail-section-heading">
        <h2 id="gallery-title">Object views</h2>
        <span>{object.gallery.length} renders / one concept</span>
      </div>
      <div className="product-gallery__grid">
        {gallery.map((image) => (
          <figure
            className={`gallery-item gallery-item--${image.role}`}
            key={image.role}
          >
            <ProductImage src={image.src} alt={image.alt} />
            <figcaption>
              <span>{image.label}</span>
              <span>{object.id}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default function ProductDetail({ object }) {
  const heroImage = object.gallery[0]
  const statusFacts = [
    ['Status', object.status],
    ['Reality', `${object.reality}%`],
    ['Category', object.category],
    ['Type', 'Concept Product'],
    ['Possibility', 'Open for Collaboration'],
  ]
  const relatedObjects = objects.filter((item) => item.id !== object.id).slice(0, 4)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${object.name} | PixelMurmur`
    window.scrollTo(0, 0)
    return () => {
      document.title = previousTitle
    }
  }, [object])

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
            <span>Objects / {object.id}</span>
          </div>

          <div className="detail-layout">
            <figure className="detail-figure">
              <ProductImage
                className="detail-render"
                src={heroImage.src}
                alt={heroImage.alt}
                eager
              />
              <figcaption>
                <span>{heroImage.label}</span>
                <span>{object.id} / 01</span>
              </figcaption>
            </figure>

            <div className="detail-summary">
              <div className="detail-identity">
                <span>{object.id}</span>
                <h1 id="detail-title">{object.name}</h1>
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
                <p>{object.intro}</p>
                <p lang="ko">{object.introKo}</p>
              </div>

              <a
                className="primary-button"
                href={`mailto:hello@pixelmurmur.com?subject=${encodeURIComponent(`${object.id} ${object.name} inquiry`)}`}
              >
                Make this real
                <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <ProductGallery object={object} />

        <section className="concept-story" aria-labelledby="concept-title">
          <h2 id="concept-title">{object.statement[0]}<br />{object.statement[1]}</h2>
          <div className="concept-story__copy">
            {object.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
            {object.notes.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-contact" aria-labelledby="detail-contact-title">
          <div>
            <h2 id="detail-contact-title">Want to make<br />it real?</h2>
            <p>
              For production, collaboration, or licensing inquiries, tell us what you
              could bring to {object.id}.
            </p>
            <p lang="ko">이 아이디어를 실제 물건으로 만들 수 있다면 이야기해 주세요.</p>
          </div>
          <a
            className="primary-button"
            href={`mailto:hello@pixelmurmur.com?subject=${encodeURIComponent(`${object.id} collaboration inquiry`)}`}
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
            {relatedObjects.map((relatedObject) => (
              <RelatedObject key={relatedObject.id} object={relatedObject} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
