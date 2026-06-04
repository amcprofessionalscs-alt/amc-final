import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Step OS | Dashboard',
  description: 'Your business operating system. AI-powered execution.',
}

export default function OsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(ellipse at 70% 10%, rgba(251,191,36,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 10% 90%, rgba(6,182,212,0.05) 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)
        `,
      }}
    >
      {children}
    </div>
  )
}
