'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const DEFAULT_HABITS = [
  'Morning Ignition check-in',
  'Deep work block (90 min)',
  'No reactive scrolling before noon',
  'Move your body',
  'Review your #1 goal',
  'Evening OS review',
]

interface HabitLog { habit: string; done: boolean }
interface Props { user: User | null }

const today = new Date().toISOString().split('T')[0]

export default function HabitTracker({ user }: Props) {
  const [habits, setHabits] = useState<HabitLog[]>(
    DEFAULT_HABITS.map(h => ({ habit: h, done: false }))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user?.id) return
    const supabase = createClient()
    supabase
      .from('habit_logs')
      .select('habits')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()
      .then(({ data }) => {
        if (data?.habits) setHabits(data.habits as HabitLog[])
      })
  }, [user?.id])

  const toggle = (i: number) => {
    setHabits(prev => prev.map((h, idx) => idx === i ? { ...h, done: !h.done } : h))
    setSaved(false)
  }

  const save = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('habit_logs').upsert({
      user_id: user?.id,
      date: today,
      habits,
      score: habits.filter(h => h.done).length,
    }, { onConflict: 'user_id,date' })
    setSaved(true)
    setSaving(false)
  }

  const score = habits.filter(h => h.done).length
  const pct = Math.round((score / habits.length) * 100)

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#f0f0f0', marginBottom: '0.25rem' }}>
          Law of 1%
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* Progress */}
      <div className="glass-amber" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Today&apos;s Score
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--amber)' }}>
            {score}/{habits.length}
          </span>
        </div>
        <div style={{ height: 6, background: 'rgba(251,191,36,0.1)', borderRadius: 4, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ height: '100%', background: 'var(--amber)', borderRadius: 4 }}
          />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#555', marginTop: '0.5rem' }}>
          {pct}% complete — {pct === 100 ? 'Perfect day. 🔥' : `${habits.length - score} habit${habits.length - score !== 1 ? 's' : ''} remaining`}
        </p>
      </div>

      {/* Habit list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
        {habits.map((h, i) => (
          <motion.button
            key={i}
            onClick={() => toggle(i)}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="os-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              padding: '1rem 1.125rem',
              background: h.done ? 'rgba(251,191,36,0.06)' : 'var(--glass-bg)',
              border: h.done ? '1px solid rgba(251,191,36,0.25)' : '1px solid var(--glass-border)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                border: h.done ? '2px solid var(--amber)' : '2px solid #333',
                background: h.done ? 'var(--amber)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              {h.done && <span style={{ fontSize: '0.65rem', color: '#0a0a0f', fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: h.done ? '#888' : '#d0d0d0',
              textDecoration: h.done ? 'line-through' : 'none',
              transition: 'all 0.2s',
            }}>
              {h.habit}
            </span>
          </motion.button>
        ))}
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="btn-primary w-full"
        style={{ justifyContent: 'center', opacity: saving ? 0.6 : 1 }}
      >
        {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Progress'}
      </button>
    </div>
  )
}
