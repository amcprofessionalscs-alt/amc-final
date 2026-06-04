import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next Step OS — The Operating System for the Relentless',
  description: 'The Next Step OS by Demonte Williams (@Monte_Motivated) is a complete business execution framework powered by AI and the Law of 100. Built for entrepreneurs who refuse to improvise.',
  keywords: ['Next Step OS', 'Monte OS', 'business operating system', 'entrepreneur', 'AI strategy', 'Demonte Williams'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
