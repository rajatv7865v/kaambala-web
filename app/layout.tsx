import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'
import { EnquiryProvider } from '@/contexts/EnquiryContext'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Kaambala - Home Services at Your Doorstep',
  description: 'Professional home services including salon, carpenter, electrician, plumber, cleaning, painting, and AC services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppins.className}`}>
      <body className="antialiased">
        <EnquiryProvider>
          {children}
          <WhatsAppButton />
        </EnquiryProvider>
      </body>
    </html>
  )
}

