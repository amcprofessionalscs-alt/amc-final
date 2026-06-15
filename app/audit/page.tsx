'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ── Portability constants — change these to redeploy on a new domain ──
const SITE_URL            = 'https://www.amc-professionals.com'
const STRIPE_PAYMENT_URL  = 'https://buy.stripe.com/4gMeVdaR37Ne8NYeaZcZa01'
const APPS_SCRIPT_URL     = 'https://script.google.com/macros/s/AKfycbxo_DePyB_Q-r_koNLOEwO0-Dd6-i-QP5QMmIum-zXgVkUYd0ik6Zvke4NY16qbkhOy/exec'
const TEMPLATE_DOWNLOAD_URL = 'https://docs.google.com/document/d/1qbr2vP4Nh4l-M_xBUX0phal5QN3OnxG9jSHnNC7YAhE/export?format=pdf'

// ── fbq type shim ──
declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

// ── Page data ──
const BUSINESS_TYPES = [
  'Service Business',
  'Contractor',
  'Coach or Consultant',
  'Community Org',
  'Creator',
  'Other',
]

const INCLUDED = [
  {
    icon: '🔍',
    title: 'Full Operations Review',
    desc: 'A complete look at your current tools, workflows, and execution gaps — where time is leaking and where your system breaks down.',
  },
  {
    icon: '⚡',
    title: 'Top 3 Automation Opportunities',
    desc: 'Your highest-impact automation wins, ranked by time saved and revenue potential. Specific to your business type, not generic advice.',
  },
  {
    icon: '🤖',
    title: 'Custom AI Prompt Starter',
    desc: 'A Claude prompt built specifically for your business — ready to use immediately to qualify leads, follow up, or generate content.',
  },
  {
    icon: '🎥',
    title: '30-Min Loom Walkthrough',
    desc: 'A personal Loom video delivered within 48 hours. Your specific findings, your specific next steps. Nothing templated.',
  },
]

const WHO_FOR = [
  "You're a service business owner, contractor, coach, or community builder with active leads but no real system behind them.",
  "You're using AI tools but not getting consistent results — you know there's more available, you just don't have the right setup.",
  "You're ready to stop improvising and build something that runs without you in every conversation.",
]

const PROOF_STATS = [
  { value: '71/71', label: 'Summit Tickets Sold',  sub: '$0 paid marketing' },
  { value: '80K+',  label: 'Ecosystem Reach',      sub: '60-day window' },
  { value: '+601%', label: 'Reels Performance',    sub: '43.8% non-follower reach' },
  { value: '48HR',  label: 'Audit Delivery',       sub: 'Guaranteed turnaround' },
]

const STEPS = [
  {
    n: '01',
    title: 'Pay $197 securely via Stripe',
    detail: 'Click the button below to pay by card. Secure checkout powered by Stripe — takes less than a minute.',
  },
  {
    n: '02',
    title: 'Submit your info below',
    detail: 'After payment, fill out the short form so I know your business, your biggest challenge, and the best way to reach you.',
  },
  {
    n: '03',
    title: 'Receive your audit within 48 hours',
    detail: "You'll get a personal Loom video walkthrough with your specific findings and next steps.",
  },
]

// ── Teal accent for lead capture section ──
const TEAL = '#1D9E75'

function AuditPageInner() {
  const searchParams  = useSearchParams()
  const paymentSuccess = searchParams.get('payment') === 'success'

  // Audit form state
  const [formState, setFormState] = useState({
    name: '', email: '', bizType: '', challenge: '', paid: paymentSuccess ? 'Yes' : '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Lead capture state
  const [leadForm, setLeadForm] = useState({ firstName: '', email: '', phone: '' })
  const [leadSubmitting, setLeadSubmitting]   = useState(false)
  const [leadSubmitted, setLeadSubmitted]     = useState(false)
  const [leadEmailError, setLeadEmailError]   = useState('')

  // Proof bar in-view
  const [inView, setInView] = useState(false)
  const proofRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.2 })
    if (proofRef.current) obs.observe(proofRef.current)
    return () => obs.disconnect()
  }, [])

  // Task 1 — fire ViewContent on audit page load
  useEffect(() => {
    window.fbq?.('track', 'ViewContent', { content_name: 'OS Audit Page' })
  }, [])

  // Audit form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // POST audit data to Apps Script
    try {
      fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          bizType: formState.bizType,
          challenge: formState.challenge,
          paid: formState.paid,
          source: 'audit-page',
          timestamp: new Date().toISOString(),
        }),
      })
    } catch {
      // no-cors always throws — intended, ignore
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  // Lead capture form
  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeadForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === 'email') setLeadEmailError('')
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Email format validation
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)
    if (!emailOk) {
      setLeadEmailError('Please enter a valid email address.')
      return
    }

    setLeadSubmitting(true)

    // POST to Apps Script (no-cors, fire-and-forget)
    try {
      fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: leadForm.firstName,
          email: leadForm.email,
          phone: leadForm.phone,
          source: 'audit-page',
          timestamp: new Date().toISOString(),
        }),
      })
    } catch {
      // no-cors always throws — intended, ignore
    }

    // Task 1 — fire Lead pixel event on successful lead form submit
    window.fbq?.('track', 'Lead')

    // Open template download in new tab
    window.open(TEMPLATE_DOWNLOAD_URL, '_blank', 'noopener,noreferrer')

    setLeadSubmitting(false)
    setLeadSubmitted(true)
  }

  return (
    <main style={{ background: '#0D0D0D', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '5rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 65% 35%, rgba(251,191,36,0.10) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 75%, rgba(6,182,212,0.07) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)
          `,
        }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to bottom, transparent, #0D0D0D)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 820, margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, var(--amber))' }} />
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
              OS Audit · $197
            </span>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, var(--amber))' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 8vw, 6rem)',
            lineHeight: 0.92,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            marginBottom: 28,
          }}>
            YOUR BUSINESS<br />
            HAS LEAKS.<br />
            <span style={{ background: 'linear-gradient(135deg, var(--amber), #fcd34d, var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              LET&rsquo;S FIND THEM.
            </span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)',
            color: '#777',
            fontSize: 'clamp(0.875rem, 2vw, 1.05rem)',
            lineHeight: 1.75,
            maxWidth: 620,
            margin: '0 auto 2.5rem',
            fontWeight: 300,
          }}>
            The OS Audit is a 30-minute deep dive into your operation. You&rsquo;ll walk away knowing exactly where AI and automation can recover your time, close your pipeline gaps, and build the execution system your business is missing.
          </p>

          <a href="#payment" className="btn-primary" style={{ fontSize: '0.875rem', padding: '1rem 2.5rem' }}>
            Get the Audit — $197 →
          </a>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────── */}
      <section style={{ background: '#161616', padding: '7rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, var(--amber))' }} />
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                What you get
              </span>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, var(--amber))' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,5vw,4rem)', color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              WHAT&rsquo;S INCLUDED
            </h2>
          </div>

          <div className="rg-svc" style={{ borderRadius: 16, overflow: 'hidden' }}>
            {INCLUDED.map((item, i) => (
              <div key={i} style={{
                background: '#161616',
                padding: '2.5rem',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : undefined,
              }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(251,191,36,0.08)',
                  border: '1px solid rgba(251,191,36,0.2)',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem',
                  marginBottom: 20,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#FFFFFF', marginBottom: 10, letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', color: '#666', fontSize: '0.825rem', lineHeight: 1.75, fontWeight: 300 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ──────────────────────────────────── */}
      <section style={{ background: '#0D0D0D', padding: '7rem 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, var(--cyan))' }} />
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                Is this you?
              </span>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, var(--cyan))' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,5vw,4rem)', color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              THIS IS FOR YOU IF...
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {WHO_FOR.map((point, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1.25rem',
                padding: '1.75rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
              }}>
                <div style={{
                  width: 32, height: 32, flexShrink: 0,
                  background: 'rgba(6,182,212,0.1)',
                  border: '1px solid rgba(6,182,212,0.25)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--cyan)' }}>
                    {['01', '02', '03'][i]}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', color: '#b0b0b0', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300 }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF BAR ────────────────────────────────────────── */}
      <section style={{ background: '#161616', padding: '0', position: 'relative' }}>
        <div className="glow-line-amber" />
        <div ref={proofRef} className="rg-4col" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {PROOF_STATS.map((s, i) => (
            <div key={i} style={{
              padding: '3rem 1.5rem',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              textAlign: 'center',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ${i * 0.1}s`,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 0.9, color: i % 2 === 0 ? 'var(--amber)' : 'var(--cyan)', marginBottom: 8 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#e0e0e0', marginBottom: 4 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#444' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
        <div className="glow-line-amber" />
      </section>

      {/* ── LEAD CAPTURE ─────────────────────────────────────── */}
      <section style={{ background: '#0D0D0D', padding: '7rem 0' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            background: '#161616',
            border: `1px solid ${TEAL}33`,
            borderRadius: 20,
            padding: '3rem 2.5rem',
          }}>
            {leadSubmitted ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📥</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                  CHECK YOUR DOWNLOADS.
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', color: '#888', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Want the full system? Book the $197 OS Audit below.
                </p>
                <a
                  href="#payment"
                  style={{
                    display: 'inline-block',
                    background: TEAL,
                    color: '#fff',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.875rem 2rem',
                    borderRadius: 8,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  Get the $197 OS Audit →
                </a>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    color: '#FFFFFF',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.875rem',
                  }}>
                    STEAL MY MORNING<br />IGNITION TEMPLATE
                  </h2>
                  <p style={{ fontFamily: 'var(--font-mono)', color: '#777', fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 300 }}>
                    The 10-minute daily sequence I run before touching email. Free. Enter your name and email and it&rsquo;s yours.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={leadForm.firstName}
                    onChange={handleLeadChange}
                    required
                    className="os-input"
                  />
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={leadForm.email}
                      onChange={handleLeadChange}
                      required
                      className="os-input"
                    />
                    {leadEmailError && (
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--pink)', marginTop: 6 }}>
                        {leadEmailError}
                      </p>
                    )}
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone (optional)"
                    value={leadForm.phone}
                    onChange={handleLeadChange}
                    className="os-input"
                  />

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: leadSubmitting ? '#145c44' : TEAL,
                      color: '#fff',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: 'none',
                      borderRadius: 8,
                      cursor: leadSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                      marginTop: '0.25rem',
                    }}
                  >
                    {leadSubmitting ? 'Sending...' : 'SEND ME THE TEMPLATE'}
                  </button>

                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#333', textAlign: 'center' }}>
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── VIDEO — unchanged ────────────────────────────────── */}
      <section style={{ background: '#0D0D0D', paddingTop: '4rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto 3rem', padding: '0 1.5rem' }}>
          <div style={{
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 16,
            overflow: 'hidden',
            background: '#0a0f1e',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.08)',
            position: 'relative',
            paddingTop: '56.25%',
          }}>
            <iframe
              src="https://drive.google.com/file/d/1vXLdebjRRNrQw-JT8MnMwilFssIeYEVi/preview"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay"
              allowFullScreen
            />
          </div>
          <p style={{
            textAlign: 'center',
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 12,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Demonte Williams · Founder, Next Step OS
          </p>
        </div>
      </section>

      {/* ── PAYMENT + FORM — content unchanged ───────────────── */}
      <section id="payment" style={{ background: '#0D0D0D', padding: '0 0 7rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>

          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, var(--amber))' }} />
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                Ready? Let&apos;s go
              </span>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, var(--amber))' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,5vw,4rem)', color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              HOW TO GET STARTED
            </h2>
          </div>

          {paymentSuccess && (
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.3)',
              borderRadius: 12,
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span style={{ fontSize: '1.1rem' }}>✓</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: 'var(--cyan)' }}>
                Payment received. Now fill out the form below so we can get started.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
            {STEPS.map((step, i) => (
              <div key={i}>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1.5rem',
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: i === 0 ? '1px solid rgba(251,191,36,0.25)' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                }}>
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    background: 'rgba(251,191,36,0.08)',
                    border: '1px solid rgba(251,191,36,0.25)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--amber)' }}>{step.n}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#FFFFFF', marginBottom: 8, letterSpacing: '-0.01em' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-mono)', color: '#777', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300 }}>
                      {step.detail}
                    </p>
                    {i === 0 && (
                      <a
                        href={STRIPE_PAYMENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ marginTop: '1.25rem', display: 'inline-flex' }}
                      >
                        Pay $197 — Secure Checkout →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(251,191,36,0.15)',
            borderRadius: 20,
            padding: '2.5rem',
          }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>
                Step 2
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                Submit Your Info
              </h3>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--amber)', marginBottom: '0.75rem' }}>
                  GOT IT.
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', color: '#888', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Expect your audit within 48 hours.<br />
                  Check your email for a confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="rg-2col" style={{ gap: '1rem' }}>
                  <input name="name" type="text" placeholder="Full Name" value={formState.name} onChange={handleChange} required className="os-input" />
                  <input name="email" type="email" placeholder="Email Address" value={formState.email} onChange={handleChange} required className="os-input" />
                </div>

                <select name="bizType" value={formState.bizType} onChange={handleChange} required className="os-input" style={{ cursor: 'pointer' }}>
                  <option value="">Business Type</option>
                  {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <textarea name="challenge" placeholder="What's your biggest operational challenge right now?" value={formState.challenge} onChange={handleChange} required className="os-input" style={{ minHeight: 110, resize: 'none' }} />

                <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
                    Have you sent payment?
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {['Yes', 'Not yet'].map(opt => (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="paid" value={opt} checked={formState.paid === opt} onChange={handleChange} style={{ accentColor: 'var(--amber)', width: 16, height: 16 }} required />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: formState.paid === opt ? 'var(--amber)' : '#888' }}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                  Submit My Audit Request →
                </button>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#333', textAlign: 'center', lineHeight: 1.5 }}>
                  By submitting you confirm you&apos;ve read the terms. Audit delivered via Loom within 48 hours of payment receipt.
                </p>
              </form>
            )}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#444', lineHeight: 1.6 }}>
              Questions? Text or email Demonte directly —{' '}
              <a href="tel:2514775676" style={{ color: 'var(--amber)', textDecoration: 'none' }}>251-477-5676</a>
              {' '}·{' '}
              <a href="mailto:amcprofessionalscs@gmail.com" style={{ color: 'var(--amber)', textDecoration: 'none' }}>amcprofessionalscs@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function AuditPage() {
  return (
    <Suspense fallback={null}>
      <AuditPageInner />
    </Suspense>
  )
}
