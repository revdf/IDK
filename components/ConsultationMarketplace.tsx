'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ConsultationTheme } from '@/types'
import { consultationThemes } from '@/data/themes'
import { Star, Users, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import ConsultantCard from './ConsultantCard'

interface ConsultationMarketplaceProps {
  limit?: number
}

export default function ConsultationMarketplace({ limit }: ConsultationMarketplaceProps) {
  const [selectedTheme, setSelectedTheme] = useState<ConsultationTheme | null>(null)
  const themes = limit ? consultationThemes.slice(0, limit) : consultationThemes

  return (
    <div className="space-y-8">
      {!selectedTheme ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTheme(theme)}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary-200"
            >
              <div className="text-5xl mb-4">{theme.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {theme.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {theme.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {theme.consultants.length} consultores
                </span>
                <span className="text-primary-600 font-semibold">
                  R$ {theme.priceRange.min} - R$ {theme.priceRange.max}/h
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTheme(null)}
            className="mb-6 text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← Voltar aos temas
          </button>
          
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{selectedTheme.icon}</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedTheme.name}
                </h2>
                <p className="text-gray-600">{selectedTheme.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedTheme.consultants.map((consultant) => (
              <ConsultantCard
                key={consultant.id}
                consultant={consultant}
                themeId={selectedTheme.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

