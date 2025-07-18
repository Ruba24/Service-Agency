import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/CustomerCursor'
import WhatsappButton from '@/components/WhatsApp'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Zelverse Agency',
  description: 'Next-gen digital agency for ecommerce and branding.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cursor-none"> 
        <Navbar />
        <CustomCursor />
        <WhatsappButton />
        {/* <Footer /> */}
        {children}
      </body>
    </html>
  )
}
