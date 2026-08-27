import { useEffect, useState } from 'react'
import AdminLogin, {
  AdminSetupRequired,
  AdminUnauthorized,
} from './AdminLogin'
import AdminShell from './AdminShell'
import ContentManager from './ContentManager'
import Dashboard from './Dashboard'
import { hasSupabaseConfig, supabase } from '../lib/supabase'
import './admin.css'

function routeSection() {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/admin/objects') return 'objects'
  if (path === '/admin/instagram') return 'instagram'
  if (path === '/admin/x') return 'x'
  return 'all'
}

export default function AdminApp() {
  const demo = import.meta.env.DEV && new URLSearchParams(window.location.search).get('demo') === '1'
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(hasSupabaseConfig && !demo)
  const section = routeSection()

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Studio Desk — PixelMurmur'
    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    if (!supabase || demo) return undefined
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [demo])

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut()
  }

  if (!hasSupabaseConfig && !demo) return <AdminSetupRequired />

  if (loading) {
    return (
      <main className="admin-auth-page">
        <div className="admin-auth-loading" role="status">운영자 세션 확인 중…</div>
      </main>
    )
  }

  if (!session && !demo) return <AdminLogin />

  if (!demo && session.user.app_metadata?.role !== 'admin') {
    return <AdminUnauthorized email={session.user.email} onSignOut={handleSignOut} />
  }

  return (
    <AdminShell
      activeSection={section}
      demo={demo}
      userEmail={demo ? 'demo@pixelmurmur.local' : session.user.email}
      onSignOut={handleSignOut}
    >
      {section === 'objects'
        ? <ContentManager demo={demo} />
        : <Dashboard platform={section} demo={demo} />}
    </AdminShell>
  )
}
