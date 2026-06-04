'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const driveImg = (id: string) => `https://lh3.googleusercontent.com/d/${id}`
const HEADSHOT = driveImg('1q2DAKWhGs4W7OLwvPIhcTCtDpXnMyP1u')

export default function Hero() {
  const [loaded, setLoaded]           = useState(false)
  const [videoReady, setVideoReady]   = useState(false)
  const [videoError, setVideoError]   = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const videoOp  = useTransform(scrollYProgress, [0, 0.6], [0.7, 0])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    setTimeout(() => setLoaded(true), 200)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReduced && videoRef.current) videoRef.current.pause()
  }, [prefersReduced])

  const stagger = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: loaded ? 1 : 0, y: loaded ? 0 : 28 },
    transition: { duration: 0.9, delay },
  })

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      {/* CSS fallback — always renders, sits below video */}
      <div className="hero-fallback" />

      {/* Seedance video — renders only when available */}
      {!videoError && !prefersReduced && (
        <motion.video
          ref={videoRef}
          className="video-bg"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: videoOp }}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </motion.video>
      )}

      {/* Glassmorphism overlay — on top of video */}
      {videoReady && !videoError && !prefersReduced && (
        <div className="video-glass-overlay" />
      )}

      {/* Grid texture */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, transparent, var(--surface-1))', zIndex: 2 }} />

      {/* Content — two-column: text left, photo right */}
      <motion.div
        style={{
          position: 'relative', zIndex: 10,
          maxWidth: 1280, margin: '0 auto',
          padding: '9rem 1.5rem 7rem',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '4rem',
          alignItems: 'center',
          y: contentY,
        }}
      >
        {/* Left — text */}
        <div>
          <motion.div {...stagger(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, var(--amber))' }} />
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)', fontSize: '0.68rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
              Demonte Williams · @Monte_Motivated
            </span>
          </motion.div>

          <motion.h1 {...stagger(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 0.92, color: '#f0f0f0', letterSpacing: '-0.03em', marginBottom: 28 }}>
            THE OPERATING<br />
            <span style={{ background: 'linear-gradient(135deg, var(--amber), #fcd34d, var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              SYSTEM
            </span>
            <br />
            FOR THE RELENTLESS
          </motion.h1>

          <motion.p {...stagger(0.2)} style={{ fontFamily: 'var(--font-mono)', color: '#888', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', lineHeight: 1.7, maxWidth: 480, marginBottom: '2.5rem', letterSpacing: '0.01em' }}>
            Stop improvising. The Next Step OS is a complete execution framework — AI-powered, systems-driven, built for entrepreneurs who refuse to ceiling out.
          </motion.p>

          <motion.div {...stagger(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#features" className="btn-primary">Get the OS →</a>
            <a href="/os" className="btn-outline">Open Dashboard</a>
          </motion.div>
        </div>

        {/* Right — headshot */}
        <motion.div
          {...stagger(0.15)}
          style={{ position: 'relative' }}
        >
          <div style={{
            position: 'relative',
            aspectRatio: '3/4',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(251,191,36,0.2)',
          }}>
            <Image
              src={HEADSHOT}
              alt="Demonte Williams"
              fill
              className="object-cover object-top"
              unoptimized
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.7) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--amber)', letterSpacing: '0.05em' }}>Demonte Williams</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Founder · @Monte_Motivated</p>
            </div>
          </div>
          {/* Amber glow behind photo */}
          <div style={{
            position: 'absolute', inset: '-20px', zIndex: -1,
            background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.08) 0%, transparent 70%)',
            borderRadius: 30,
          }} />
        </motion.div>

        {/* Stats row */}
        <motion.div {...stagger(0.4)} style={{ marginTop: 64, display: 'flex', gap: 0, justifyContent: 'center', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '1.5rem 0' }}>
          {[
            { n: '71/71', l: 'Summit Tickets Sold' },
            { n: '$0', l: 'Paid Marketing' },
            { n: '80K+', l: 'Ecosystem Reach' },
            { n: '100%', l: 'Room Retention' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '0 1rem', borderRight: i < 3 ? '1px solid var(--glass-border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--amber)', lineHeight: 1 }}>
                {s.n}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#555', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
