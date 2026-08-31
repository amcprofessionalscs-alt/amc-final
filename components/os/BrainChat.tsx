'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { User } from '@supabase/supabase-js'

interface Message { role: 'user' | 'assistant'; content: string }
interface Props { user: User | null }

export default function BrainChat({ user }: Props) {
  const [messages, setMessages]     = useState<Message[]>([])
  const [input, setInput]           = useState('')
  const [loading, setLoading]       = useState(false)
  const bottomRef                   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/os/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages, userId: user?.id }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message || data.error || 'No response.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#f0f0f0', marginBottom: '0.25rem' }}>
          Brain Chat
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Powered by Claude · Your OS strategist
        </p>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1rem' }}>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass"
            style={{ padding: '1.5rem', textAlign: 'center' }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⚡</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#666', lineHeight: 1.6 }}>
              Ask me anything about your business, systems, strategy, or next step.
            </p>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              <div
                className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
                style={{ maxWidth: '85%', padding: '0.875rem 1rem' }}
              >
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.825rem',
                  color: msg.role === 'user' ? '#e8d8a0' : '#d0d0d0',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </p>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: '#333',
                marginTop: '0.25rem',
                letterSpacing: '0.08em',
              }}>
                {msg.role === 'user' ? 'You' : 'OS Brain'}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="chat-bubble-ai"
            style={{ padding: '0.875rem 1rem', alignSelf: 'flex-start', maxWidth: '60%' }}
          >
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center', height: 20 }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'var(--amber)',
                    animation: 'brain-pulse 1.2s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={send} style={{ display: 'flex', gap: '0.625rem', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="What are we building?"
          className="os-input"
          style={{ flex: 1 }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: '0 1rem',
            background: input.trim() ? 'var(--amber)' : 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '8px',
            color: input.trim() ? '#0a0a0f' : '#444',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            cursor: input.trim() ? 'pointer' : 'default',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          →
        </button>
      </form>
    </div>
  )
}
