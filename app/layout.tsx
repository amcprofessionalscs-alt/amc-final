import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AMC Professionals LLC | Commercial Cleaning Phoenix Metro',
  description: 'Phoenix trusted commercial cleaning company. Post-construction cleaning, janitorial services, and facility maintenance across the Phoenix metro area.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
