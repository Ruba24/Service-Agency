import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import WhatsappButton from '@/components/WhatsApp'
import { IBM_Plex_Mono, Montserrat } from 'next/font/google'

const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: '700' })
const montserrat = Montserrat({ subsets: ['latin'], weight: '400' })


export const metadata = {
  title: 'Zelverse Agency',
  description: 'Next-gen digital agency for ecommerce and branding.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* existing head content */}
      </head>

      <body className="cursor-auto">
        <Navbar />
        <WhatsappButton />
        {/* <Footer /> */}
        {children}
      </body>
    </html>
  )
}
