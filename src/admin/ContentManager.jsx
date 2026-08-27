import { useEffect, useMemo, useState } from 'react'
import {
  ArrowSquareOut,
  Check,
  Eye,
  EyeSlash,
  FloppyDisk,
  InstagramLogo,
  XLogo,
} from '@phosphor-icons/react'
import {
  loadContentRows,
  makeDemoContentRows,
  saveContentRows,
  validateSocialUrl,
} from './contentData'

function comparableRow(row) {
  return {
    object_id: row.object_id,
    is_published: Boolean(row.is_published),
    instagram_url: row.instagram_url?.trim() ?? '',
    x_url: row.x_url?.trim() ?? '',
  }
}

function rowsMatch(left, right) {
  return JSON.stringify(left.map(comparableRow)) === JSON.stringify(right.map(comparableRow))
}

export default function ContentManager({ demo = false }) {
  const [rows, setRows] = useState([])
  const [savedRows, setSavedRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const nextRows = demo ? makeDemoContentRows() : await loadContentRows()
        if (!mounted) return
        setRows(nextRows)
        setSavedRows(nextRows)
      } catch (loadError) {
        if (mounted) setError(loadError.message || '작품 설정을 불러오지 못했습니다.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [demo])

  const validation = useMemo(() => Object.fromEntries(rows.map((row) => [
    row.object_id,
    {
      instagram: validateSocialUrl(row.instagram_url ?? '', 'instagram'),
      x: validateSocialUrl(row.x_url ?? '', 'x'),
    },
  ])), [rows])
  const hasValidationError = Object.values(validation).some(
    (row) => row.instagram || row.x,
  )
  const dirty = !rowsMatch(rows, savedRows)
  const publicCount = rows.filter((row) => row.is_published).length

  useEffect(() => {
    if (!dirty) return undefined

    function warnBeforeLeaving(event) {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', warnBeforeLeaving)
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving)
  }, [dirty])

  function updateRow(objectId, patch) {
    setRows((current) => current.map((row) => (
      row.object_id === objectId ? { ...row, ...patch } : row
    )))
    setNotice('')
  }

  async function handleSave() {
    if (!dirty || hasValidationError || saving) return
    setSaving(true)
    setError('')
    setNotice('')

    try {
      if (!demo) await saveContentRows(rows)
      setSavedRows(rows.map((row) => ({ ...row })))
      setNotice(demo
        ? '데모 화면에서 변경사항을 저장했습니다. 새로고침하면 초기화됩니다.'
        : '공개 상태와 게시물 링크를 저장했습니다.')
    } catch (saveError) {
      setError(saveError.message || '변경사항을 저장하지 못했습니다.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-dashboard admin-content-manager">
      <header className="admin-page-header admin-content-header">
        <div>
          <h1>Object publishing <span lang="ko">작품 공개 관리</span></h1>
          <p>
            Choose what visitors can see and attach the original social posts.
            <span lang="ko">공개할 작품과 Instagram·X 원문 게시물을 함께 관리합니다.</span>
          </p>
        </div>
        <div className="admin-content-savebar">
          <span>
            <strong>{publicCount}</strong> / {rows.length} public
            <small lang="ko">작품 공개 중</small>
          </span>
          <button
            className="admin-primary-action"
            type="button"
            onClick={handleSave}
            disabled={!dirty || hasValidationError || saving}
          >
            {saving ? <span className="admin-save-dot" aria-hidden="true" /> : <FloppyDisk size={17} weight="bold" aria-hidden="true" />}
            <span>{saving ? 'Saving… / 저장 중…' : 'Save changes / 변경사항 저장'}</span>
          </button>
        </div>
      </header>

      {demo && (
        <p className="admin-notice admin-notice--demo">
          Demo mode / 데모 모드 — 저장 동작을 확인할 수 있지만 데이터는 브라우저에 남지 않습니다.
        </p>
      )}
      {error && <p className="admin-notice admin-notice--error" role="alert">{error}</p>}
      {notice && (
        <p className="admin-notice admin-notice--success" role="status">
          <Check size={16} weight="bold" aria-hidden="true" /> {notice}
        </p>
      )}

      <section className="admin-content-section" aria-labelledby="object-publishing-list-title">
        <div className="admin-section-heading">
          <div>
            <h2 id="object-publishing-list-title">Archive entries <span lang="ko">아카이브 작품</span></h2>
            <p>저장하기 전에는 공개 사이트가 바뀌지 않습니다.</p>
          </div>
          {dirty && <span className="admin-unsaved">Unsaved changes / 저장 전 변경사항</span>}
        </div>

        {loading ? (
          <div className="admin-content-loading" role="status">
            <span />
            <span />
            <span />
            작품 설정을 불러오는 중…
          </div>
        ) : (
          <div className="admin-object-list">
            {rows.map((row) => {
              const rowErrors = validation[row.object_id]
              return (
                <article
                  className={`admin-object-row${row.is_published ? ' is-public' : ' is-hidden'}`}
                  key={row.object_id}
                >
                  <div className="admin-object-identity">
                    <img src={row.image} alt="" />
                    <div>
                      <span>{row.object_id}</span>
                      <h3>{row.name}</h3>
                      <p lang="ko">{row.nameKo}</p>
                    </div>
                  </div>

                  <label className="admin-visibility-control">
                    <input
                      type="checkbox"
                      checked={row.is_published}
                      onChange={(event) => updateRow(row.object_id, {
                        is_published: event.target.checked,
                      })}
                    />
                    <span className="admin-visibility-control__icon" aria-hidden="true">
                      {row.is_published
                        ? <Eye size={17} weight="bold" />
                        : <EyeSlash size={17} weight="bold" />}
                    </span>
                    <span>
                      <strong>{row.is_published ? 'Public' : 'Hidden'}</strong>
                      <small lang="ko">{row.is_published ? '공개' : '숨김'}</small>
                    </span>
                  </label>

                  <div className="admin-social-fields">
                    <label>
                      <span>
                        <InstagramLogo size={17} weight="bold" aria-hidden="true" />
                        Instagram post <span lang="ko">인스타그램 게시물</span>
                      </span>
                      <input
                        type="url"
                        value={row.instagram_url ?? ''}
                        placeholder="https://www.instagram.com/p/…"
                        aria-invalid={Boolean(rowErrors.instagram)}
                        aria-describedby={rowErrors.instagram ? `${row.object_id}-instagram-error` : undefined}
                        onChange={(event) => updateRow(row.object_id, {
                          instagram_url: event.target.value,
                        })}
                      />
                      {rowErrors.instagram && (
                        <small className="admin-field-error" id={`${row.object_id}-instagram-error`}>
                          {rowErrors.instagram}
                        </small>
                      )}
                    </label>
                    <label>
                      <span>
                        <XLogo size={17} weight="bold" aria-hidden="true" />
                        X post <span lang="ko">엑스 게시물</span>
                      </span>
                      <input
                        type="url"
                        value={row.x_url ?? ''}
                        placeholder="https://x.com/…/status/…"
                        aria-invalid={Boolean(rowErrors.x)}
                        aria-describedby={rowErrors.x ? `${row.object_id}-x-error` : undefined}
                        onChange={(event) => updateRow(row.object_id, {
                          x_url: event.target.value,
                        })}
                      />
                      {rowErrors.x && (
                        <small className="admin-field-error" id={`${row.object_id}-x-error`}>
                          {rowErrors.x}
                        </small>
                      )}
                    </label>
                  </div>

                  <a
                    className="admin-object-preview"
                    href={row.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${row.nameKo} 상세 페이지 새 창에서 보기`}
                  >
                    <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
                    <span>Preview <span lang="ko">미리보기</span></span>
                  </a>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
