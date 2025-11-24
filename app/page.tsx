'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Award, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import ServicesSection from '@/components/ServicesSection'
import ConsultationMarketplace from '@/components/ConsultationMarketplace'
import VideoCoursesSection from '@/components/VideoCoursesSection'
import StatsSection from '@/components/StatsSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Consultoria em UX/UI que
              <span className="block text-primary-200">Impulsiona Resultados</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Otimização de UI e Personalização de UX para transformar a experiência 
              do seu site e aumentar conversões
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Agendar Consultoria
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-400 transition-colors border-2 border-white/20"
              >
                Ver Video Aulas
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Consultation Marketplace Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Consultoria Online
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha entre nossos especialistas e agende uma consultoria personalizada 
              para sua necessidade
            </p>
          </div>
          <ConsultationMarketplace limit={6} />
          <div className="text-center mt-8">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              Ver todos os temas e consultores
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Courses Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Video Aulas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Aprenda com os melhores profissionais através de cursos completos e práticos
            </p>
          </div>
          <VideoCoursesSection limit={6} />
          <div className="text-center mt-8">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              Ver todos os cursos
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para transformar seu site?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para ajudar você a alcançar 
            resultados excepcionais
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Começar Agora
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
