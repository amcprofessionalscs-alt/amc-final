"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const driveImg = (id: string) => `https://lh3.googleusercontent.com/d/${id}`

const PHOTOS = [
  { id: "1N9KjdWKd_b_sNH6B9_JXbPKX2t-zV1bt", span: 2, tall: true },   // Nextstep1 — feature
  { id: "13_akixPQenPopB5XMBt8okfD0Fmoqv6j", span: 1, tall: false },  // 466A7691
  { id: "1KxVfV1BaHlA01828K03QMBmawDtd5XFF", span: 1, tall: false },  // 466A7666
  { id: "1gEeEQ5RD1cysZxW-IlHJQawIAnuhG5er", span: 1, tall: false },  // 466A7662
  { id: "1_eC45uQxI3uu5tXC2Bodc1Dfv6WVyTuf", span: 1, tall: false },  // 466A7644
  { id: "10iJidtYKMXv8ang756qVj8iWXBFz9ktI", span: 1, tall: false },  // 466A7657
  { id: "1OEfYLxHf6PLsh1zzAzoW82BF57s9TqBT", span: 1, tall: false },  // 466A7656
  { id: "1bTu5Ii_nRFfXWNvDX768x1Jn409lwfNm", span: 1, tall: false },  // 466A7654
]

export default function SummitGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: "var(--surface-1)", padding: "8rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ height: 1, width: 48, background: "linear-gradient(to right, transparent, var(--amber))" }} />
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--amber)", fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase" }}>
                Summit 1 · April 17, 2026 · BMO Bank Milwaukee
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "#f0f0f0", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
              NEXT STEP<br /><span style={{ color: "var(--amber)" }}>SUMMIT</span>
            </h2>
          </div>
          <a
            href="https://bit.ly/4d5KRHV"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ flexShrink: 0 }}
          >
            Register for Next →
          </a>
        </div>

        {/* Gallery grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "240px",
            gap: 8,
          }}
        >
          {PHOTOS.map((p, i) => (
            <div
              key={p.id}
              style={{
                position: "relative",
                gridColumn: p.span === 2 ? "span 2" : "span 1",
                gridRow: p.tall ? "span 2" : "span 1",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--glass-border)",
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0.97)",
                transition: `all 0.5s ${i * 0.07}s`,
              }}
            >
              <Image
                src={driveImg(p.id)}
                alt={`Summit photo ${i + 1}`}
                fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                unoptimized
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,15,0.4) 0%, transparent 60%)" }} />
            </div>
          ))}
        </div>

        {/* Tornado note */}
        <div style={{
          marginTop: "2rem",
          padding: "1.25rem 1.75rem",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          borderRadius: 12,
          textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "#666" }}>
            <span style={{ color: "var(--amber)", fontWeight: 500 }}>Tornado warning the night of the event.</span>
            {" "}Every seat was filled. Nobody left.
          </p>
        </div>
      </div>
    </section>
  )
}
