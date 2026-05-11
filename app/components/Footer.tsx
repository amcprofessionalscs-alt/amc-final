export default function Footer() {
  return (
    <footer style={{background:"#000",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
      <div style={{height:1,background:"linear-gradient(90deg,transparent,#3b82f6,transparent)",boxShadow:"0 0 20px rgba(59,130,246,0.4)"}} />
      <div style={{maxWidth:1280,margin:"0 auto",padding:"4rem 1.5rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"3rem",marginBottom:"4rem"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              <img src="/images/logo.jpg" alt="AMC" style={{width:40,height:40,objectFit:"contain"}} />
              <div>
                <div style={{fontFamily:"var(--font-display)",letterSpacing:"0.2em",fontSize:"1.1rem",color:"#f8f8f8"}}>AMC PROFESSIONALS</div>
                <div style={{fontSize:"0.55rem",color:"#a0a0a0",letterSpacing:"0.3em",textTransform:"uppercase"}}>Commercial Cleaning LLC</div>
              </div>
            </div>
            <p style={{color:"#a0a0a0",fontSize:"0.875rem",lineHeight:1.7,maxWidth:360,fontWeight:300}}>Phoenix metro trusted commercial cleaning partner for contractors, property managers, and facility operators. Licensed, insured, and contractor-approved.</p>
            <div style={{display:"flex",gap:12,marginTop:24,alignItems:"center"}}>
              <a href="tel:2514775676" style={{fontFamily:"var(--font-mono)",fontSize:"0.75rem",color:"#3b82f6",textDecoration:"none"}}>251-477-5676</a>
              <span style={{color:"#a0a0a0"}}>·</span>
              <a href="mailto:amcprofessionalscs@gmail.com" style={{fontFamily:"var(--font-mono)",fontSize:"0.75rem",color:"#a0a0a0",textDecoration:"none"}}>amcprofessionalscs@gmail.com</a>
            </div>
          </div>
          <div>
            <h4 style={{fontFamily:"var(--font-mono)",fontSize:"0.75rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#f8f8f8",marginBottom:24}}>Services</h4>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {["Post-Construction Cleaning","Commercial Janitorial","Medical Facilities","Floor Care","Specialty Cleaning"].map(s => (
                <a key={s} href="#services" style={{color:"#a0a0a0",fontSize:"0.875rem",textDecoration:"none"}}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{fontFamily:"var(--font-mono)",fontSize:"0.75rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#f8f8f8",marginBottom:24}}>Service Area</h4>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {["Phoenix","Scottsdale","Tempe","Mesa","Chandler","Glendale"].map(c => (
                <span key={c} style={{color:"#a0a0a0",fontSize:"0.875rem"}}>{c}, AZ</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:32,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{fontFamily:"var(--font-mono)",fontSize:"0.75rem",color:"#a0a0a0"}}>2025 AMC Professionals LLC - All rights reserved</p>
          <div style={{fontFamily:"var(--font-mono)",fontSize:"0.75rem",color:"#a0a0a0",display:"flex",gap:24}}>
            <span>Licensed and Insured</span>
            <span>Phoenix, AZ</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
