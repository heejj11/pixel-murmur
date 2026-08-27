import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { featuredObject, findObjectByPath, objects } from './catalog'
import { getObjectCopyKo } from './koreanCopy'
import ProductDetail from './ProductDetail'
import {
  Footer,
  Header,
  ProductImage,
  StatusLabel,
} from './SiteChrome'

const archiveCollections = [
  { id: 'all', label: 'All Objects', labelKo: '전체' },
  { id: 'toast', label: 'Toast Series', labelKo: '토스트 시리즈' },
  { id: 'stationery', label: 'Retro Stationery', labelKo: '레트로 문구' },
]

function Hero() {
  const showcaseObjects = [objects[0], objects[8], objects[3], objects[10]]
  const [activeObjectId, setActiveObjectId] = useState(featuredObject.id)
  const object = showcaseObjects.find((item) => item.id === activeObjectId) ?? featuredObject

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 className="display-wordmark" id="hero-title">
          PIXEL<br />MURMUR
        </h1>
        <p className="hero-line">
          Ideas waiting to become objects.
          <span lang="ko">물건이 되기를 기다리는 아이디어들.</span>
        </p>
        <p className="hero-korean" lang="ko">
          있었으면 하는 물건을 먼저 그려 봅니다.<br />
          지금은 픽셀이지만, 언젠가는 실물이 될지도 모릅니다.
        </p>
      </div>

      <div
        className="hero-showcase"
        id="showcase-panel"
        style={{ '--object-accent': object.accent }}
        aria-live="polite"
      >
        <div className="hero-stage" key={object.id}>
          <ProductImage
            className="hero-render"
            src={object.image}
            alt={object.alt}
            eager
          />
        </div>
        <div className="hero-showcase__caption">
          <div>
            <span>{object.id}</span>
            <h2>{object.name}</h2>
            <p lang="ko">{object.nameKo}</p>
          </div>
          <a className="quiet-cta" href={object.href}>
            <span className="action-copy">
              <span>Open dossier</span>
              <span lang="ko">상세 보기</span>
            </span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero-picker">
        <p>
          Choose an object <span lang="ko">오브젝트 고르기</span>
        </p>
        <div className="hero-picker__list" role="group" aria-label="대표 오브젝트 선택">
          {showcaseObjects.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-controls="showcase-panel"
              aria-pressed={item.id === object.id}
              onClick={() => setActiveObjectId(item.id)}
            >
              <span className="hero-picker__id">{item.id}</span>
              <span className="hero-picker__name">
                <span>{item.name}</span>
                <span lang="ko">{item.nameKo}</span>
              </span>
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ObjectCard({ object, index }) {
  const copyKo = getObjectCopyKo(object)

  return (
    <article
      className="object-card"
      style={{ '--object-accent': object.accent, '--card-index': index }}
    >
      <a
        className="object-card__link"
        href={object.href}
        aria-label={`View ${object.name} / ${object.nameKo} 보기`}
      >
        <div className="object-card__stage">
          <ProductImage src={object.image} alt={object.alt} />
        </div>
        <div className="object-card__caption">
          <div className="object-card__title">
            <span>{object.id}</span>
            <h3>{object.name}</h3>
            <p lang="ko">{object.nameKo}</p>
          </div>
          <ArrowUpRight className="object-card__arrow" size={20} weight="bold" aria-hidden="true" />
        </div>
        <div className="object-card__details">
          <span className="object-card__detail object-card__detail--category">
            <span>{object.category}</span>
            <span lang="ko">{copyKo.category}</span>
          </span>
          <StatusLabel status={object.status} />
          <span className="object-card__detail">
            <span>Reality {object.reality}%</span>
            <span lang="ko">실현도 {object.reality}%</span>
          </span>
        </div>
      </a>
    </article>
  )
}

function Archive() {
  const [activeCollection, setActiveCollection] = useState('all')
  const visibleObjects = activeCollection === 'all'
    ? objects
    : objects.filter((object) => object.collection === activeCollection)

  return (
    <section className="archive" id="objects" aria-labelledby="archive-title">
      <div className="archive-intro">
        <h2 className="paired-display" id="archive-title">
          Pick something<br />worth making.
          <span lang="ko">만들 가치가 있는<br />물건을 골라 보세요.</span>
        </h2>
        <p lang="ko">
          완성된 상품 대신, 아직 세상에 없는 가능성을 둘러보세요.
        </p>
      </div>
      <div className="collection-filter" role="group" aria-label="작품 컬렉션 필터">
        {archiveCollections.map((collection) => {
          const count = collection.id === 'all'
            ? objects.length
            : objects.filter((object) => object.collection === collection.id).length

          return (
            <button
              key={collection.id}
              type="button"
              aria-controls="object-grid"
              aria-pressed={activeCollection === collection.id}
              onClick={() => setActiveCollection(collection.id)}
            >
              <span className="collection-filter__name">
                <span>{collection.label}</span>
                <span lang="ko">{collection.labelKo}</span>
              </span>
              <span className="collection-filter__count" aria-hidden="true">
                {String(count).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {visibleObjects.length} objects. {visibleObjects.length}개의 작품을 표시합니다.
      </p>
      <div className="object-grid" id="object-grid" key={activeCollection}>
        {visibleObjects.length > 0 ? (
          visibleObjects.map((object, index) => (
            <ObjectCard
              key={object.id}
              object={object}
              index={index}
            />
          ))
        ) : (
          <p className="archive-empty">
            No objects are public in this collection yet.<br />
            <span lang="ko">이 컬렉션에는 아직 공개된 작품이 없습니다.</span>
          </p>
        )}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-statement">
        <h2 className="paired-display about-heading" id="about-title">
          <span className="about-heading__line">Currently: pixels.</span>
          <span className="about-heading__line">Hopefully: objects.</span>
          <span lang="ko">
            <span className="about-heading__line">지금은 픽셀.</span>
            <span className="about-heading__line">언젠가는 물건.</span>
          </span>
        </h2>
      </div>
      <div className="about-copy">
        <p>
          PixelMurmur keeps ideas public before they become physical. Some will remain
          images, while others may become prototypes with the right maker.
        </p>
        <p lang="ko">
          PixelMurmur는 아이디어가 실물이 되기 전부터 공개된 채로 보관합니다.
          어떤 것은 이미지로 남고, 어떤 것은 맞는 제작자를 만나 시제품이 될 수 있습니다.
        </p>
      </div>
      <div
        className="about-counter"
        aria-label={`${objects.length} unmade objects / 아직 없는 물건 ${objects.length}개`}
      >
        <strong>{String(objects.length).padStart(2, '0')}</strong>
        <span className="about-counter__label">
          <span>unmade<br />objects</span>
          <span lang="ko">아직 없는<br />물건들</span>
        </span>
      </div>
    </section>
  )
}

function Journal() {
  const realityStages = [
    ['0', 'Concept', '아이디어'],
    ['20', 'Sourcing', '제작 검토'],
    ['50', 'Prototype', '시제품'],
    ['80', 'Production', '생산 준비'],
    ['100', 'Real', '실물'],
  ]

  return (
    <section className="journal" id="journal" aria-labelledby="journal-title">
      <div className="journal-heading">
        <h2 id="journal-title">
          From pixel to object <span lang="ko">픽셀에서 물건으로</span>
        </h2>
        <p>
          REALITY records how close an idea is to becoming a physical object.
          <span lang="ko">REALITY는 아이디어가 실제 물건에 가까워지는 단계를 기록합니다.</span>
        </p>
      </div>
      <ol className="reality-scale" aria-label="아이디어가 실물이 되는 단계">
        {realityStages.map(([value, label, labelKo]) => (
          <li key={value}>
            <strong>
              <span className="reality-scale__value">{value}</span>
              <span className="reality-scale__unit">%</span>
            </strong>
            <span className="reality-scale__label">
              <span>{label}</span>
              <span lang="ko">{labelKo}</span>
            </span>
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
        <h2 className="paired-display" id="contact-title">
          Can you make this?
          <span lang="ko">이걸 만들 수 있나요?</span>
        </h2>
        <p>For production, collaboration, or licensing, send us a note.</p>
        <a className="contact-email" href="mailto:hello@pixelmurmur.com">
          hello@pixelmurmur.com
        </a>
        <p className="contact-korean" lang="ko">
          제작, 협업, 라이선스에 관한 이야기를 보내 주세요. 픽셀을 물건으로 바꿀 수 있다면 더욱 좋습니다.
        </p>
      </div>
      <a
        className="primary-button"
        href="mailto:hello@pixelmurmur.com?subject=PixelMurmur%20inquiry"
      >
        <span className="action-copy">
          <span>Send an inquiry</span>
          <span lang="ko">문의 보내기</span>
        </span>
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
  const object = findObjectByPath(path)

  if (object) {
    return <ProductDetail object={object} />
  }

  return <Homepage />
}
