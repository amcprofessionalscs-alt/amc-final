"use client"
import { useEffect, useRef, useState } from "react"
const projects = [
  { id:1, title:"Cosmo Prof Scottsdale", type:"Post-Construction Clean", size:"2,289 sq ft", client:"Diamond Contractors Inc", image:"/images/project-retail.jpg", tag:"Retail" },
  { id:2, title:"Medical Office Facility", type:"Medical Cleaning", size:"Full Facility", client:"Healthcare Client", image:"/images/project-medical.jpg", tag:"Medical" },
  { id:3, title:"Commercial Office Build", type:"Janitorial Services", size:"Recurring", client:"Recession Proof", image:"/images/project-office.jpg", tag:"Office" },
  { id:4, title:"Tenant Improvement", type:"Construction Cleaning", size:"TI Build", client:"Phoenix Metro", image:"/images/project-ti.jpg", tag:"Construction" },
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
    <section id="projects" style={{background:"#000",padding:"8rem 0"}}>
      <div ref={ref} style={{maxWidth:1280,margin:"0 auto",padding:"0 1.5rem"}}>
        <div style={{marginBottom:"5rem"}}>
          <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.5rem,6vw,5rem)",lineHeight:0.9,color:"#f8f8f8"}}>RECENT<br /><span style={{color:"#3b82f6"}}>PROJECTS</span></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24}}>
          {projects.map((p,i) => (
            <div key={p.id} style={{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.05)",overflow:"hidden",opacity:inView?1:0,transition:`all 0.7s ${i*0.1}s`}}>
              <div style={{position:"relative",height:256,overflow:"hidden",background:"#2a2a2a"}}>
                <img src={p.image} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.8}} />
                <span style={{position:"absolute",top:16,left:16,fontFamily:"var(--font-mono)",fontSize:"0.7rem",textTransform:"uppercase",background:"#3b82f6",color:"white",padding:"4px 12px"}}>{p.tag}</span>
              </div>
              <div style={{padding:"1.5rem"}}>
                <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.25rem",color:"#f8f8f8",marginBottom:8}}>{p.title}</h3>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.75rem",color:"#a0a0a0",marginBottom:8}}>{p.type} - {p.size}</div>
                <div style={{fontSize:"0.75rem",color:"#a0a0a0"}}>Client: {p.client}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}