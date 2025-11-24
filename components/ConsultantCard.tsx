'use client'

import { Consultant } from '@/types'
import { Star, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ConsultantCardProps {
  consultant: Consultant
  themeId: number
}

export default function ConsultantCard({ consultant, themeId }: ConsultantCardProps) {
  const availabilityColors = {
    available: 'bg-green-100 text-green-700',
    busy: 'bg-yellow-100 text-yellow-700',
    offline: 'bg-gray-100 text-gray-700'
  }

  const availabilityLabels = {
    available: 'Disponível',
    busy: 'Ocupado',
    offline: 'Offline'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{consultant.avatar}</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-gray-900">
                {consultant.name}
              </h3>
              {consultant.verified && (
                <CheckCircle size={18} className="text-primary-600" />
              )}
            </div>
            <p className="text-sm text-gray-600">{consultant.title}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {consultant.bio}
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{consultant.rating}</span>
          <span className="text-gray-500 text-sm">
            ({consultant.reviews})
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Clock size={16} />
          <span>{consultant.experience} anos</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {consultant.specialties.slice(0, 2).map((specialty) => (
          <span
            key={specialty}
            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded"
          >
            {specialty}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-primary-600">
            R$ {consultant.pricePerHour}
          </div>
          <div className="text-xs text-gray-500">por hora</div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            availabilityColors[consultant.availability]
          }`}
        >
          {availabilityLabels[consultant.availability]}
        </div>
      </div>

      <Link
        href={`/consultation/theme/${themeId}/consultant/${consultant.id}`}
        className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        Agendar Consultoria
      </Link>
    </motion.div>
  )
}

