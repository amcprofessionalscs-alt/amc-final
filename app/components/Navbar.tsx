"use client"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links: [string, string][] = [
    ["#features", "The OS"],
    ["#about", "About"],
    ["/audit", "OS Audit"],
    ["#contact", "Contact"],
  ]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.4s",
      background: scrolled || menuOpen ? "rgba(10,10,15,0.95)" : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
      borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Wordmark */}
        <a href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "var(--amber)", letterSpacing: "0.15em" }}>
            NEXT STEP OS
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#444", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            by @Monte_Motivated
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {links.map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="/os" className="btn-primary hide-mobile" style={{ fontSize: "0.68rem" }}>
          Open Dashboard →
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            flexDirection: "column",
            gap: 5,
          }}
          className="show-mobile"
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block",
              width: 22,
              height: 2,
              background: menuOpen ? "var(--amber)" : "#f0f0f0",
              borderRadius: 2,
              transition: "all 0.2s",
              transform: menuOpen && i === 0 ? "rotate(45deg) translate(4px, 4px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          padding: "1rem 1.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          borderTop: "1px solid var(--glass-border)",
        }}>
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "#d0d0d0", textDecoration: "none", letterSpacing: "0.1em" }}
            >
              {label}
            </a>
          ))}
          <a
            href="/os"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ textAlign: "center", justifyContent: "center", marginTop: "0.5rem" }}
          >
            Open Dashboard →
          </a>
        </div>
      )}
    </nav>
  )
}
