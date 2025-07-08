import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/CustomerCursor'

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
        {children}
      </body>
    </html>
  )
}
