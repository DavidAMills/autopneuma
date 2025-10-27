import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { BetaBanner } from '@/components/ui/beta-banner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Auto Pneuma - Christian AI Tech Community',
  description:
    'A Christian community building ethical, spirit-led AI technology. The Same Spirit, Many Gifts.',
  keywords: [
    'Christian AI',
    'AI Ethics',
    'Christian Technology',
    'Faith and Technology',
    'Biblical AI',
  ],
  authors: [{ name: 'Auto Pneuma' }],
  creator: 'Auto Pneuma',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autopneuma.com',
    title: 'Auto Pneuma - Christian AI Tech Community',
    description: 'Building ethical, spirit-led AI for Kingdom impact.',
    siteName: 'Auto Pneuma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Pneuma - Christian AI Tech Community',
    description: 'Building ethical, spirit-led AI for Kingdom impact.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <BetaBanner />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
