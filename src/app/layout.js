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
      <body className="cursor-auto"> 
        <Navbar />
        <WhatsappButton />
        {/* <Footer /> */}
        {children}
      </body>
    </html>
  )
}
