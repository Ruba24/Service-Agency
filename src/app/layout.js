import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import WhatsappButton from '@/components/WhatsApp'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Zelverse Agency',
  description: 'Next-gen digital agency for ecommerce and branding.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  <meta name="robots" content="index, follow" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
