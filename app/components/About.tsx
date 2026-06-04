"use client"
import { useEffect, useRef, useState } from "react"

const principles = [
  { label: "Execution Beats Inspiration", color: "var(--amber)" },
  { label: "The Law of 1%",               color: "var(--amber)" },
  { label: "AI Amplifies the Strategist", color: "var(--cyan)" },
  { label: "The Margin Doctrine",         color: "var(--cyan)" },
  { label: "Community is Infrastructure", color: "var(--amber)" },
  { label: "Systems Create Freedom",      color: "var(--cyan)" },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" style={{ background: "var(--surface-1)", padding: "8rem 0" }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        {/* Left — jewel graphic + stat card */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.9s",
          }}
        >
          {/* Main glass panel */}
          <div
            className="glass-amber"
            style={{
              padding: "3rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background grid */}
            <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.8 }} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--amber)",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}>
                Next Step Summit · Event Series
              </div>

              <blockquote style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem,3vw,2.25rem)",
                color: "#f0f0f0",
                lineHeight: 1.15,
                marginBottom: "2rem",
                letterSpacing: "-0.01em",
              }}>
                &ldquo;This is not a conference.<br />
                It&rsquo;s a conversation<br />
                <span style={{ color: "var(--amber)" }}>at the table.&rdquo;</span>
              </blockquote>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { n: "71/71", l: "Tickets Sold · Summit 1" },
                  { n: "$0", l: "In Paid Marketing" },
                  { n: "9", l: "Speakers Confirmed for Next Event" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--amber)", lineHeight: 1 }}>{s.n}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BMO tag */}
          <div style={{
            marginTop: "1rem",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: 10,
            padding: "0.875rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#666", letterSpacing: "0.12em" }}>
              In partnership with BMO Bank Milwaukee
            </span>
          </div>
        </div>

        {/* Right — brand story */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.9s 0.25s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ height: 1, width: 48, background: "linear-gradient(to right, transparent, var(--cyan))" }} />
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)", fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase" }}>
              The Founder
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem,5vw,4rem)",
            lineHeight: 0.92,
            color: "#f0f0f0",
            marginBottom: "2rem",
            letterSpacing: "-0.02em",
          }}>
            DEMONTE<br />
            <span style={{ color: "var(--amber)" }}>WILLIAMS</span>
          </h2>

          <p style={{ fontFamily: "var(--font-mono)", color: "#777", lineHeight: 1.75, marginBottom: "1.25rem", fontSize: "0.875rem", fontWeight: 300 }}>
            Entrepreneur, public speaker, and systems strategist based in Phoenix, AZ with deep roots in Milwaukee, WI. Founder of Next Step OS — a complete business execution framework built for entrepreneurs who refuse to ceiling out.
          </p>

          <p style={{ fontFamily: "var(--font-mono)", color: "#555", lineHeight: 1.75, marginBottom: "2.5rem", fontSize: "0.875rem", fontWeight: 300 }}>
            Co-producer of the Next Step Summit alongside Rashad Washington of ProPainter USA. The Summit sold 71/71 tickets with zero paid marketing. BMO Bank Milwaukee came on as a co-hosting partner after the first event.
          </p>

          {/* Principles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "2.5rem" }}>
            {principles.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "#888",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-12px)",
                  transition: `all 0.5s ${0.4 + i * 0.07}s`,
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                {p.label}
              </div>
            ))}
          </div>

          <a
            href="https://instagram.com/Monte_Motivated"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--amber)",
              textDecoration: "none",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            @Monte_Motivated →
          </a>
        </div>
      </div>
    </section>
  )
}
