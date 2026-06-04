"use client"
import { useState, useRef, useEffect } from "react"

const interests = [
  "Monte OS Playbook",
  "Implementation Partnership",
  "Next Step Summit",
  "Summit Sponsorship",
  "Other",
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", interest: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, service: formState.interest }),
      })
      if (!response.ok) throw new Error("Submission failed")
      setSubmitted(true)
      setFormState({ name: "", email: "", interest: "", message: "" })
    } catch {
      setError("Something went wrong. Email us at amcprofessionalscs@gmail.com")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" style={{ background: "var(--surface-2)", padding: "8rem 0" }}>
      <div
        ref={ref}
        className="rg-2col"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}
      >
        {/* Left */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)", transition: "all 0.9s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ height: 1, width: 48, background: "linear-gradient(to right, transparent, var(--amber))" }} />
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--amber)", fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase" }}>
              Get In Touch
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem,5vw,4.5rem)",
            lineHeight: 0.92,
            color: "#f0f0f0",
            marginBottom: "1.75rem",
            letterSpacing: "-0.02em",
          }}>
            START THE<br />
            <span style={{ color: "var(--amber)" }}>CONVERSATION</span>
          </h2>

          <p style={{ fontFamily: "var(--font-mono)", color: "#666", lineHeight: 1.75, marginBottom: "2.5rem", fontSize: "0.875rem", fontWeight: 300 }}>
            Interested in the OS, the Summit, a partnership, or sponsorship? Tell us where you are and what you&rsquo;re building.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { label: "Email", value: "amcprofessionalscs@gmail.com", href: "mailto:amcprofessionalscs@gmail.com" },
              { label: "Phone", value: "251-477-5676", href: "tel:2514775676" },
              { label: "Instagram", value: "@Monte_Motivated", href: "https://instagram.com/Monte_Motivated" },
            ].map(c => (
              <div key={c.label}>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--amber)", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
                  {c.label}
                </div>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ fontFamily: "var(--font-mono)", color: "#d0d0d0", fontSize: "0.925rem", textDecoration: "none" }}
                >
                  {c.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)", transition: "all 0.9s 0.25s" }}>
          {submitted ? (
            <div
              className="glass-amber"
              style={{ padding: "3rem", textAlign: "center" }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚡</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "var(--amber)", marginBottom: "0.75rem" }}>
                WE GOT YOU
              </h3>
              <p style={{ fontFamily: "var(--font-mono)", color: "#666", fontSize: "0.825rem", lineHeight: 1.6 }}>
                Expect a response within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formState.name}
                onChange={handleChange}
                required
                className="os-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formState.email}
                onChange={handleChange}
                required
                className="os-input"
              />
              <select
                name="interest"
                value={formState.interest}
                onChange={handleChange}
                required
                className="os-input"
                style={{ cursor: "pointer" }}
              >
                <option value="">What are you interested in?</option>
                {interests.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <textarea
                name="message"
                placeholder="Tell us what you're building and what you need..."
                value={formState.message}
                onChange={handleChange}
                required
                className="os-input"
                style={{ minHeight: 120, resize: "none" }}
              />
              {error && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--pink)" }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ justifyContent: "center", opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "Sending..." : "Submit →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
