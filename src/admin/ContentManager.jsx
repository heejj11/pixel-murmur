import { useEffect, useMemo, useState } from 'react'
import {
  ArrowSquareOut,
  Check,
  Eye,
  EyeSlash,
  FloppyDisk,
  InstagramLogo,
  Plus,
  TrashSimple,
  XLogo,
} from '@phosphor-icons/react'
import {
  loadContentRows,
  makeDemoContentRows,
  normalizeSocialUrls,
  saveContentRows,
  validateSocialUrl,
} from './contentData'

const MAX_SOCIAL_LINKS = 12

function editableUrls(row, platform) {
  const urls = row[`${platform}_urls`]
  if (Array.isArray(urls) && urls.length > 0) return urls

  const legacyUrl = row[`${platform}_url`]
  return legacyUrl ? [legacyUrl] : ['']
}

function comparableRow(row) {
  return {
    object_id: row.object_id,
    is_published: Boolean(row.is_published),
    instagram_urls: normalizeSocialUrls(editableUrls(row, 'instagram')),
    x_urls: normalizeSocialUrls(editableUrls(row, 'x')),
  }
}

function rowsMatch(left, right) {
  return JSON.stringify(left.map(comparableRow)) === JSON.stringify(right.map(comparableRow))
}

function validateSocialUrls(values, platform) {
  const trimmedValues = values.map((value) => value.trim())

  return values.map((value, index) => {
    const formatError = validateSocialUrl(value, platform)
    if (formatError) return formatError
    if (!value.trim()) return ''

    const duplicate = trimmedValues.some(
      (candidate, candidateIndex) => candidateIndex !== index && candidate === value.trim(),
    )
    return duplicate ? '같은 게시물 주소가 이미 있습니다.' : ''
  })
}

function SocialLinkFields({ objectId, platform, icon: Icon, label, labelKo, placeholder, values, errors, onChange, onAdd, onRemove }) {
  const atLimit = values.length >= MAX_SOCIAL_LINKS

  return (
    <fieldset className="admin-social-platform">
      <legend>
        <Icon size={17} weight="bold" aria-hidden="true" />
        {label} <span lang="ko">{labelKo}</span>
      </legend>
      <div className="admin-social-list">
        {values.map((value, index) => {
          const errorId = `${objectId}-${platform}-${index}-error`
          return (
            <div className="admin-social-entry" key={`${platform}-${index}`}>
              <div>
                <input
                  type="url"
                  value={value}
                  placeholder={placeholder}
                  aria-label={`${label} ${index + 1} / ${labelKo} ${index + 1}`}
                  aria-invalid={Boolean(errors[index])}
                  aria-describedby={errors[index] ? errorId : undefined}
                  onChange={(event) => onChange(index, event.target.value)}
                />
                <button
                  type="button"
                  className="admin-social-remove"
                  onClick={() => onRemove(index)}
                  aria-label={`${label} ${index + 1} 삭제 / ${labelKo} ${index + 1} 삭제`}
                  title="Remove post / 게시물 삭제"
                >
                  <TrashSimple size={16} weight="bold" aria-hidden="true" />
                </button>
              </div>
              {errors[index] && (
                <small className="admin-field-error" id={errorId}>
                  {errors[index]}
                </small>
              )}
            </div>
          )
        })}
      </div>
      <button
        type="button"
        className="admin-social-add"
        onClick={onAdd}
        disabled={atLimit}
      >
        <Plus size={15} weight="bold" aria-hidden="true" />
        <span>Add post <span lang="ko">게시물 추가</span></span>
      </button>
      {atLimit && <small className="admin-social-limit">플랫폼별 최대 12개까지 추가할 수 있습니다.</small>}
    </fieldset>
  )
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

  const validation = useMemo(() => Object.fromEntries(rows.map((row) => {
    const instagramUrls = editableUrls(row, 'instagram')
    const xUrls = editableUrls(row, 'x')
    return [
      row.object_id,
      {
        instagram: validateSocialUrls(instagramUrls, 'instagram'),
        x: validateSocialUrls(xUrls, 'x'),
      },
    ]
  })), [rows])
  const hasValidationError = Object.values(validation).some(
    (row) => [...row.instagram, ...row.x].some(Boolean),
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

  function updateSocialUrl(objectId, platform, index, value) {
    const row = rows.find((candidate) => candidate.object_id === objectId)
    if (!row) return
    const urls = [...editableUrls(row, platform)]
    urls[index] = value
    updateRow(objectId, { [`${platform}_urls`]: urls })
  }

  function addSocialUrl(objectId, platform) {
    const row = rows.find((candidate) => candidate.object_id === objectId)
    if (!row) return
    const urls = editableUrls(row, platform)
    if (urls.length >= MAX_SOCIAL_LINKS) return
    updateRow(objectId, { [`${platform}_urls`]: [...urls, ''] })
  }

  function removeSocialUrl(objectId, platform, index) {
    const row = rows.find((candidate) => candidate.object_id === objectId)
    if (!row) return
    const urls = editableUrls(row, platform).filter((_, candidateIndex) => candidateIndex !== index)
    updateRow(objectId, { [`${platform}_urls`]: urls.length > 0 ? urls : [''] })
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
                    <SocialLinkFields
                      objectId={row.object_id}
                      platform="instagram"
                      icon={InstagramLogo}
                      label="Instagram posts"
                      labelKo="인스타그램 게시물"
                      placeholder="https://www.instagram.com/p/…"
                      values={editableUrls(row, 'instagram')}
                      errors={rowErrors.instagram}
                      onChange={(index, value) => updateSocialUrl(row.object_id, 'instagram', index, value)}
                      onAdd={() => addSocialUrl(row.object_id, 'instagram')}
                      onRemove={(index) => removeSocialUrl(row.object_id, 'instagram', index)}
                    />
                    <SocialLinkFields
                      objectId={row.object_id}
                      platform="x"
                      icon={XLogo}
                      label="X posts"
                      labelKo="엑스 게시물"
                      placeholder="https://x.com/…/status/…"
                      values={editableUrls(row, 'x')}
                      errors={rowErrors.x}
                      onChange={(index, value) => updateSocialUrl(row.object_id, 'x', index, value)}
                      onAdd={() => addSocialUrl(row.object_id, 'x')}
                      onRemove={(index) => removeSocialUrl(row.object_id, 'x', index)}
                    />
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
