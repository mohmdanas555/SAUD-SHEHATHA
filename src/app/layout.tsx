import type { Metadata } from 'next'
import '../index.css'
import SmoothScroll from '../components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Saud Shehatha Construction',
  description: 'A legacy construction firm defined by structural precision.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-brand-dark overflow-x-hidden text-brand-light font-sans antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
