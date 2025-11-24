'use client'

import Link from 'next/link'
import { Menu, X, Lightbulb, LightbulbOff } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface NavItemProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
  color: string
  hoverColor: string
}

function NavItem({ href, children, isActive, color, hoverColor }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Mapear cores para efeito de brilho
  const getGlowColor = (hoverColor: string) => {
    const colorMap: Record<string, string> = {
      'text-blue-500': 'rgba(59, 130, 246, 0.4)',
      'text-purple-500': 'rgba(168, 85, 247, 0.4)',
      'text-green-500': 'rgba(34, 197, 94, 0.4)',
      'text-orange-500': 'rgba(249, 115, 22, 0.4)',
      'text-pink-500': 'rgba(236, 72, 153, 0.4)',
    }
    return colorMap[hoverColor] || 'rgba(59, 130, 246, 0.4)'
  }

  return (
    <Link
      href={href}
      className="relative flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center">
        {/* Efeito de brilho elétrico quando acesa */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.4]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className="absolute rounded-full blur-xl"
            style={{ 
              width: '50px', 
              height: '50px',
              backgroundColor: getGlowColor(hoverColor),
              boxShadow: `0 0 20px ${getGlowColor(hoverColor)}, 0 0 40px ${getGlowColor(hoverColor)}`
            }}
          />
        )}
        
        {/* Lâmpada */}
        <div className="relative z-10">
          {isHovered ? (
            <motion.div
              initial={{ scale: 0.7, opacity: 0.3 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Lightbulb 
                size={36} 
                className={`${hoverColor} transition-all duration-300`} 
                fill="currentColor"
                style={{ 
                  filter: `drop-shadow(0 0 10px ${getGlowColor(hoverColor)}) drop-shadow(0 0 20px ${getGlowColor(hoverColor)})`,
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
            </motion.div>
          ) : (
            <LightbulbOff 
              size={36} 
              className={`${color} transition-all duration-300 opacity-50`} 
            />
          )}
        </div>
      </div>
      <span>{children}</span>
    </Link>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative flex items-center">
            <span className="text-6xl font-bold text-primary-600">
              IDK
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <NavItem 
              href="/" 
              color="text-blue-400" 
              hoverColor="text-blue-500"
            >
              Início
            </NavItem>
            <NavItem 
              href="/services" 
              color="text-purple-400" 
              hoverColor="text-purple-500"
            >
              Serviços
            </NavItem>
            <NavItem 
              href="/consultation" 
              color="text-green-400" 
              hoverColor="text-green-500"
            >
              Consultoria Online
            </NavItem>
            <NavItem 
              href="/courses" 
              color="text-orange-400" 
              hoverColor="text-orange-500"
            >
              Video Aulas
            </NavItem>
            <NavItem 
              href="/dashboard" 
              color="text-pink-400" 
              hoverColor="text-pink-500"
            >
              Dashboard
            </NavItem>
            <Link
              href="/presentation"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Apresentação
            </Link>
            <Link
              href="/consultation"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Agendar Consultoria
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <NavItem 
              href="/" 
              color="text-blue-400" 
              hoverColor="text-blue-500"
            >
              Início
            </NavItem>
            <NavItem 
              href="/services" 
              color="text-purple-400" 
              hoverColor="text-purple-500"
            >
              Serviços
            </NavItem>
            <NavItem 
              href="/consultation" 
              color="text-green-400" 
              hoverColor="text-green-500"
            >
              Consultoria Online
            </NavItem>
            <NavItem 
              href="/courses" 
              color="text-orange-400" 
              hoverColor="text-orange-500"
            >
              Video Aulas
            </NavItem>
            <NavItem 
              href="/dashboard" 
              color="text-pink-400" 
              hoverColor="text-pink-500"
            >
              Dashboard
            </NavItem>
            <Link
              href="/consultation"
              className="block bg-primary-600 text-white px-6 py-2 rounded-lg text-center"
            >
              Agendar Consultoria
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
