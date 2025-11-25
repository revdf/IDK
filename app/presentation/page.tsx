'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'

interface Slide {
  id: number
  title: string
  content: React.ReactNode
  description?: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'IDK - Plataforma de Consultoria UX/UI',
    content: (
      <div className="text-center space-y-8">
        <h1 className="text-7xl font-bold text-primary-600 mb-4">IDK</h1>
        <p className="text-3xl text-gray-700 mb-6">
          Consultoria em Otimização de UI e Personalização de UX
        </p>
        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-bold mb-2">Otimização de UI</h3>
            <p className="text-gray-600">Interfaces modernas e intuitivas</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-2">✨</div>
            <h3 className="text-xl font-bold mb-2">Personalização de UX</h3>
            <p className="text-gray-600">Experiências únicas e relevantes</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="text-xl font-bold mb-2">Gestão Estratégica</h3>
            <p className="text-gray-600">Resultados mensuráveis</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Home Page - Primeira Impressão',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-primary-600 to-blue-800 text-white p-8 rounded-xl">
          <h2 className="text-4xl font-bold mb-4">Hero Section</h2>
          <p className="text-xl mb-6">Apresentação impactante com call-to-action</p>
          <div className="flex gap-4">
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold">
              Agendar Consultoria
            </button>
            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold border-2 border-white/20">
              Ver Video Aulas
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
            <div className="text-sm text-gray-600">Clientes</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">300%</div>
            <div className="text-sm text-gray-600">Conversão</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-1">50+</div>
            <div className="text-sm text-gray-600">Especialistas</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Satisfação</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Serviços - Research, Design & Technology',
    content: (
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200">
          <div className="bg-blue-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-white text-3xl">
            🔍
          </div>
          <h3 className="text-2xl font-bold mb-4">Research</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Pesquisa de usuários</li>
            <li>• Personas e jornadas</li>
            <li>• Testes de usabilidade</li>
            <li>• Análise comportamental</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-8 rounded-xl border-2 border-purple-200">
          <div className="bg-purple-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-white text-3xl">
            🎨
          </div>
          <h3 className="text-2xl font-bold mb-4">Design</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• UI Design</li>
            <li>• Design System</li>
            <li>• Prototipação</li>
            <li>• Acessibilidade</li>
          </ul>
        </div>
        <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200">
          <div className="bg-green-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-white text-3xl">
            ⚡
          </div>
          <h3 className="text-2xl font-bold mb-4">Technology</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Performance Web</li>
            <li>• Core Web Vitals</li>
            <li>• SEO Técnico</li>
            <li>• Implementação</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Consultoria Online - Marketplace',
    content: (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">8 Temas de Consultoria</h3>
          <div className="grid grid-cols-4 gap-4">
            {['🎨 Otimização de UI', '✨ Personalização UX', '📊 Gestão Estratégica', '🔍 UX Research', 
              '🧩 Design System', '⚡ Performance', '♿ Acessibilidade', '🚀 Product Design'].map((item, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">{item.split(' ')[0]}</div>
                <div className="text-sm font-semibold">{item.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-primary-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Sistema de Seleção</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-4xl">👩‍💼</div>
                <div>
                  <div className="font-bold">Ana Silva</div>
                  <div className="text-sm text-gray-600">Especialista em UX Research</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-500 text-sm">(127 avaliações)</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="text-2xl font-bold text-primary-600">R$ 250</div>
                  <div className="text-sm text-gray-500">por hora</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Video Aulas - Cursos Completos',
    content: (
      <div className="grid grid-cols-3 gap-6">
        {[
          { title: 'Fundamentos de UX Design', duration: '8h 30min', students: '1.247', price: 'R$ 299' },
          { title: 'UI Design Avançado', duration: '12h 15min', students: '892', price: 'R$ 399' },
          { title: 'Estratégia Digital', duration: '10h 20min', students: '1.563', price: 'R$ 449' },
        ].map((course, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-5xl">
              📚
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>⏱️ {course.duration}</span>
                <span>👥 {course.students} alunos</span>
              </div>
              <div className="text-2xl font-bold text-primary-600">{course.price}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 6,
    title: 'Dashboard de Análise',
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: 'Taxa de Conversão', value: '3.2%', change: '+12%', color: 'green' },
            { label: 'Abandono', value: '45%', change: '-8%', color: 'green' },
            { label: 'Ticket Médio', value: 'R$ 1.245', change: '+5%', color: 'green' },
            { label: 'Engajamento', value: '68%', change: '+15%', color: 'green' },
            { label: 'Tempo Checkout', value: '2.3 min', change: '-25%', color: 'green' },
          ].map((metric, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
              <div className={`text-sm font-semibold text-${metric.color}-600`}>{metric.change}</div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">Processo de 5 Etapas</h3>
          <div className="flex justify-between">
            {['🔍 Pesquisa', '📊 Análise', '🎨 Design', '🧪 Testes', '📄 Relatório'].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-2">{step.split(' ')[0]}</div>
                <div className="font-semibold">{step.split(' ')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Efeitos Visuais Especiais',
    content: (
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Rastro de Raio Elétrico</h3>
          <p className="text-gray-700 mb-4">
            Efeito interativo que segue o movimento do mouse, criando um rastro de raio elétrico
            em tempo real. Visível em todas as páginas.
          </p>
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full animate-pulse"></div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Lâmpadas Interativas no Menu</h3>
          <div className="flex gap-6 justify-center">
            {['💡 Azul', '💡 Roxo', '💡 Verde', '💡 Laranja', '💡 Rosa'].map((bulb, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-2">{bulb.split(' ')[0]}</div>
                <div className="font-semibold">{bulb.split(' ')[1]}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-4">
            Cada item do menu tem uma lâmpada que acende com brilho elétrico ao passar o mouse
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Impacto Social e Sustentabilidade',
    content: (
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200">
          <div className="text-5xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold mb-4">Sustentabilidade Ambiental</h3>
          <p className="text-gray-700 leading-relaxed">
            Interfaces mais claras reduzem erros de compra, diminuindo a taxa de devolução.
            Isso resulta em menos logística, transporte e embalagens, reduzindo significativamente
            a pegada de carbono.
          </p>
        </div>
        <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200">
          <div className="text-5xl mb-4">♿</div>
          <h3 className="text-2xl font-bold mb-4">Inclusão Digital</h3>
          <p className="text-gray-700 leading-relaxed">
            Otimizar a interface para ser mais intuitiva e limpa também significa torná-la
            mais acessível e fácil de usar para públicos com menor familiaridade digital
            ou com algum tipo de deficiência, promovendo a Inclusão Digital.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Tecnologias Utilizadas',
    content: (
      <div className="grid grid-cols-3 gap-6">
        {[
          { name: 'Next.js 14', desc: 'Framework React', icon: '⚛️' },
          { name: 'TypeScript', desc: 'Tipagem estática', icon: '📘' },
          { name: 'Tailwind CSS', desc: 'Estilização', icon: '🎨' },
          { name: 'Framer Motion', desc: 'Animações', icon: '✨' },
          { name: 'Recharts', desc: 'Gráficos', icon: '📊' },
          { name: 'Lucide React', desc: 'Ícones', icon: '🔷' },
        ].map((tech, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">{tech.icon}</div>
            <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
            <p className="text-gray-600">{tech.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 10,
    title: 'Obrigado!',
    content: (
      <div className="text-center space-y-8">
        <h1 className="text-7xl font-bold text-primary-600 mb-4">IDK</h1>
        <p className="text-4xl text-gray-700 mb-8">
          Consultoria em UX/UI que Impulsiona Resultados
        </p>
        <div className="bg-primary-600 text-white p-8 rounded-xl inline-block">
          <p className="text-2xl mb-4">Pronto para transformar seu site?</p>
          <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-xl">
            Começar Agora
          </button>
        </div>
        <p className="text-gray-500 text-lg mt-8">
          www.idk.com.br
        </p>
      </div>
    ),
  },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      } else if (e.key === 'Escape') {
        window.location.href = '/'
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute top-4 right-4 z-50">
        <Link
          href="/"
          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
        >
          <X size={24} />
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-4xl font-bold text-white">
                    {slides[currentSlide].title}
                  </h2>
                  <div className="text-gray-300">
                    {currentSlide + 1} / {slides.length}
                  </div>
                </div>
                {slides[currentSlide].description && (
                  <p className="text-gray-300 text-lg">
                    {slides[currentSlide].description}
                  </p>
                )}
              </div>

              <div className="bg-white rounded-xl p-8 text-gray-900 min-h-[500px]">
                {slides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSlide}
              className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-white w-8'
                      : 'bg-white/30 w-3 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={nextSlide}
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>

          {/* Instruções */}
          <div className="text-center mt-6 text-gray-400 text-sm">
            Use as setas do teclado ou os botões para navegar • Espaço para próximo slide • ESC para sair
          </div>
        </div>
      </div>
    </div>
  )
}

