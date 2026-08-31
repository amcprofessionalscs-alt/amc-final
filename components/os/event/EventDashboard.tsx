'use client'

import { useEffect, useState } from 'react'
import { createClient, supabaseConfigured } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import EventCountdown from './EventCountdown'
import OutreachTracker from './OutreachTracker'
import EventChecklist from './EventChecklist'
import EventIdeas from './EventIdeas'
import { SEED_CONTACTS, SEED_TASKS } from '@/lib/eventSeed'

type EventTab = 'overview' | 'outreach' | 'checklist' | 'ideas'

const SUB_NAV: { id: EventTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'ideas', label: 'Ideas' },
]

interface Props { user: User | null }

export default function EventDashboard({ user }: Props) {
  const [tab, setTab] = useState<EventTab>('overview')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!user?.id || !supabaseConfigured()) { setReady(true); return }
    const supabase = createClient()

    const bootstrap = async () => {
      const { data: settings } = await supabase
        .from('event_settings')
        .select('seeded_at')
        .eq('user_id', user.id)
        .maybeSingle()

      if (settings?.seeded_at) { setReady(true); return }

      // First visit to the Event tab: create the settings row and seed
      // starting contacts/tasks from the project brief. Runs once.
      await supabase.from('event_settings').upsert(
        {
          user_id: user.id,
          event_date: '2026-10-24',
          event_time: '4:00 PM',
          event_label: 'Techquity Distribution + Tech Lab Graduation',
          seeded_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )

      await supabase.from('event_contacts').insert(SEED_CONTACTS.map(c => ({ ...c, user_id: user.id })))
      await supabase.from('event_tasks').insert(SEED_TASKS.map(t => ({ ...t, user_id: user.id })))

      setReady(true)
    }

    bootstrap()
  }, [user?.id])

  if (!ready) {
    return <div className="os-card" style={{ height: 200, opacity: 0.4 }} />
  }

  return (
    <div>
      <div className="os-card" style={{ padding: '0.625rem', marginBottom: '1.25rem', display: 'flex', gap: '0.375rem', overflowX: 'auto' }}>
        {SUB_NAV.map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              flexShrink: 0,
              padding: '0.5rem 0.875rem',
              borderRadius: '8px',
              border: 'none',
              background: tab === item.id ? 'rgba(251,191,36,0.15)' : 'transparent',
              color: tab === item.id ? 'var(--amber)' : '#666',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && <EventCountdown user={user} />}
      {tab === 'outreach' && <OutreachTracker user={user} />}
      {tab === 'checklist' && <EventChecklist user={user} />}
      {tab === 'ideas' && <EventIdeas user={user} />}
    </div>
  )
}
