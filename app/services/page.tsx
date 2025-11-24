'use client'

import Header from '@/components/Header'
import ServicesSection from '@/components/ServicesSection'
import { Search, Palette, Code } from 'lucide-react'

const serviceDetails = [
  {
    icon: Search,
    title: 'Research',
    description: 'Pesquisa profunda de usuários para entender comportamentos, necessidades e dores.',
    features: [
      'Pesquisa de usuários e personas',
      'Jornada do usuário (User Journey)',
      'Testes de usabilidade',
      'Análise de dados comportamentais',
      'Entrevistas e surveys',
      'Análise competitiva'
    ],
    color: 'bg-blue-500'
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Criação de interfaces otimizadas focadas em conversão e experiência do usuário.',
    features: [
      'Design de interfaces (UI)',
      'Sistemas de design',
      'Prototipação interativa',
      'Design responsivo',
      'Otimização de conversão',
      'Acessibilidade web'
    ],
    color: 'bg-purple-500'
  },
  {
    icon: Code,
    title: 'Technology',
    description: 'Otimização técnica e implementação de soluções escaláveis e performáticas.',
    features: [
      'Otimização de performance',
      'Core Web Vitals',
      'SEO técnico',
      'Implementação de design',
      'Análise de código',
      'Arquitetura frontend'
    ],
    color: 'bg-green-500'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções completas em UX/UI Design para impulsionar o sucesso do seu site
          </p>
        </div>

        <div className="space-y-12">
          {serviceDetails.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={service.title} className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-start gap-6">
                  <div className={`${service.color} w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="text-white" size={40} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

