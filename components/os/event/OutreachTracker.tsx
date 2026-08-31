'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient, supabaseConfigured } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Props { user: User | null }

interface Contact {
  id: string
  name: string
  org: string | null
  role: string | null
  email: string | null
  phone: string | null
  relationship: string | null
  status: 'active' | 'stalled' | 'closed'
  next_action: string | null
  next_action_due: string | null
  created_at: string
}

type Channel = 'phone' | 'email' | 'text' | 'in_person' | 'other'
type Direction = 'outbound' | 'inbound'

interface Touch {
  id: string
  contact_id: string
  channel: Channel
  direction: Direction
  summary: string | null
  occurred_at: string
}

const CHANNEL_ICON: Record<Channel, string> = { phone: '📞', email: '✉️', text: '💬', in_person: '🤝', other: '•' }

const EMPTY_CONTACT = { name: '', org: '', role: '', email: '', phone: '', relationship: '', next_action: '', next_action_due: '' }
const EMPTY_TOUCH = { channel: 'phone' as Channel, direction: 'outbound' as Direction, summary: '' }
const EMPTY_COMPOSE = { subject: '', body: '' }

function daysUntil(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`)
  return Math.round((d.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000)
}

export default function OutreachTracker({ user }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [touches, setTouches] = useState<Touch[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState(EMPTY_CONTACT)
  const [touchDrafts, setTouchDrafts] = useState<Record<string, typeof EMPTY_TOUCH>>({})
  const [composeOpen, setComposeOpen] = useState<string | null>(null)
  const [composeDrafts, setComposeDrafts] = useState<Record<string, typeof EMPTY_COMPOSE>>({})
  const [sending, setSending] = useState<string | null>(null)

  const load = async () => {
    if (!user?.id || !supabaseConfigured()) { setLoading(false); return }
    const supabase = createClient()
    const [{ data: c }, { data: t }] = await Promise.all([
      supabase.from('event_contacts').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
      supabase.from('event_touches').select('*').eq('user_id', user.id).order('occurred_at', { ascending: false }),
    ])
    setContacts((c as Contact[]) || [])
    setTouches((t as Touch[]) || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const touchesFor = (contactId: string) => touches.filter(t => t.contact_id === contactId)

  const buildTrapFlag = (contactId: string) => {
    const ct = touchesFor(contactId)
    const outboundEmails = ct.filter(t => t.channel === 'email' && t.direction === 'outbound').length
    const everCalled = ct.some(t => t.channel === 'phone')
    const everHeardBack = ct.some(t => t.direction === 'inbound')
    return outboundEmails >= 2 && !everCalled && !everHeardBack
  }

  const addContact = async () => {
    if (!newContact.name.trim() || !user?.id || !supabaseConfigured()) return
    const supabase = createClient()
    await supabase.from('event_contacts').insert({
      user_id: user.id,
      name: newContact.name,
      org: newContact.org || null,
      role: newContact.role || null,
      email: newContact.email || null,
      phone: newContact.phone || null,
      relationship: newContact.relationship || null,
      next_action: newContact.next_action || null,
      next_action_due: newContact.next_action_due || null,
    })
    setNewContact(EMPTY_CONTACT)
    setShowAddContact(false)
    load()
  }

  const logTouch = async (contactId: string) => {
    const draft = touchDrafts[contactId] || EMPTY_TOUCH
    if (!user?.id || !supabaseConfigured()) return
    const supabase = createClient()
    await supabase.from('event_touches').insert({
      user_id: user.id,
      contact_id: contactId,
      channel: draft.channel,
      direction: draft.direction,
      summary: draft.summary || null,
    })
    setTouchDrafts(prev => ({ ...prev, [contactId]: EMPTY_TOUCH }))
    load()
  }

  const sendEmail = async (contact: Contact) => {
    const draft = composeDrafts[contact.id]
    if (!draft?.subject.trim() || !draft?.body.trim() || !contact.email) return
    setSending(contact.id)
    try {
      const res = await fetch('/api/os/event-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: contact.email, subject: draft.subject, body: draft.body, contactName: contact.name }),
      })
      const data = await res.json()
      if (data.success && user?.id && supabaseConfigured()) {
        const supabase = createClient()
        await supabase.from('event_touches').insert({
          user_id: user.id,
          contact_id: contact.id,
          channel: 'email',
          direction: 'outbound',
          summary: draft.subject,
        })
        setComposeDrafts(prev => ({ ...prev, [contact.id]: EMPTY_COMPOSE }))
        setComposeOpen(null)
        load()
      } else {
        alert(data.error || 'Send failed — check GMAIL_USER / GMAIL_PASSWORD are configured.')
      }
    } catch {
      alert('Send failed. Try again.')
    } finally {
      setSending(null)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[1, 2, 3].map(i => <div key={i} className="os-card" style={{ padding: '1.25rem', height: 100, opacity: 0.4 }} />)}
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#f0f0f0', marginBottom: '0.25rem' }}>Outreach</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {contacts.length} contact{contacts.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <button onClick={() => setShowAddContact(v => !v)} className="btn-cyan">{showAddContact ? 'Cancel' : '+ Contact'}</button>
      </div>

      {showAddContact && (
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          <input className="os-input" placeholder="Name" value={newContact.name} onChange={e => setNewContact(c => ({ ...c, name: e.target.value }))} />
          <input className="os-input" placeholder="Org" value={newContact.org} onChange={e => setNewContact(c => ({ ...c, org: e.target.value }))} />
          <input className="os-input" placeholder="Role" value={newContact.role} onChange={e => setNewContact(c => ({ ...c, role: e.target.value }))} />
          <input className="os-input" placeholder="Email" value={newContact.email} onChange={e => setNewContact(c => ({ ...c, email: e.target.value }))} />
          <input className="os-input" placeholder="Phone" value={newContact.phone} onChange={e => setNewContact(c => ({ ...c, phone: e.target.value }))} />
          <input className="os-input" placeholder="Relationship / why they matter" value={newContact.relationship} onChange={e => setNewContact(c => ({ ...c, relationship: e.target.value }))} />
          <input className="os-input" placeholder="Next action" value={newContact.next_action} onChange={e => setNewContact(c => ({ ...c, next_action: e.target.value }))} />
          <input className="os-input" type="date" value={newContact.next_action_due} onChange={e => setNewContact(c => ({ ...c, next_action_due: e.target.value }))} />
          <button onClick={addContact} className="btn-primary" style={{ justifyContent: 'center' }}>Save Contact</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {contacts.map((c, i) => {
          const ct = touchesFor(c.id)
          const lastTouch = ct[0]
          const flagged = buildTrapFlag(c.id)
          const isOpen = expanded === c.id
          const overdue = c.next_action_due ? daysUntil(c.next_action_due) < 0 : false

          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="os-card" style={{ padding: '1.125rem' }}>
              <button onClick={() => setExpanded(isOpen ? null : c.id)} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#f0f0f0' }}>{c.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#666', marginTop: '0.15rem' }}>{c.org}{c.role ? ` · ${c.role}` : ''}</div>
                  </div>
                  <span style={{
                    flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '0.2rem 0.55rem', borderRadius: '999px',
                    color: c.status === 'active' ? 'var(--cyan)' : c.status === 'stalled' ? 'var(--pink)' : '#666',
                    border: `1px solid ${c.status === 'active' ? 'rgba(6,182,212,0.35)' : c.status === 'stalled' ? 'rgba(236,72,153,0.35)' : '#333'}`,
                  }}>
                    {c.status}
                  </span>
                </div>

                {flagged && (
                  <div style={{ marginTop: '0.6rem', padding: '0.5rem 0.75rem', background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.25)', borderRadius: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--pink)' }}>
                      📞 Build Trap flag — {ct.filter(t => t.channel === 'email').length} email{ct.filter(t => t.channel === 'email').length !== 1 ? 's' : ''}, no call, no reply. Call instead.
                    </span>
                  </div>
                )}

                {c.next_action && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: overdue ? 'var(--pink)' : '#999', marginTop: '0.6rem', lineHeight: 1.5 }}>
                    → {c.next_action}
                    {c.next_action_due && (
                      <span style={{ color: overdue ? 'var(--pink)' : '#555' }}> ({overdue ? `${-daysUntil(c.next_action_due)}d overdue` : `due ${c.next_action_due}`})</span>
                    )}
                  </p>
                )}

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#444', marginTop: '0.5rem' }}>
                  {lastTouch
                    ? `Last touch: ${CHANNEL_ICON[lastTouch.channel]} ${lastTouch.channel} · ${new Date(lastTouch.occurred_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                    : 'No touches logged yet'}
                </p>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>

                      {c.relationship && (
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#888', lineHeight: 1.5 }}>{c.relationship}</p>
                      )}
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#888' }}>
                        {c.email && <span>✉️ {c.email}</span>}
                        {c.phone && <span>📞 {c.phone}</span>}
                      </div>

                      {/* Touch history */}
                      {ct.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {ct.map(t => (
                            <div key={t.id} style={{ display: 'flex', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#777' }}>
                              <span>{CHANNEL_ICON[t.channel]}</span>
                              <span style={{ color: t.direction === 'inbound' ? 'var(--cyan)' : '#777' }}>{t.direction === 'inbound' ? '←' : '→'}</span>
                              <span style={{ color: '#555' }}>{new Date(t.occurred_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              {t.summary && <span style={{ color: '#999' }}>— {t.summary}</span>}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Log a touch */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <select
                          className="os-input"
                          style={{ width: 'auto', flex: '1 1 90px' }}
                          value={(touchDrafts[c.id] || EMPTY_TOUCH).channel}
                          onChange={e => setTouchDrafts(prev => ({ ...prev, [c.id]: { ...(prev[c.id] || EMPTY_TOUCH), channel: e.target.value as Channel } }))}
                        >
                          <option value="phone">Phone</option>
                          <option value="email">Email</option>
                          <option value="text">Text</option>
                          <option value="in_person">In person</option>
                          <option value="other">Other</option>
                        </select>
                        <select
                          className="os-input"
                          style={{ width: 'auto', flex: '1 1 90px' }}
                          value={(touchDrafts[c.id] || EMPTY_TOUCH).direction}
                          onChange={e => setTouchDrafts(prev => ({ ...prev, [c.id]: { ...(prev[c.id] || EMPTY_TOUCH), direction: e.target.value as Direction } }))}
                        >
                          <option value="outbound">Outbound</option>
                          <option value="inbound">Inbound / reply</option>
                        </select>
                      </div>
                      <input
                        className="os-input"
                        placeholder="What happened / what was said"
                        value={(touchDrafts[c.id] || EMPTY_TOUCH).summary}
                        onChange={e => setTouchDrafts(prev => ({ ...prev, [c.id]: { ...(prev[c.id] || EMPTY_TOUCH), summary: e.target.value } }))}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => logTouch(c.id)} className="btn-cyan" style={{ flex: 1, justifyContent: 'center' }}>Log Touch</button>
                        {c.email && (
                          <button onClick={() => setComposeOpen(composeOpen === c.id ? null : c.id)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                            {composeOpen === c.id ? 'Close' : 'Send Email'}
                          </button>
                        )}
                      </div>

                      {composeOpen === c.id && c.email && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <input
                            className="os-input"
                            placeholder="Subject"
                            value={(composeDrafts[c.id] || EMPTY_COMPOSE).subject}
                            onChange={e => setComposeDrafts(prev => ({ ...prev, [c.id]: { ...(prev[c.id] || EMPTY_COMPOSE), subject: e.target.value } }))}
                          />
                          <textarea
                            className="os-input"
                            rows={4}
                            placeholder="Message"
                            style={{ resize: 'none' }}
                            value={(composeDrafts[c.id] || EMPTY_COMPOSE).body}
                            onChange={e => setComposeDrafts(prev => ({ ...prev, [c.id]: { ...(prev[c.id] || EMPTY_COMPOSE), body: e.target.value } }))}
                          />
                          <button onClick={() => sendEmail(c)} disabled={sending === c.id} className="btn-primary" style={{ justifyContent: 'center', opacity: sending === c.id ? 0.6 : 1 }}>
                            {sending === c.id ? 'Sending...' : 'Send + Log'}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
