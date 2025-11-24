'use client'

import { TrendingUp, Users, Award, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Clientes Atendidos',
    color: 'text-blue-600'
  },
  {
    icon: TrendingUp,
    value: '300%',
    label: 'Aumento Médio de Conversão',
    color: 'text-green-600'
  },
  {
    icon: Award,
    value: '50+',
    label: 'Especialistas Certificados',
    color: 'text-yellow-600'
  },
  {
    icon: CheckCircle,
    value: '98%',
    label: 'Satisfação dos Clientes',
    color: 'text-purple-600'
  }
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-4 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                  <Icon size={32} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

