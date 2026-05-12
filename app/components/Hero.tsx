"use client"
import { useState, useEffect } from "react"
export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 300) }, [])
  return (
    <section id="hero" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"linear-gradient(135deg, #0a0a0a 0%, #1a2a4a 50%, #0a0a0a 100%)"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.05) 0%, transparent 50%)",pointerEvents:"none"}} />
      <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.3) 100%)",zIndex:1}} />
      <div style={{position:"relative",zIndex:10,maxWidth:1280,margin:"0 auto",padding:"8rem 1.5rem",textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:32,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)",transition:"all 1s"}}>
          <span style={{height:1,width:48,background:"#3b82f6"}} />
          <span style={{fontFamily:"var(--font-mono)",color:"#3b82f6",fontSize:"0.75rem",letterSpacing:"0.4em",textTransform:"uppercase"}}>Phoenix Metro</span>
          <span style={{height:1,width:48,background:"#3b82f6"}} />
        </div>
        <h1 style={{fontFamily:"var(--font-display)",fontSize:"clamp(3.5rem,12vw,10rem)",lineHeight:0.88,color:"#f8f8f8",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(32px)",transition:"all 1s 0.2s"}}>
          BUILT CLEAN.<br /><span style={{background:"linear-gradient(135deg,#60a5fa,#3b82f6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>FINISHED RIGHT.</span>
        </h1>
        <p style={{marginTop:32,maxWidth:600,margin:"2rem auto 0",color:"#a0a0a0",fontSize:"1.125rem",lineHeight:1.7,fontWeight:300,opacity:loaded?1:0,transition:"all 1s 0.4s"}}>
          Commercial cleaning specialists for contractors, retail, medical, and office facilities across the Phoenix metro area. From post-construction to daily janitorial - we deliver spaces ready for occupancy.
        </p>
        <div style={{marginTop:48,display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",opacity:loaded?1:0,transition:"all 1s 0.6s"}}>
          <a href="#contact" className="btn-primary">Get a Free Quote</a>
          <a href="#projects" className="btn-outline">View Our Work</a>
        </div>
      </div>
    </section>
  )
}
