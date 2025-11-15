import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Timeline – Alternating',
  description: 'Wongsakorn Rodngampring - Lead Full Stack & Mobile Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" data-palette="eoy-copper">
      <body>{children}</body>
    </html>
  )
}

