import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { CacheCleaner } from '@/components/cache-cleaner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arte y Spa - Centro de Bienestar y Relajación',
  description: 'Centro de bienestar y spa de lujo. Disfruta de nuestros tratamientos de relajación, masajes, terapias y servicios de belleza en un ambiente tranquilo y profesional.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-optimized.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo-optimized.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logo-optimized.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <CacheCleaner />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
