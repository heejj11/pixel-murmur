import { useState } from 'react'
import { ArrowLeft, ArrowRight, LockKey } from '@phosphor-icons/react'
import { supabase } from '../lib/supabase'

export function AdminSetupRequired() {
  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card admin-auth-card--setup">
        <span className="admin-auth-mark" aria-hidden="true">PM</span>
        <div>
          <h1>Supabase 연결이 필요합니다.</h1>
          <p>
            관리자 화면은 준비됐지만 운영 프로젝트 주소와 공개 키가 아직 빌드에 설정되지 않았습니다.
          </p>
        </div>
        <code>VITE_SUPABASE_URL<br />VITE_SUPABASE_PUBLISHABLE_KEY</code>
        <a href="/">
          <ArrowLeft size={17} weight="bold" aria-hidden="true" />
          공개 사이트로 돌아가기
        </a>
      </section>
    </main>
  )
}

export function AdminUnauthorized({ email, onSignOut }) {
  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card admin-auth-card--setup">
        <LockKey size={28} weight="bold" aria-hidden="true" />
        <div>
          <h1>운영자 권한이 없습니다.</h1>
          <p>{email} 계정은 로그인됐지만 관리자 역할이 지정되지 않았습니다.</p>
        </div>
        <button type="button" className="admin-primary-action" onClick={onSignOut}>
          다른 계정으로 로그인
        </button>
      </section>
    </main>
  )
}

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setStatus('error')
      setErrorMessage('이메일 또는 비밀번호를 확인해 주세요.')
      return
    }

    setStatus('success')
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <header>
          <a href="/" aria-label="PixelMurmur 홈페이지">
            <span className="admin-auth-mark" aria-hidden="true">PM</span>
            <span>PixelMurmur</span>
          </a>
          <div>
            <h1>Social desk</h1>
            <p lang="ko">SNS 통계 운영자 화면</p>
          </div>
        </header>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email / 이메일</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            <span>Password / 비밀번호</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {errorMessage && <p className="admin-form-error" role="alert">{errorMessage}</p>}
          <button
            className="admin-login-button"
            type="submit"
            disabled={status === 'loading'}
          >
            <span>{status === 'loading' ? '확인 중…' : '로그인'}</span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>
        </form>
        <p className="admin-auth-note">
          운영자 계정 한 명만 접근할 수 있습니다. SNS 토큰은 이 화면이나 브라우저에 저장되지 않습니다.
        </p>
      </section>
    </main>
  )
}
