'use client'

import { Search, BarChart3, Palette, TestTube, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: Search,
    title: 'Pesquisa',
    description: 'Análise profunda do comportamento do usuário, identificando pontos de atrito e oportunidades de melhoria.',
    color: 'bg-blue-500'
  },
  {
    icon: BarChart3,
    title: 'Análise',
    description: 'Processamento de dados coletados para identificar padrões e métricas-chave de performance.',
    color: 'bg-green-500'
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Criação de interfaces otimizadas baseadas em dados, focadas em reduzir atrito e melhorar conversão.',
    color: 'bg-purple-500'
  },
  {
    icon: TestTube,
    title: 'Testes',
    description: 'Validação das soluções através de testes A/B e feedback dos usuários para garantir eficácia.',
    color: 'bg-orange-500'
  },
  {
    icon: FileText,
    title: 'Relatório',
    description: 'Documentação completa dos resultados, métricas e recomendações para otimização contínua.',
    color: 'bg-red-500'
  }
]

export default function ProcessSteps() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Processo de 5 Etapas
      </h2>
      <p className="text-gray-600 mb-8">
        Framework robusto para garantir soluções baseadas em dados e validáveis
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`${step.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

