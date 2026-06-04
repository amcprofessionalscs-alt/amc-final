"use client"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.4s",
      background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1.1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Wordmark */}
        <a href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--amber)", letterSpacing: "0.15em" }}>
            NEXT STEP OS
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "#444", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            by @Monte_Motivated
          </span>
        </a>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {[
            ["#features", "The OS"],
            ["#about", "About"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="/os" className="btn-primary" style={{ fontSize: "0.68rem" }}>
          Open Dashboard →
        </a>
      </div>
    </nav>
  )
}
