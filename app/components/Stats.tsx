"use client"
import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "71/71",  label: "Summit Tickets Sold",    detail: "$0 paid marketing" },
  { value: "80K+",   label: "Ecosystem Impressions",  detail: "Summit 1 · 60 days" },
  { value: "+601%",  label: "Reels Performance",      detail: "43.8% non-follower reach" },
  { value: "100%",   label: "Room Retention",         detail: "Tornado warning, full house" },
]

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: "var(--surface-1)", padding: "0", position: "relative" }}>
      <div className="glow-line-amber" />

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "3.5rem 2rem",
              borderRight: i < 3 ? "1px solid var(--glass-border)" : "none",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.7s ${i * 0.1}s`,
              textAlign: "center",
            }}
          >
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem,5vw,4.5rem)",
              lineHeight: 0.9,
              color: i % 2 === 0 ? "var(--amber)" : "var(--cyan)",
              marginBottom: 10,
            }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#e0e0e0", marginBottom: 4, letterSpacing: "0.05em" }}>
              {s.label}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#444", letterSpacing: "0.08em" }}>
              {s.detail}
            </div>
          </div>
        ))}
      </div>

      <div className="glow-line-amber" />
    </section>
  )
}
