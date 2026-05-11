"use client"
import { useState, useEffect, useRef } from "react"

const stats = [
  { value:500, suffix:"+", label:"Projects Completed", detail:"Across Phoenix metro" },
  { value:8, suffix:"+", label:"Years in Business", detail:"Since 2016" },
  { value:100, suffix:"%", label:"Insured & Licensed", detail:"COI available same day" },
  { value:48, suffix:"HR", label:"Response Time", detail:"Emergency service available" },
]

function Counter({ value, suffix, inView }: { value:number, suffix:string, inView:boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let current = 0
    const steps = 60
    const increment = value / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 1800 / steps)
    return () => clearInterval(timer)
  }, [inView, value])
  return <span>{count}<span style={{color:"#3b82f6"}}>{suffix}</span></span>
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if(e.isIntersecting) setInView(true) }, {threshold:0.3})
    if(ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section style={{background:"#000",padding:"6rem 0",position:"relative"}}>
      <div style={{height:1,background:"linear-gradient(90deg,transparent,#3b82f6,transparent)",boxShadow:"0 0 20px rgba(59,130,246,0.4)"}} />
      <div ref={ref} style={{maxWidth:1280,margin:"0 auto",padding:"0 1.5rem",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
        {stats.map((s,i) => (
          <div key={i} style={{padding:"3rem 2rem",borderRight:"1px solid rgba(255,255,255,0.05)",opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(32px)",transition:`all 0.7s ${i*0.1}s`}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:"clamp(3rem,8vw,6rem)",lineHeight:0.9,color:"#f8f8f8",marginBottom:8}}>
              <Counter value={s.value} suffix={s.suffix} inView={inView} />
            </div>
            <div style={{color:"#f8f8f8",fontSize:"0.875rem",fontWeight:500,marginBottom:4}}>{s.label}</div>
            <div style={{fontFamily:"var(--font-mono)",color:"#a0a0a0",fontSize:"0.75rem"}}>{s.detail}</div>
          </div>
        ))}
      </div>
      <div style={{height:1,background:"linear-gradient(90deg,transparent,#3b82f6,transparent)",boxShadow:"0 0 20px rgba(59,130,246,0.4)"}} />
    </section>
  )
}
