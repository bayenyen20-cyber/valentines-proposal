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
      </body>
    </html>
  )
}
