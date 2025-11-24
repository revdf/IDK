import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LightningTrail from '@/components/LightningTrail'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IDK - E-commerce UX Design de Experiência',
  description: 'Otimização de UI e Personalização de UX para E-commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <LightningTrail />
        {children}
      </body>
    </html>
  )
}

