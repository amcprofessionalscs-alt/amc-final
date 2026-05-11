"use client"
import { useEffect, useRef, useState } from "react"
const services = [
  { id:"01", title:"Post-Construction Cleaning", desc:"Final construction cleaning for tenant improvements, retail buildouts, and commercial renovations. We prepare your space for immediate occupancy.", bullets:["Construction debris removal","Window and glass cleaning","Flooring prep and polish","Fixture wipe-down"] },
  { id:"02", title:"Commercial Janitorial", desc:"Recurring commercial cleaning for offices, retail spaces, and medical facilities. Flexible scheduling daily, weekly, or custom.", bullets:["Office and lobby cleaning","Restroom sanitation","Floor care and maintenance","Trash and recycling"] },
  { id:"03", title:"Medical Facility Cleaning", desc:"Specialized disinfection and cleaning protocols for medical offices and clinics. OSHA-compliant procedures with hospital-grade products.", bullets:["Disinfection protocols","Exam room turnover","OSHA compliance","Biohazard awareness"] },
  { id:"04", title:"Specialty Cleaning", desc:"Deep cleaning, floor stripping and waxing, and specialty services for unique facility needs. We handle the tough jobs.", bullets:["Deep cleaning and sanitizing","Floor stripping and waxing","Pressure washing","Move-in and move-out"] },
]
export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if(e.isIntersecting) setInView(true) }, {threshold:0.1})
    if(ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section id="services" style={{background:"#0a0a0a",padding:"8rem 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 1.5rem"}}>
        <div style={{marginBottom:"5rem"}}>
          <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.5rem,6vw,5rem)",lineHeight:0.9,color:"#f8f8f8"}}>COMMERCIAL<br /><span style={{color:"#3b82f6"}}>CLEANING</span> SERVICES</h2>
        </div>
        <div ref={ref} style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,background:"rgba(255,255,255,0.05)"}}>
          {services.map((s,i) => (
            <div key={s.id} style={{background:"#1a1a1a",padding:"3rem",opacity:inView?1:0,transition:`all 0.7s ${i*0.12}s`}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"5rem",lineHeight:1,color:"rgba(255,255,255,0.05)",marginBottom:16}}>{s.id}</div>
              <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.5rem",color:"#f8f8f8",marginBottom:16}}>{s.title}</h3>
              <p style={{color:"#a0a0a0",fontSize:"0.875rem",lineHeight:1.7,marginBottom:24,fontWeight:300}}>{s.desc}</p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
                {s.bullets.map(b => (
                  <li key={b} style={{display:"flex",alignItems:"center",gap:12,fontSize:"0.875rem",color:"#a0a0a0"}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:"#3b82f6",flexShrink:0,display:"block"}} />{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}