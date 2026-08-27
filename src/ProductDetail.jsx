import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { objects } from './catalog'
import { getObjectCopyKo } from './koreanCopy'
import { Footer, Header, ProductImage, StatusGlyph, StatusLabel } from './SiteChrome'

const galleryLabelKo = {
  'Docked view': '도킹 상태',
  'Detachable structure': '분리 구조',
  'Portable toast battery': '휴대용 토스트 배터리',
  'Charging dock': '충전 도크',
  'Ports and contacts': '포트와 충전 접점',
  'LCD states': 'LCD 상태',
  'Portable use': '휴대 사용',
  'Packaging concept': '패키지 콘셉트',
  'Front / Butter': '정면 / 버터',
  Back: '후면',
  'Side profile': '측면',
  'Collar and fabric': '카라와 원단',
  'Butter applique': '버터 장식',
  'Worn view': '착용 모습',
  Front: '정면',
  'Crust and logo': '테두리와 로고',
  'Interior pocket': '내부 포켓',
  'Carried view': '휴대 모습',
  'Hero view': '대표 이미지',
  'Camera and crust': '카메라와 테두리',
  'Buttons and ports': '버튼과 포트',
  'Everyday setting': '일상 장면',
  'Open view': '열린 모습',
  'Back and hinge': '후면과 힌지',
  'Hinge and keyring': '힌지와 키링',
  'Charging access': '충전 단자',
  'Open interior': '열린 내부',
  'Crust and zipper': '테두리와 지퍼',
  'Everyday carry': '일상 휴대',
  'Material and zipper': '소재와 지퍼',
  'Everyday use': '일상 사용',
  'Collapsed front': '접힌 정면',
  'Extended profile': '펼친 측면',
  'Attached view': '부착 모습',
  'Flavor series': '토핑 시리즈',
  'In hand': '손에 든 모습',
  'Front peel': '정면 분리',
  'Full-length refill': '긴 인덱스 리필',
  'PET material': 'PET 소재',
  'Notebook use': '노트 사용',
  'Color lineup': '컬러 구성',
  'Peel one sheet': '메모 한 장 떼기',
  'Thin profile': '얇은 적층 구조',
  'Rear construction': '후면 구조',
  'Top-open interior': '상단 개방 내부',
  'Side and zipper': '측면과 지퍼',
  'Label card change': '라벨 카드 교체',
  'Peel disc memo': '원형 메모 한 장 떼기',
  'Closed view': '닫힌 모습',
  'Memo refills': '메모 리필',
  'Mechanical cutaway': '기계 구조 절개',
  'Single-roll refill': '한 롤 리필',
  'Manual pull': '수동 길이 조절',
  'Guarded cutter': '보호형 절단 구조',
}

function BilingualGalleryLabel({ label }) {
  return (
    <span className="bilingual-gallery-label">
      <span>{label}</span>
      <span lang="ko">{galleryLabelKo[label] ?? '상세 이미지'}</span>
    </span>
  )
}

function RelatedObject({ object }) {
  const content = (
    <>
      <ProductImage src={object.image} alt={object.alt} />
      <div className="related-object__meta">
        <span>{object.id}</span>
        <h3>{object.name}</h3>
        <p lang="ko">{object.nameKo}</p>
        <span className="related-object__status">
          <StatusGlyph />
          <StatusLabel status={object.status} />
        </span>
      </div>
    </>
  )

  return (
    <article className="related-object" style={{ '--object-accent': object.accent }}>
      {object.href ? (
        <a href={object.href} aria-label={`View ${object.name} / ${object.nameKo} 보기`}>
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
        <h2 id="gallery-title">Object views <span lang="ko">제품 이미지</span></h2>
        <span>{object.gallery.length} renders / 렌더 {object.gallery.length}장</span>
      </div>
      <div className="product-gallery__grid">
        {gallery.map((image) => (
          <figure
            className={`gallery-item gallery-item--${image.role}`}
            key={image.role}
          >
            <ProductImage src={image.src} alt={image.alt} />
            <figcaption>
              <BilingualGalleryLabel label={image.label} />
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
  const copyKo = getObjectCopyKo(object)
  const statusFacts = [
    ['Status', '상태', <StatusLabel key="status" status={object.status} />],
    ['Reality', '실현도', `${object.reality}%`],
    ['Category', '분류', (
      <span className="ledger-value" key="category">
        <span>{object.category}</span>
        <span lang="ko">{copyKo.category}</span>
      </span>
    )],
    ['Type', '유형', (
      <span className="ledger-value" key="type">
        <span>Concept Product</span>
        <span lang="ko">콘셉트 제품</span>
      </span>
    )],
    ['Possibility', '가능성', (
      <span className="ledger-value" key="possibility">
        <span>Open for Collaboration</span>
        <span lang="ko">협업 제안 가능</span>
      </span>
    )],
  ]
  const relatedObjects = objects.filter((item) => item.id !== object.id).slice(0, 4)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${object.name} / ${object.nameKo} | PixelMurmur`
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
              <span className="trail-label">
                <span>Back to objects</span>
                <span lang="ko">오브젝트로 돌아가기</span>
              </span>
            </a>
            <span>Objects / 오브젝트 / {object.id}</span>
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
                <BilingualGalleryLabel label={heroImage.label} />
                <span>{object.id} / 01</span>
              </figcaption>
            </figure>

            <div className="detail-summary">
              <div className="detail-identity">
                <span>{object.id}</span>
                <h1 id="detail-title">{object.name}</h1>
                <p lang="ko">{object.nameKo}</p>
              </div>

              <div className="status-chip">
                <StatusGlyph />
                <StatusLabel status={object.status} />
              </div>

              <div className="detail-reality">
                <span>Reality / <span lang="ko">실현도</span></span>
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
                <span className="action-copy">
                  <span>Make this real</span>
                  <span lang="ko">실물로 만들기</span>
                </span>
                <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <ProductGallery object={object} />

        <section className="concept-story" aria-labelledby="concept-title">
          <h2 id="concept-title">
            <span>{object.statement[0]}<br />{object.statement[1]}</span>
            <span className="concept-story__title-ko" lang="ko">
              {copyKo.statement[0]}<br />{copyKo.statement[1]}
            </span>
          </h2>
          <div className="concept-story__copy">
            {object.story.map((paragraph, index) => (
              <div className="story-pair" key={paragraph}>
                <p>{paragraph}</p>
                <p lang="ko">{copyKo.story[index]}</p>
              </div>
            ))}
          </div>
          <aside className="concept-story__aside">
            <span>Archive note / <span lang="ko">아카이브 노트</span></span>
            <strong>
              Currently: pixels.<br />Hopefully: objects.
              <span lang="ko">지금은 픽셀.<br />언젠가는 물건.</span>
            </strong>
          </aside>
        </section>

        <section className="status-ledger" aria-labelledby="status-title">
          <div className="detail-section-heading">
            <h2 id="status-title">Object state <span lang="ko">오브젝트 상태</span></h2>
            <span>Updated / 업데이트 / 2026.08</span>
          </div>
          <dl>
            {statusFacts.map(([label, labelKo, value]) => (
              <div key={label}>
                <dt>{label} <span lang="ko">{labelKo}</span></dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="detail-notes" aria-labelledby="notes-title">
          <div className="detail-section-heading">
            <h2 id="notes-title">Concept notes <span lang="ko">콘셉트 노트</span></h2>
            <span>Direction, not specification / 사양이 아닌 방향</span>
          </div>
          <div className="detail-notes__grid">
            {object.notes.map(([title, copy], index) => (
              <article key={title}>
                <h3>
                  <span>{title}</span>
                  <span lang="ko">{copyKo.notes[index][0]}</span>
                </h3>
                <p>{copy}</p>
                <p lang="ko">{copyKo.notes[index][1]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-contact" aria-labelledby="detail-contact-title">
          <div>
            <h2 className="paired-display" id="detail-contact-title">
              Want to make<br />it real?
              <span lang="ko">실물로<br />만들고 싶나요?</span>
            </h2>
            <p>
              For production, collaboration, or licensing inquiries, tell us what you
              could bring to {object.id}.
            </p>
            <p lang="ko">
              제작, 협업, 라이선스 문의가 있다면 {object.id}를 위해 어떤 일을 함께할 수 있는지 알려 주세요.
            </p>
          </div>
          <a
            className="primary-button"
            href={`mailto:hello@pixelmurmur.com?subject=${encodeURIComponent(`${object.id} collaboration inquiry`)}`}
          >
            <span className="action-copy">
              <span>Contact PixelMurmur</span>
              <span lang="ko">PixelMurmur에 문의하기</span>
            </span>
            <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
          </a>
        </section>

        <section className="related" aria-labelledby="related-title">
          <div className="detail-section-heading">
            <h2 id="related-title">Related objects <span lang="ko">관련 오브젝트</span></h2>
            <a href="/#objects">
              <span className="action-copy">
                <span>View all objects</span>
                <span lang="ko">전체 보기</span>
              </span>
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
