'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient, supabaseConfigured } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Checkin {
  id: string
  created_at: string
  energy_level: number
  focus_level: number
  intention: string
  yesterday_win: string
}

const ENERGY_LABELS = ['💀', '😴', '😐', '⚡', '🔥']
const FOCUS_LABELS  = ['Scattered', 'Low', 'Moderate', 'Locked in', 'Laser sharp']

interface Props { user: User | null }

export default function HistoryView({ user }: Props) {
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!supabaseConfigured()) {
      setLoading(false)
      return
    }
    if (!user?.id) return
    const supabase = createClient()
    supabase
      .from('ignition_checkins')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        setCheckins((data as Checkin[]) || [])
        setLoading(false)
      })
  }, [user?.id])

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="os-card" style={{ padding: '1.25rem', height: 100, opacity: 0.4 }} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#f0f0f0', marginBottom: '0.25rem' }}>
          My History
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {checkins.length} check-in{checkins.length !== 1 ? 's' : ''} logged
        </p>
      </div>

      {checkins.length === 0 ? (
        <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#555', lineHeight: 1.6 }}>
            No check-ins yet.<br />
            <span style={{ color: 'var(--amber)' }}>Complete your morning Ignition to start your history.</span>
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {checkins.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="os-card"
              style={{ padding: '1.25rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', letterSpacing: '0.08em' }}>
                  {new Date(c.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem' }}>{ENERGY_LABELS[c.energy_level]}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--cyan)' }}>
                    {FOCUS_LABELS[c.focus_level]}
                  </span>
                </div>
              </div>

              {c.intention && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#c0c0c0', lineHeight: 1.5, marginBottom: c.yesterday_win ? '0.625rem' : 0 }}>
                  🎯 {c.intention}
                </p>
              )}
              {c.yesterday_win && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666', lineHeight: 1.5 }}>
                  ✓ {c.yesterday_win}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
