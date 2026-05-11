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
  const links = [["Services","#services"],["Projects","#projects"],["About","#about"],["Contact","#contact"]]
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,transition:"all 0.5s",background:scrolled?"rgba(0,0,0,0.9)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.05)":"none"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"1rem 1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="#" style={{display:"flex",alignItems:"center",gap:12,textDecoration:"none"}}>
          <img src="/images/logo.jpg" alt="AMC" style={{width:40,height:40,objectFit:"contain"}} />
          <div>
            <div style={{fontFamily:"var(--font-display)",letterSpacing:"0.2em",fontSize:"1.25rem",color:"#f8f8f8"}}>AMC</div>
            <div style={{fontSize:"0.55rem",color:"#a0a0a0",letterSpacing:"0.3em",textTransform:"uppercase"}}>Professionals</div>
          </div>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:40}}>
          {links.map(([label,href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
        </div>
        <a href="tel:2514775676" className="btn-primary">251-477-5676</a>
      </div>
    </nav>
  )
}
