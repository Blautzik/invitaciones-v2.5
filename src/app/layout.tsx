import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import './globals.css'
import { ThemeProvider } from '@/components/themeProvider/ThemeProvider';




export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
          {children}
      </body>
    </html>
  )
}
