'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { User } from '@supabase/supabase-js'

interface Props {
  user: User | null
}

export default function BrainCard({ user }: Props) {
  const [intelligence, setIntelligence] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [date] = useState(() =>
    new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  )

  useEffect(() => {
    fetch('/api/os/brain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id }),
    })
      .then(r => r.json())
      .then(d => {
        setIntelligence(d.message || 'Ready to execute.')
        setLoading(false)
      })
      .catch(() => {
        setIntelligence('Systems online. What are we building today?')
        setLoading(false)
      })
  }, [user?.id])

  return (
    <motion.div
      className="glass-amber brain-pulse"
      style={{ padding: '1.75rem' }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--amber)',
              boxShadow: '0 0 8px var(--amber)',
            }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            AI Brain · Live
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#444', letterSpacing: '0.08em' }}>
          {date}
        </span>
      </div>

      {/* Intelligence output */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[100, 85, 70].map((w, i) => (
            <div
              key={i}
              style={{
                height: 10,
                borderRadius: 4,
                width: `${w}%`,
                background: 'rgba(251,191,36,0.1)',
                animation: 'brain-pulse 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: '#d0d0d0',
          lineHeight: 1.65,
          letterSpacing: '0.01em',
        }}>
          {intelligence}
        </p>
      )}

      {/* Footer */}
      <div style={{
        marginTop: '1.25rem',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(251,191,36,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Next Step OS · Intelligence
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(251,191,36,0.5)' }}>
          claude ⚡
        </span>
      </div>
    </motion.div>
  )
}
