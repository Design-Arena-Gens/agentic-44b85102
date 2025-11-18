import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Midjourney - AI Image Generation',
  description: 'Create stunning AI-generated artwork',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white">{children}</body>
    </html>
  )
}
