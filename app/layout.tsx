import type { Metadata } from 'next'
import Script from 'next/script'
import { Poppins } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'
import { EnquiryProvider } from '@/contexts/EnquiryContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'

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
        {/* Facebook Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1557368628626482');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1557368628626482&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <AuthProvider>
          <CartProvider>
            <EnquiryProvider>
              {children}
              <WhatsAppButton />
            </EnquiryProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

