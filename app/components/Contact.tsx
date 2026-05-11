"use client"
import { useState } from "react"

export default function Contact() {
  const [form, setForm] = useState({name:"",company:"",phone:"",email:"",service:"",message:""})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }
  const input = {width:"100%",background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",color:"#f8f8f8",fontSize:"0.875rem",padding:"12px 16px",outline:"none",fontFamily:"var(--font-body)",fontWeight:300}
  return (
    <section id="contact" style={{background:"#0a0a0a",padding:"8rem 0",position:"relative"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 1.5rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
            <span style={{height:1,width:48,background:"#3b82f6",display:"block"}} />
            <span style={{fontFamily:"var(--font-mono)",color:"#3b82f6",fontSize:"0.75rem",letterSpacing:"0.4em",textTransform:"uppercase"}}>Get In Touch</span>
          </div>
          <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.5rem,5vw,4.5rem)",lineHeight:0.9,color:"#f8f8f8",marginBottom:32}}>
            GET A FREE<br /><span style={{color:"#3b82f6"}}>QUOTE TODAY</span>
          </h2>
          <p style={{color:"#a0a0a0",lineHeight:1.8,marginBottom:48,fontWeight:300,maxWidth:400}}>Ready to get started? Request a free quote. We respond within 48 hours and can mobilize quickly to meet your timeline.</p>
          <div style={{display:"flex",flexDirection:"column",gap:24}}>
            {[
              {label:"Call or Text",value:"251-477-5676",href:"tel:2514775676"},
              {label:"Email",value:"amcprofessionalscs@gmail.com",href:"mailto:amcprofessionalscs@gmail.com"},
              {label:"Service Area",value:"Greater Phoenix Metro",href:"#"},
            ].map((item,i) => (
              <a key={i} href={item.href} style={{display:"flex",alignItems:"center",gap:16,textDecoration:"none"}}>
                <div style={{width:40,height:40,border:"1px solid rgba(59,130,246,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:"#3b82f6",fontSize:"1rem"}}>arrow</span>
                </div>
                <div>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:"0.7rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#a0a0a0",marginBottom:2}}>{item.label}</div>
                  <div style={{color:"#f8f8f8",fontSize:"0.875rem"}}>{item.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          {submitted ? (
            <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",border:"1px solid rgba(59,130,246,0.3)",background:"#1a1a1a",padding:48}}>
              <div style={{color:"#3b82f6",fontSize:"4rem",marginBottom:16}}>✓</div>
              <h3 style={{fontFamily:"var(--font-display)",fontSize:"2rem",color:"#f8f8f8",marginBottom:16}}>MESSAGE SENT</h3>
              <p style={{color:"#a0a0a0",fontSize:"0.875rem"}}>Demonte will get back to you within 48 hours with a free quote.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <input style={input} placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                <input style={input} placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <input style={input} placeholder="Phone" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required />
                <input style={input} placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
              </div>
              <select style={{...input,cursor:"pointer"}} value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>
                <option value="">Service Type</option>
                <option value="post-construction">Post-Construction Cleaning</option>
                <option value="janitorial">Commercial Janitorial</option>
                <option value="medical">Medical Facility Cleaning</option>
                <option value="specialty">Specialty / Deep Clean</option>
              </select>
              <textarea style={{...input,resize:"none",height:144}} placeholder="Project details, sq footage, timeline..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
              <button type="submit" className="btn-primary" style={{justifyContent:"center",opacity:loading?0.7:1}}>
                {loading ? "Sending..." : "Request Free Quote"}
              </button>
              <p style={{fontFamily:"var(--font-mono)",fontSize:"0.7rem",color:"#a0a0a0",textAlign:"center"}}>We respond within 48 hours - Licensed and Insured</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
