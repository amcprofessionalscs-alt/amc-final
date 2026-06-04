'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import BrainCard from '@/components/os/BrainCard'
import IgnitionCheckin from '@/components/os/IgnitionCheckin'
import HabitTracker from '@/components/os/HabitTracker'
import BrainChat from '@/components/os/BrainChat'
import HistoryView from '@/components/os/HistoryView'
import type { User } from '@supabase/supabase-js'

type Tab = 'home' | 'ignition' | 'habits' | 'chat' | 'history'

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home',     label: 'Brain',    icon: '⚡' },
  { id: 'ignition', label: 'Ignition', icon: '🔥' },
  { id: 'habits',   label: 'Law of 1%',icon: '📈' },
  { id: 'chat',     label: 'Chat',     icon: '💬' },
  { id: 'history',  label: 'History',  icon: '📋' },
]

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.08, duration: 0.5 },
})

export default function OsDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [tab, setTab] = useState<Tab>('home')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Bypass auth when Supabase is not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setUser({ id: 'dev', email: 'operator@nextstep.os' } as User)
      setLoading(false)
      return
    }
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    })
  }, [router])

  const handleSignOut = async () => {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient()
      await supabase.auth.signOut()
    }
    router.replace('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cyan-pulse w-6 h-6 rounded-full" style={{ background: 'var(--cyan)', opacity: 0.6 }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ maxWidth: 430, margin: '0 auto', padding: '0 1rem' }}>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 0',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--amber)', letterSpacing: '0.05em' }}>
            NEXT STEP OS
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {user?.email}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#444',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Sign out
        </button>
      </motion.header>

      {/* Tab content */}
      <motion.main
        key={tab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ flex: 1, paddingTop: '1.5rem', paddingBottom: '6rem' }}
      >
        {tab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <motion.div {...fadeUp(0)}>
              <BrainCard user={user} />
            </motion.div>
            {/* Quick actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
              {[
                { tab: 'ignition' as Tab, label: 'Morning Ignition', icon: '🔥', color: 'var(--amber)' },
                { tab: 'habits' as Tab,   label: 'Habit Check',     icon: '📈', color: 'var(--cyan)' },
                { tab: 'chat' as Tab,     label: 'Brain Chat',      icon: '💬', color: 'var(--pink)' },
                { tab: 'history' as Tab,  label: 'My History',      icon: '📋', color: '#8a8a9a' },
              ].map((item, i) => (
                <motion.button
                  key={item.tab}
                  {...fadeUp(i + 1)}
                  onClick={() => setTab(item.tab)}
                  className="os-card"
                  style={{
                    padding: '1.25rem',
                    textAlign: 'left',
                    background: 'none',
                    cursor: 'pointer',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <span style={{ fontSize: '1.25rem', display: 'block', marginBottom: '0.5rem' }}>{item.icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: item.color,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
        {tab === 'ignition' && <IgnitionCheckin user={user} />}
        {tab === 'habits'   && <HabitTracker user={user} />}
        {tab === 'chat'     && <BrainChat user={user} />}
        {tab === 'history'  && <HistoryView user={user} />}
      </motion.main>

      {/* Bottom nav */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          display: 'flex',
          background: 'rgba(10,10,15,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--glass-border)',
          padding: '0.625rem 0',
        }}
      >
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.35rem 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '1.1rem', opacity: tab === item.id ? 1 : 0.4 }}>{item.icon}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: tab === item.id ? 'var(--amber)' : '#444',
              transition: 'color 0.2s',
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
