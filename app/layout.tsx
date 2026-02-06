import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' })

export const metadata: Metadata = {
  title: 'Will You Be My Valentine? 💕',
  description: 'A special Valentine\'s Day proposal',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancing.variable} font-sans antialiased`}>
        {children}
        <footer className="text-center text-sm text-gray-500 py-4 mt-8">
          Developed by Bryne Borinaga
        </footer>
      </body>
    </html>
  )
}
