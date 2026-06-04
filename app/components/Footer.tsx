export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: "var(--surface-1)", borderTop: "1px solid var(--glass-border)" }}>
      <div className="glow-line-amber" />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div className="rg-footer" style={{ marginBottom: "3.5rem" }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--amber)", letterSpacing: "0.15em", marginBottom: 4 }}>
                NEXT STEP OS
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#444", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                by Demonte Williams · @Monte_Motivated
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", color: "#444", fontSize: "0.8rem", lineHeight: 1.7, maxWidth: 320, fontWeight: 300 }}>
              The operating system for entrepreneurs who refuse to improvise. AI-powered. Systems-driven. Built to break the ceiling.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
              <a href="mailto:amcprofessionalscs@gmail.com" style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#555", textDecoration: "none" }}>
                amcprofessionalscs@gmail.com
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#f0f0f0", marginBottom: 20 }}>
              Platform
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["/os", "Dashboard"],
                ["/login", "Sign In"],
                ["#features", "The OS"],
                ["#about", "About"],
              ].map(([href, label]) => (
                <a key={href} href={href} style={{ fontFamily: "var(--font-mono)", color: "#444", fontSize: "0.8rem", textDecoration: "none" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Summit */}
          <div>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#f0f0f0", marginBottom: 20 }}>
              Summit
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["https://bit.ly/4d5KRHV", "Register"],
                ["#contact", "Sponsorship"],
                ["#contact", "Partnership"],
              ].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ fontFamily: "var(--font-mono)", color: "#444", fontSize: "0.8rem", textDecoration: "none" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#f0f0f0", marginBottom: 20 }}>
              Connect
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["https://instagram.com/Monte_Motivated", "@Monte_Motivated"],
                ["tel:2514775676", "251-477-5676"],
              ].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ fontFamily: "var(--font-mono)", color: "#444", fontSize: "0.8rem", textDecoration: "none" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--glass-border)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#333" }}>
            © {year} Next Step OS · Demonte Williams. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="/terms" style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#333", textDecoration: "none" }}>
              Terms of Use
            </a>
            <a href="/terms#payment" style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#333", textDecoration: "none" }}>
              Payment Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
