"use client"
import { useState, useRef, useEffect } from "react"

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [formState, setFormState] = useState({
    name: "", company: "", phone: "", email: "", service: "", message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if(e.isIntersecting) setInView(true) }, {threshold:0.1})
    if(ref.current) observer.observe(ref.current)
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
        body: JSON.stringify(formState),
      })

      if (!response.ok) throw new Error("Submission failed")
      setSubmitted(true)
      setFormState({ name: "", company: "", phone: "", email: "", service: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError("Error submitting form. Please try again or call us directly.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" style={{background:"#0a0a0a",padding:"8rem 0"}}>
      <div ref={ref} style={{maxWidth:1280,margin:"0 auto",padding:"0 1.5rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"start"}}>
        <div style={{opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(-48px)",transition:"all 1s"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:32}}>
            <span style={{height:1,width:48,background:"#3b82f6"}} />
            <span style={{fontFamily:"var(--font-mono)",color:"#3b82f6",fontSize:"0.75rem",letterSpacing:"0.4em",textTransform:"uppercase"}}>Get In Touch</span>
          </div>
          <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.5rem,5vw,4.5rem)",lineHeight:0.9,color:"#f8f8f8",marginBottom:"2rem"}}>READY TO<br /><span style={{color:"#3b82f6"}}>GET STARTED?</span></h2>
          <p style={{color:"#a0a0a0",lineHeight:1.8,marginBottom:32,fontWeight:300}}>Request a free quote for your project. We respond within 48 hours and can mobilize quickly to meet your construction or facility timeline.</p>
          <div style={{display:"flex",flexDirection:"column",gap:24}}>
            <div>
              <div style={{fontFamily:"var(--font-mono)",color:"#3b82f6",fontSize:"0.7rem",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Call or Text</div>
              <a href="tel:2514775676" style={{color:"#f8f8f8",fontSize:"1.5rem",fontFamily:"var(--font-display)",textDecoration:"none"}}>251-477-5676</a>
            </div>
            <div>
              <div style={{fontFamily:"var(--font-mono)",color:"#3b82f6",fontSize:"0.7rem",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Email</div>
              <a href="mailto:amcprofessionalscs@gmail.com" style={{color:"#f8f8f8",fontSize:"1.1rem",textDecoration:"none"}}>amcprofessionalscs@gmail.com</a>
            </div>
            <div>
              <div style={{fontFamily:"var(--font-mono)",color:"#3b82f6",fontSize:"0.7rem",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Service Area</div>
              <p style={{color:"#a0a0a0",fontSize:"1rem"}}>Phoenix Metro and surrounding areas. We also service other Arizona regions - ask about availability.</p>
            </div>
          </div>
        </div>

        <div style={{opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(48px)",transition:"all 1s 0.3s"}}>
          {submitted ? (
            <div style={{background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",padding:"2rem",borderRadius:"8px",textAlign:"center"}}>
              <div style={{fontSize:"3rem",marginBottom:16}}>✓</div>
              <h3 style={{color:"#f8f8f8",marginBottom:8}}>Thank You!</h3>
              <p style={{color:"#a0a0a0"}}>We received your request and will contact you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:16}}>
              <input type="text" name="name" placeholder="Your Name" value={formState.name} onChange={handleChange} required style={{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",color:"#f8f8f8",padding:"0.75rem 1rem",borderRadius:"4px",fontSize:"0.875rem"}} />
              <input type="text" name="company" placeholder="Company" value={formState.company} onChange={handleChange} style={{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",color:"#f8f8f8",padding:"0.75rem 1rem",borderRadius:"4px",fontSize:"0.875rem"}} />
              <input type="email" name="email" placeholder="Email Address" value={formState.email} onChange={handleChange} required style={{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",color:"#f8f8f8",padding:"0.75rem 1rem",borderRadius:"4px",fontSize:"0.875rem"}} />
              <input type="tel" name="phone" placeholder="Phone Number" value={formState.phone} onChange={handleChange} required style={{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",color:"#f8f8f8",padding:"0.75rem 1rem",borderRadius:"4px",fontSize:"0.875rem"}} />
              <select name="service" value={formState.service} onChange={handleChange} required style={{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",color:"#f8f8f8",padding:"0.75rem 1rem",borderRadius:"4px",fontSize:"0.875rem"}}>
                <option value="">Select a Service</option>
                <option value="Post-Construction Cleaning">Post-Construction Cleaning</option>
                <option value="Commercial Janitorial">Commercial Janitorial</option>
                <option value="Medical Facility Cleaning">Medical Facility Cleaning</option>
                <option value="Specialty Cleaning">Specialty Cleaning</option>
              </select>
              <textarea name="message" placeholder="Tell us about your project..." value={formState.message} onChange={handleChange} required style={{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",color:"#f8f8f8",padding:"0.75rem 1rem",borderRadius:"4px",fontSize:"0.875rem",minHeight:"120px",fontFamily:"inherit"}} />
              {error && <div style={{color:"#ef4444",fontSize:"0.875rem"}}>{error}</div>}
              <button type="submit" disabled={loading} style={{background:"#3b82f6",color:"white",padding:"0.875rem 2rem",borderRadius:"4px",border:"none",fontFamily:"var(--font-mono)",fontSize:"0.8rem",letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",opacity:loading?0.6:1}}>
                {loading ? "Sending..." : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}