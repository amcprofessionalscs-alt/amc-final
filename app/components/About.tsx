"use client"
import { useEffect, useRef, useState } from "react"

const capabilities = ["Post-Construction Final Cleaning","Daily Janitorial Programs","Medical & Healthcare Facilities","Retail Tenant Improvements","Office Building Maintenance","Floor Care & Restoration","Emergency & One-Time Cleans","Contractor-Approved Vendor"]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if(e.isIntersecting) setInView(true) }, {threshold:0.15})
    if(ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section id="about" style={{background:"#0a0a0a",padding:"8rem 0",position:"relative"}}>
      <div ref={ref} style={{maxWidth:1280,margin:"0 auto",padding:"0 1.5rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
        <div style={{opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(-48px)",transition:"all 1s"}}>
          <div style={{position:"relative",aspectRatio:"4/5",overflow:"hidden",background:"#2a2a2a"}}>
            <video style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.8}} autoPlay muted loop playsInline>
              <source src="/videos/Video_3.mov" type="video/mp4" />
            </video>
            <div style={{position:"absolute",top:0,left:0,width:64,height:64,borderTop:"2px solid #3b82f6",borderLeft:"2px solid #3b82f6"}} />
            <div style={{position:"absolute",bottom:0,right:0,width:64,height:64,borderBottom:"2px solid #3b82f6",borderRight:"2px solid #3b82f6"}} />
          </div>
        </div>
        <div style={{opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(48px)",transition:"all 1s 0.3s"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
            <span style={{height:1,width:48,background:"#3b82f6",display:"block"}} />
            <span style={{fontFamily:"var(--font-mono)",color:"#3b82f6",fontSize:"0.75rem",letterSpacing:"0.4em",textTransform:"uppercase"}}>About Us</span>
          </div>
          <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.5rem,5vw,4rem)",lineHeight:0.9,color:"#f8f8f8",marginBottom:"2rem"}}>
            PHOENIX COMMERCIAL<br /><span style={{color:"#3b82f6"}}>CLEANING PRO</span>
          </h2>
          <p style={{color:"#a0a0a0",lineHeight:1.8,marginBottom:16,fontWeight:300}}>AMC Professionals LLC is a Phoenix-based commercial cleaning company founded by Demonte Williams. We specialize in serving contractors, property managers, and facility operators who need reliable, professional results on tight timelines.</p>
          <p style={{color:"#a0a0a0",lineHeight:1.8,marginBottom:40,fontWeight:300}}>From post-construction final cleans on retail tenant improvements to ongoing janitorial programs for medical offices and commercial buildings -- we bring the same attention to detail to every project.</p>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:40}}>
            {capabilities.map((item,i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,fontSize:"0.875rem",color:"#a0a0a0",opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(-16px)",transition:`all 0.5s ${0.4+i*0.06}s`}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#3b82f6",flexShrink:0,display:"block"}} />{item}
              </div>
            ))}
          </div>
          <div style={{border:"1px solid rgba(59,130,246,0.2)",background:"rgba(59,130,246,0.05)",padding:16,fontSize:"0.875rem",color:"#a0a0a0"}}>
            <span style={{fontFamily:"var(--font-mono)",color:"#3b82f6",fontWeight:500}}>Insured and Compliant: </span>
            COI, W9, and vendor onboarding documentation available on request.
          </div>
        </div>
      </div>
    </section>
  )
}
