'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient, supabaseConfigured } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const ENERGY_LEVELS = ['💀', '😴', '😐', '⚡', '🔥']
const FOCUS_LEVELS  = ['Scattered', 'Low', 'Moderate', 'Locked in', 'Laser sharp']

interface Props { user: User | null }

export default function IgnitionCheckin({ user }: Props) {
  const [energy, setEnergy]     = useState(2)
  const [focus, setFocus]       = useState(2)
  const [intention, setIntention] = useState('')
  const [win, setWin]           = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]         = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    if (supabaseConfigured()) {
      const supabase = createClient()
      await supabase.from('ignition_checkins').insert({
        user_id: user?.id,
        energy_level: energy,
        focus_level: focus,
        intention,
        yesterday_win: win,
        created_at: new Date().toISOString(),
      })
    }
    setDone(true)
    setSubmitting(false)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-amber"
        style={{ padding: '2rem', textAlign: 'center' }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔥</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--amber)', marginBottom: '0.5rem' }}>
          IGNITION COMPLETE
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#888', lineHeight: 1.6 }}>
          You showed up. Now execute.
        </p>
      </motion.div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#f0f0f0', marginBottom: '0.25rem' }}>
          Morning Ignition
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Set the tone. Start the day.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Energy */}
        <div className="os-card" style={{ padding: '1.25rem' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            Energy Level
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between' }}>
            {ENERGY_LEVELS.map((e, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setEnergy(i)}
                style={{
                  flex: 1,
                  padding: '0.875rem 0',
                  background: energy === i ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.02)',
                  border: energy === i ? '1px solid rgba(251,191,36,0.5)' : '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Focus */}
        <div className="os-card" style={{ padding: '1.25rem' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            Focus Quality
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {FOCUS_LEVELS.map((f, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setFocus(i)}
                style={{
                  padding: '0.75rem 1rem',
                  background: focus === i ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.02)',
                  border: focus === i ? '1px solid rgba(6,182,212,0.4)' : '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  textAlign: 'left',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: focus === i ? 'var(--cyan)' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Intention */}
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
            Today&apos;s Intention
          </label>
          <textarea
            value={intention}
            onChange={e => setIntention(e.target.value)}
            placeholder="The one thing that makes today a win..."
            className="os-input"
            rows={3}
            style={{ resize: 'none' }}
            required
          />
        </div>

        {/* Yesterday win */}
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
            Yesterday&apos;s Win
          </label>
          <input
            type="text"
            value={win}
            onChange={e => setWin(e.target.value)}
            placeholder="What did you move forward?"
            className="os-input"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary"
          style={{ justifyContent: 'center', opacity: submitting ? 0.6 : 1 }}
        >
          {submitting ? 'Igniting...' : 'Ignite →'}
        </button>
      </form>
    </div>
  )
}
