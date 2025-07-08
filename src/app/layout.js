import '@/styles/globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Zelverse Agency',
  description: 'Next-gen digital agency for ecommerce and branding.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
