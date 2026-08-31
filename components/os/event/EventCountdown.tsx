'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient, supabaseConfigured } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Props { user: User | null }

interface Settings {
  event_date: string
  event_time: string
  event_label: string
}

const DEFAULT_SETTINGS: Settings = {
  event_date: '2026-10-24',
  event_time: '4:00 PM',
  event_label: 'Techquity Distribution + Tech Lab Graduation',
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.setHours(0, 0, 0, 0) - a.setHours(0, 0, 0, 0)) / 86400000)
}

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function EventCountdown({ user }: Props) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [draft, setDraft] = useState<Settings>(DEFAULT_SETTINGS)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id || !supabaseConfigured()) { setLoading(false); return }
    const supabase = createClient()
    supabase
      .from('event_settings')
      .select('event_date, event_time, event_label')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setSettings(data as Settings)
          setDraft(data as Settings)
        }
        setLoading(false)
      })
  }, [user?.id])

  const save = async () => {
    setSettings(draft)
    setEditing(false)
    if (!supabaseConfigured() || !user?.id) return
    const supabase = createClient()
    await supabase.from('event_settings').upsert(
      { user_id: user.id, ...draft, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )
  }

  const eventDate = new Date(`${settings.event_date}T00:00:00`)
  const today = new Date()
  const daysOut = daysBetween(new Date(today), new Date(eventDate))

  const year = eventDate.getFullYear()
  const stipendDeadline = new Date(year, 8, 15) // Sept 15
  const daysToStipend = daysBetween(new Date(today), new Date(stipendDeadline))

  const cohortDay1 = new Date(eventDate)
  cohortDay1.setDate(cohortDay1.getDate() - 14)
  const recruitClose = new Date(cohortDay1)
  recruitClose.setDate(recruitClose.getDate() - 14)

  const milestones: { label: string; date: Date; note: string; urgent?: boolean }[] = [
    { label: 'Suggested: cohort applications close', date: recruitClose, note: '2-week runway before Day 1' },
    { label: 'Tech Lab Day 1 (studio)', date: cohortDay1, note: 'Assumes your event date is Day 15' },
    ...(daysToStipend >= -3
      ? [{ label: 'Milky Way stipend + press deadline', date: stipendDeadline, note: 'Hard external deadline', urgent: true }]
      : []),
    { label: settings.event_label, date: eventDate, note: 'Day 15 — graduation / event day', urgent: true },
  ].sort((a, b) => a.date.getTime() - b.date.getTime())

  if (loading) return <div className="os-card" style={{ height: 200, opacity: 0.4 }} />

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#f0f0f0', marginBottom: '0.25rem' }}>
          Event Countdown
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Techquity Distribution + Next Step Tech Lab
        </p>
      </div>

      <div className="glass-amber" style={{ padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--amber)', lineHeight: 1 }}>
          {daysOut >= 0 ? daysOut : 0}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5rem' }}>
          days to {settings.event_label} — {fmt(eventDate)}{settings.event_time ? ` · ${settings.event_time}` : ''}
        </p>
        <button
          onClick={() => setEditing(v => !v)}
          style={{ marginTop: '0.75rem', background: 'none', border: 'none', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          {editing ? 'Cancel' : 'Edit date / time'}
        </button>
      </div>

      {editing && (
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input className="os-input" value={draft.event_label} onChange={e => setDraft(d => ({ ...d, event_label: e.target.value }))} placeholder="Event label" />
          <input className="os-input" type="date" value={draft.event_date} onChange={e => setDraft(d => ({ ...d, event_date: e.target.value }))} />
          <input className="os-input" value={draft.event_time} onChange={e => setDraft(d => ({ ...d, event_time: e.target.value }))} placeholder="e.g. 4:00 PM" />
          <button onClick={save} className="btn-primary" style={{ justifyContent: 'center' }}>Save</button>
        </div>
      )}

      <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Picking the time
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#aaa', lineHeight: 1.6 }}>
          Oct 24 sits inside Wisconsin Tech Month — good timing, no conflict there. For time of day: late afternoon
          on a weekday (after school/work, before dinner) tends to draw the most community turnout for a
          graduation-style event. That&apos;s a starting suggestion, not a confirmed Ascent MKE slot — lock the actual
          time with them directly, and update it above once you do.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {milestones.map((m, i) => {
          const d = daysBetween(new Date(today), new Date(m.date))
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="os-card"
              style={{ padding: '1rem 1.125rem', borderColor: m.urgent ? 'rgba(236,72,153,0.3)' : undefined }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: m.urgent ? 'var(--pink)' : '#d0d0d0' }}>{m.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', flexShrink: 0 }}>{fmt(m.date)}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#555', marginTop: '0.3rem' }}>
                {d >= 0 ? `${d} day${d !== 1 ? 's' : ''} out` : `${-d} day${-d !== 1 ? 's' : ''} ago`} · {m.note}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
