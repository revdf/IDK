'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

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
  const searchParams = useSearchParams()
  const urlParam = searchParams.get('url')
  const [swot, setSwot] = useState(baseItems)
  const [draft, setDraft] = useState({ category: 'forcas' as SwotCategory, text: '' })
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (urlParam) {
      analyzeSite(urlParam)
    }
  }, [urlParam])

  const analyzeSite = async (url: string) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch(`/api/analyze-site?url=${encodeURIComponent(url)}`)
      const data = await response.json()

      if (data.error) {
        console.error('Analysis error:', data.error)
        setIsAnalyzing(false)
        return
      }

      // Gerar análise SWOT baseada nos dados
      const newSwot: Record<SwotCategory, string[]> = {
        forcas: [
          ...baseItems.forcas,
          data.hasH1 && data.h1Count === 1 ? 'titulo principal (H1) claro e unico' : '',
          data.hasNavigation ? 'navegacao semantica presente' : '',
          data.hasViewport ? 'configurado para dispositivos moveis' : '',
          data.scores?.accessibility > 70 ? `acessibilidade acima da media (${data.scores.accessibility}%)` : '',
          data.imagesWithAlt > 0 && data.imageCount > 0 && (data.imagesWithAlt / data.imageCount) > 0.8 ? 'imagens com alt text adequado' : '',
        ].filter(Boolean),
        fraquezas: [
          ...baseItems.fraquezas,
          !data.hasH1 ? 'falta titulo principal (H1)' : data.h1Count > 1 ? 'multiplos H1 detectados' : '',
          !data.hasMetaDescription ? 'falta meta description para SEO' : '',
          data.imageCount > 0 && (data.imagesWithAlt / data.imageCount) < 0.5 ? 'muitas imagens sem alt text' : '',
          data.formCount > 0 && data.labelCount < data.inputCount ? 'formularios sem labels adequados' : '',
          data.scores?.performance < 60 ? 'desempenho abaixo do ideal' : '',
          !data.hasLang ? 'falta atributo lang no HTML' : '',
        ].filter(Boolean),
        oportunidades: [
          ...baseItems.oportunidades,
          data.buttonCount > 0 ? `otimizar ${data.buttonCount} botoes para melhor conversao` : '',
          data.linkCount > 0 ? `melhorar navegacao com ${data.linkCount} links` : '',
          data.formCount > 0 ? `otimizar ${data.formCount} formularios para reduzir friccao` : '',
          data.scores?.accessibility < 80 ? 'melhorar acessibilidade para alcancar WCAG AA' : '',
        ].filter(Boolean),
        ameacas: [
          ...baseItems.ameacas,
          data.scriptCount > 20 ? 'muitos scripts podem impactar performance' : '',
          data.htmlLength > 1000000 ? 'HTML muito grande pode afetar velocidade' : '',
          data.scores?.usability < 60 ? 'usabilidade abaixo do esperado pelos usuarios' : '',
        ].filter(Boolean),
      }

      setSwot(newSwot)
      setIsAnalyzing(false)
    } catch (error) {
      console.error('Failed to analyze site:', error)
      setIsAnalyzing(false)
    }
  }

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
          {isAnalyzing && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
              <Loader2 size={20} className="animate-spin text-blue-600" />
              <span className="text-blue-700 font-medium">analisando site e gerando swot automaticamente...</span>
            </div>
          )}
          {urlParam && !isAnalyzing && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <span className="text-green-700 font-medium">analise swot concluida para: {urlParam}</span>
            </div>
          )}
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

