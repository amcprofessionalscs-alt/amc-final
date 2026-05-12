"use client"
import { useEffect, useRef, useState } from "react"
const projects = [
  { id:1, title:"Cosmo Prof - Scottsdale", type:"Post-Construction Clean", size:"2,289 sq ft", client:"Diamond Contractors, Inc.", image:"/images/project-retail.jpg", tag:"Retail" },
  { id:2, title:"Medical Office Facility", type:"Medical Cleaning", size:"Full Facility", client:"Healthcare Client", image:"/images/project-medical.jpg", tag:"Medical" },
  { id:3, title:"Commercial Office Build", type:"Janitorial Services", size:"Recurring", client:"Office Services", image:"/images/project-office.jpg", tag:"Office" },
  { id:4, title:"Tenant Improvement Project", type:"Construction Cleaning", size:"TI Build", client:"Phoenix Contractor", image:"/images/project-ti.jpg", tag:"Construction" },
]
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if(e.isIntersecting) setInView(true) }, {threshold:0.1})
    if(ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section id="projects" style={{background:"#0a0a0a",padding:"8rem 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 1.5rem"}}>
        <div style={{marginBottom:"5rem"}}>
          <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.5rem,6vw,5rem)",lineHeight:0.9,color:"#f8f8f8"}}>RECENT<br /><span style={{color:"#3b82f6"}}>PROJECT WORK</span></h2>
        </div>
        <div ref={ref} style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24}}>
          {projects.map((p,i) => (
            <div key={p.id} style={{opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(32px)",transition:`all 0.6s ${i*0.15}s`,background:"#1a1a1a",borderRadius:"8px",overflow:"hidden",cursor:"pointer",transition:"all 0.3s"}}>
              <div style={{position:"relative",height:280,background:"linear-gradient(135deg, #1a3a5a 0%, #2a4a7a 100%)",overflow:"hidden"}}>
                <img src={p.image} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.85}} />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.7) 100%)"}} />
              </div>
              <div style={{padding:"1.5rem"}}>
                <div style={{display:"flex",gap:8,marginBottom:12}}>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:"0.65rem",color:"#3b82f6",background:"rgba(59,130,246,0.1)",padding:"0.25rem 0.75rem",borderRadius:"4px",textTransform:"uppercase",letterSpacing:"0.1em"}}>{p.tag}</span>
                </div>
                <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.25rem",color:"#f8f8f8",marginBottom:8}}>{p.title}</h3>
                <p style={{color:"#a0a0a0",fontSize:"0.875rem",marginBottom:12}}>{p.type}</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"0.75rem",color:"#707070"}}>
                  <span>{p.size}</span>
                  <span>{p.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}