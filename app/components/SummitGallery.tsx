"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const PHOTOS = [
  { src: "/images/summit-1.png", span: 2, tall: true },
  { src: "/images/summit-2.jpg", span: 1, tall: false },
  { src: "/images/summit-3.jpg", span: 1, tall: false },
  { src: "/images/summit-4.jpg", span: 1, tall: false },
  { src: "/images/summit-5.jpg", span: 1, tall: false },
  { src: "/images/summit-6.jpg", span: 1, tall: false },
  { src: "/images/summit-7.jpg", span: 1, tall: false },
  { src: "/images/summit-8.jpg", span: 1, tall: false },
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
          className="rg-gallery"
          style={{ gap: 8 }}
        >
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
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
                src={p.src}
                alt={`Summit photo ${i + 1}`}
                fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
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
