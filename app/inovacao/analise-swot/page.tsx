'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type SwotCategory = 'forcas' | 'fraquezas' | 'oportunidades' | 'ameacas'

const baseItems: Record<SwotCategory, string[]> = {
  forcas: [
    'experiencia hiper personalizada baseada em dados proprios',
    'biblioteca de insights pronta para acelerar criacao de testes',
  ],
  fraquezas: ['dependencia de conteudo atualizado para manter relevancia', 'necessidade de evangelizacao para novos clientes'],
  oportunidades: ['crescimento de squads de ux focados em eficiencia', 'demanda crescente por previsao de impacto antes do desenvolvimento'],
  ameacas: ['mudancas rapidas nas expectativas de acessibilidade', 'concorrentes adicionando camadas de ia generativa'],
}

export default function AnaliseSwotPage() {
  const [swot, setSwot] = useState(baseItems)
  const [draft, setDraft] = useState({ category: 'forcas' as SwotCategory, text: '' })

  const addInsight = () => {
    if (!draft.text.trim()) return
    setSwot((prev) => ({
      ...prev,
      [draft.category]: [...prev[draft.category], draft.text.trim()],
    }))
    setDraft((prev) => ({ ...prev, text: '' }))
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-primary-500 font-semibold uppercase tracking-wide mb-2">analise swot</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            leia rapidamente onde o idk ganha, perde e pode inovar
          </h1>
          <p className="text-slate-600 text-lg">
            mapeamos forcas, fraquezas, oportunidades e ameacas para apoiar as decisoes que surgem na jornada de inovacao.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {(Object.keys(swot) as SwotCategory[]).map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4"
            >
              <p className="text-sm uppercase font-semibold tracking-wide text-slate-500">{category}</p>
              <ul className="space-y-2">
                {swot[category].map((item, index) => (
                  <li key={`${category}-${index}`} className="bg-slate-50 rounded-2xl px-4 py-3 text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <p className="text-sm uppercase font-semibold tracking-wide text-slate-500">adicionar insight rapido</p>
          <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <select
              value={draft.category}
              onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value as SwotCategory }))}
              className="rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 capitalize"
            >
              <option value="forcas">forcas</option>
              <option value="fraquezas">fraquezas</option>
              <option value="oportunidades">oportunidades</option>
              <option value="ameacas">ameacas</option>
            </select>

            <div className="flex gap-3">
              <input
                value={draft.text}
                onChange={(event) => setDraft((prev) => ({ ...prev, text: event.target.value }))}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="descreva rapidamente o insight"
              />
              <button
                type="button"
                onClick={addInsight}
                className="px-6 py-3 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
              >
                adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

