'use client'

import Link from 'next/link'
import { Search, Palette, Code, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Search,
    title: 'Research',
    description: 'Pesquisa profunda de usuários, personas, jornadas e testes de usabilidade para entender seu público.',
    href: '/services/research',
    color: 'bg-blue-500'
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Criação de interfaces otimizadas, sistemas de design e prototipação focada em conversão.',
    href: '/services/design',
    color: 'bg-purple-500'
  },
  {
    icon: Code,
    title: 'Technology',
    description: 'Otimização técnica, performance web e implementação de soluções escaláveis.',
    href: '/services/technology',
    color: 'bg-green-500'
  }
]

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluções completas em UX/UI Design para impulsionar o sucesso do seu site
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow"
              >
                <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                >
                  Saiba mais
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

