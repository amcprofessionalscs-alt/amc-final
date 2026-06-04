'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `
          radial-gradient(ellipse at 60% 40%, rgba(251,191,36,0.10) 0%, transparent 55%),
          radial-gradient(ellipse at 20% 80%, rgba(6,182,212,0.08) 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)
        `,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-sm"
      >
        {/* Logo mark */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 brain-pulse"
            style={{
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.3)',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
          </div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: 'var(--font-display)', color: '#f0f0f0' }}
          >
            Next Step OS
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Operator Access
          </p>
        </div>

        {/* Card */}
        <div className="glass" style={{ padding: '2rem' }}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)' }}
              >
                <span style={{ fontSize: '1.25rem' }}>✓</span>
              </div>
              <h2
                className="text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: '#f0f0f0' }}
              >
                Check your inbox
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#666', lineHeight: 1.6 }}>
                Magic link sent to<br />
                <span style={{ color: 'var(--amber)' }}>{email}</span>
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 btn-cyan w-full justify-center"
                style={{ borderRadius: '8px' }}
              >
                Use different email
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleLogin}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#666',
                  marginBottom: '0.5rem',
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="os-input"
                style={{ marginBottom: '1.25rem' }}
                required
                autoFocus
              />

              {error && (
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--pink)',
                    marginBottom: '1rem',
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center"
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Sending...' : 'Send Magic Link →'}
              </button>

              <p
                style={{
                  marginTop: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#444',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                No password needed. We send a secure link to your email.
              </p>
            </form>
          )}
        </div>

        <p
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#333',
            letterSpacing: '0.1em',
          }}
        >
          <a href="/" style={{ color: '#444', textDecoration: 'none' }}>
            ← Back to site
          </a>
        </p>
      </motion.div>
    </div>
  )
}
