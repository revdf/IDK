'use client'

import { FormEvent, useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

type ChangeType =
  | 'cta'
  | 'texto'
  | 'paleta'
  | 'layout'
  | 'hierarquia'
  | 'responsivo'
  | 'consistencia'
  | 'imagens'
  | 'performance'
  | 'navegacao'
  | 'acessibilidade'
  | 'conteudo'

type Prediction = {
  conversion: number
  usability: number
  accessibility: number
  perceivedSpeed: number
  valueProposition: number
  navigation: number
  contentQuality: number
  visualHierarchy: number
  responsiveScore: number
  consistencyScore: number
  performanceScore: number
  commentary: string
}

const changeCopy: Record<ChangeType, string> = {
  cta: 'reposicionamento do botao principal',
  texto: 'ajuste de microcopy e voz de marca',
  paleta: 'alteracao de cores e contraste',
  layout: 'reorganizacao de blocos na tela',
  hierarquia: 'melhoria da hierarquia visual',
  responsivo: 'otimizacao para mobile e tablet',
  consistencia: 'padronizacao de cores, fontes e elementos',
  imagens: 'otimizacao de imagens e icones',
  performance: 'melhoria de velocidade e core web vitals',
  navegacao: 'simplificacao da arquitetura de informacao',
  acessibilidade: 'melhorias em contraste, alt text e navegacao por teclado',
  conteudo: 'ajuste de hierarquia de titulos e escaneabilidade',
}

function projectImpact(change: ChangeType, confidence: number, accessibilityMode: boolean): Prediction {
  const base = {
    conversion: 60,
    usability: 58,
    accessibility: 62,
    perceivedSpeed: 55,
    valueProposition: 65,
    navigation: 60,
    contentQuality: 58,
    visualHierarchy: 55,
    responsiveScore: 62,
    consistencyScore: 60,
    performanceScore: 58,
  }

  const multipliers: Record<
    ChangeType,
    {
      conversion: number
      usability: number
      accessibility: number
      perceivedSpeed: number
      valueProposition: number
      navigation: number
      contentQuality: number
      visualHierarchy: number
      responsiveScore: number
      consistencyScore: number
      performanceScore: number
    }
  > = {
    cta: { conversion: 18, usability: 10, accessibility: 4, perceivedSpeed: 6, valueProposition: 8, navigation: 5, contentQuality: 3, visualHierarchy: 12, responsiveScore: 2, consistencyScore: 3, performanceScore: 2 },
    texto: { conversion: 12, usability: 9, accessibility: 8, perceivedSpeed: 4, valueProposition: 15, navigation: 3, contentQuality: 18, visualHierarchy: 5, responsiveScore: 2, consistencyScore: 4, performanceScore: 1 },
    paleta: { conversion: 9, usability: 7, accessibility: 14, perceivedSpeed: 3, valueProposition: 5, navigation: 2, contentQuality: 3, visualHierarchy: 10, responsiveScore: 2, consistencyScore: 8, performanceScore: 1 },
    layout: { conversion: 15, usability: 18, accessibility: 6, perceivedSpeed: 12, valueProposition: 8, navigation: 12, contentQuality: 5, visualHierarchy: 15, responsiveScore: 8, consistencyScore: 6, performanceScore: 3 },
    hierarquia: { conversion: 10, usability: 12, accessibility: 5, perceivedSpeed: 8, valueProposition: 12, navigation: 4, contentQuality: 8, visualHierarchy: 20, responsiveScore: 3, consistencyScore: 5, performanceScore: 2 },
    responsivo: { conversion: 12, usability: 15, accessibility: 8, perceivedSpeed: 10, valueProposition: 5, navigation: 8, contentQuality: 4, visualHierarchy: 6, responsiveScore: 18, consistencyScore: 4, performanceScore: 5 },
    consistencia: { conversion: 8, usability: 14, accessibility: 6, perceivedSpeed: 6, valueProposition: 6, navigation: 5, contentQuality: 4, visualHierarchy: 8, responsiveScore: 3, consistencyScore: 20, performanceScore: 2 },
    imagens: { conversion: 6, usability: 5, accessibility: 10, perceivedSpeed: 8, valueProposition: 8, navigation: 2, contentQuality: 6, visualHierarchy: 8, responsiveScore: 5, consistencyScore: 4, performanceScore: 12 },
    performance: { conversion: 10, usability: 12, accessibility: 3, perceivedSpeed: 18, valueProposition: 4, navigation: 3, contentQuality: 2, visualHierarchy: 3, responsiveScore: 8, consistencyScore: 2, performanceScore: 20 },
    navegacao: { conversion: 14, usability: 16, accessibility: 10, perceivedSpeed: 8, valueProposition: 10, navigation: 22, contentQuality: 5, visualHierarchy: 6, responsiveScore: 5, consistencyScore: 6, performanceScore: 3 },
    acessibilidade: { conversion: 8, usability: 10, accessibility: 20, perceivedSpeed: 5, valueProposition: 4, navigation: 6, contentQuality: 4, visualHierarchy: 5, responsiveScore: 4, consistencyScore: 5, performanceScore: 2 },
    conteudo: { conversion: 11, usability: 10, accessibility: 7, perceivedSpeed: 4, valueProposition: 14, navigation: 5, contentQuality: 18, visualHierarchy: 8, responsiveScore: 2, consistencyScore: 4, performanceScore: 1 },
  }

  const gain = multipliers[change]
  const convertConfidence = confidence / 10

  const result = {
    conversion: Math.min(100, Math.round(base.conversion + gain.conversion * convertConfidence)),
    usability: Math.min(100, Math.round(base.usability + gain.usability * convertConfidence)),
    accessibility: Math.min(
      100,
      Math.round(base.accessibility + gain.accessibility * convertConfidence + (accessibilityMode ? 8 : 0)),
    ),
    perceivedSpeed: Math.min(100, Math.round(base.perceivedSpeed + gain.perceivedSpeed * convertConfidence)),
    valueProposition: Math.min(100, Math.round(base.valueProposition + gain.valueProposition * convertConfidence)),
    navigation: Math.min(100, Math.round(base.navigation + gain.navigation * convertConfidence)),
    contentQuality: Math.min(100, Math.round(base.contentQuality + gain.contentQuality * convertConfidence)),
    visualHierarchy: Math.min(100, Math.round(base.visualHierarchy + gain.visualHierarchy * convertConfidence)),
    responsiveScore: Math.min(100, Math.round(base.responsiveScore + gain.responsiveScore * convertConfidence)),
    consistencyScore: Math.min(100, Math.round(base.consistencyScore + gain.consistencyScore * convertConfidence)),
    performanceScore: Math.min(100, Math.round(base.performanceScore + gain.performanceScore * convertConfidence)),
  }

  const commentaryMap: Record<ChangeType, string> = {
    layout: 'organizar o grid reduz deslocamento ocular e acelera a percepcao de velocidade',
    paleta: 'cores com contraste previsivel destravam acessibilidade e deixam a toma de decisao mais confiante',
    cta: 'cta em posicao estrategica corta rastros e diminui o atrito entre etapas',
    texto: 'microcopy claro responde objecoes e guia a pessoa para a proxima acao',
    hierarquia: 'elementos importantes destacados visualmente direcionam o olhar e melhoram a compreensao rapida',
    responsivo: 'adaptacao fluida para mobile e tablet aumenta alcance e reduz abandono em dispositivos moveis',
    consistencia: 'sistema de design padronizado reduz carga cognitiva e aumenta confianca do usuario',
    imagens: 'imagens otimizadas e relevantes melhoram acessibilidade, desempenho e comunicacao visual',
    performance: 'velocidade de carregamento impacta diretamente conversao e experiencia percebida',
    navegacao: 'arquitetura de informacao clara reduz cliques extras e facilita encontrar o que se busca',
    acessibilidade: 'melhorias em contraste, alt text e navegacao por teclado ampliam o publico e melhoram para todos',
    conteudo: 'hierarquia de titulos e conteudo escaneavel melhora compreensao e retencao de informacao',
  }

  return { ...result, commentary: commentaryMap[change] }
}

export default function UxBoostSimulatorPage() {
  const searchParams = useSearchParams()
  const urlParam = searchParams.get('url')
  const [changeType, setChangeType] = useState<ChangeType>('cta')
  const [confidence, setConfidence] = useState(6)
  const [accessibilityMode, setAccessibilityMode] = useState(true)
  const [description, setDescription] = useState('mover o cta principal para o topo do hero mobile')
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [siteAnalysis, setSiteAnalysis] = useState<any>(null)

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

      setSiteAnalysis(data)
      
      // Gerar previsão automática baseada na análise
      const autoPrediction = projectImpact('layout', 7, true)
      setPrediction({
        ...autoPrediction,
        commentary: `analise automatica do site ${data.title || url} concluida. o site possui ${data.buttonCount} botoes, ${data.formCount} formularios e ${data.linkCount} links. ${autoPrediction.commentary}`,
      })
      
      setIsAnalyzing(false)
    } catch (error) {
      console.error('Failed to analyze site:', error)
      setIsAnalyzing(false)
    }
  }

  const preview = useMemo(() => projectImpact(changeType, confidence, accessibilityMode), [changeType, confidence, accessibilityMode])

  const handleSimulate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPrediction({
      ...preview,
      commentary: `${preview.commentary}. com a mudanca proposta (${description || changeCopy[changeType]}), esperamos impacto direto em conversao e clareza.`,
    })
  }

  const result = prediction ?? preview

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl">
          {isAnalyzing && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
              <Loader2 size={20} className="animate-spin text-blue-600" />
              <span className="text-blue-700 font-medium">analisando site e gerando previsao automaticamente...</span>
            </div>
          )}
          {urlParam && !isAnalyzing && siteAnalysis && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <span className="text-green-700 font-medium">analise concluida para: {urlParam}</span>
            </div>
          )}
          <div className="flex items-center gap-3 mb-2">
            <p className="text-primary-500 font-semibold tracking-wide uppercase">
              ux boost simulator
            </p>
            <button
              onClick={() => setShowInfoModal(true)}
              className="p-1.5 rounded-full hover:bg-primary-50 text-primary-500 hover:text-primary-600 transition"
              aria-label="o que e ux boost simulator"
            >
              <Info size={18} />
            </button>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            teste ajustes completos de ux/ui antes de mexer em linha de codigo
          </h1>
          <p className="text-slate-600 text-lg mb-6">
            e uma abordagem que prioriza a simulacao e a analise profunda antes de qualquer codificacao.
          </p>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">aspectos projetados</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-400 bg-slate-100">
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">aspecto projetado</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">o que a simulacao avalia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-100/70 hover:bg-blue-100 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">conversao</td>
                    <td className="py-4 px-4 text-slate-700">se a mudanca aumentara ou diminuira a taxa de sucesso dos usuarios em completar uma acao (ex: compra, cadastro, download).</td>
                  </tr>
                  <tr className="bg-rose-100/70 hover:bg-rose-100 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">usabilidade</td>
                    <td className="py-4 px-4 text-slate-700">a facilidade e eficiencia com que os usuarios poderao interagir com a nova interface.</td>
                  </tr>
                  <tr className="bg-emerald-100/70 hover:bg-emerald-100 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">acessibilidade</td>
                    <td className="py-4 px-4 text-slate-700">se a alteracao mantem ou melhora a conformidade com as diretrizes de acessibilidade (WCAG).</td>
                  </tr>
                  <tr className="bg-purple-100/70 hover:bg-purple-100 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">velocidade e desempenho</td>
                    <td className="py-4 px-4 text-slate-700">o impacto da mudanca no tempo de carregamento da pagina ou na estabilidade geral do sistema.</td>
                  </tr>
                  <tr className="bg-amber-100/70 hover:bg-amber-100 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">proposicao de valor</td>
                    <td className="py-4 px-4 text-slate-700">se a alteracao reforca a percepcao do usuario sobre o valor que o produto oferece.</td>
                  </tr>
                  <tr className="bg-cyan-100/70 hover:bg-cyan-100 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">navegacao e consistencia</td>
                    <td className="py-4 px-4 text-slate-700">se a nova mudanca se integra de forma logica ao restante do fluxo de navegacao e mantem o padrao visual.</td>
                  </tr>
                  <tr className="bg-indigo-100/70 hover:bg-indigo-100 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">conteudo e hierarquia visual</td>
                    <td className="py-4 px-4 text-slate-700">se o novo conteudo e claro e se os elementos mais importantes (Call to Actions, titulos) estao dispostos de forma ideal na tela.</td>
                  </tr>
                  <tr className="bg-teal-100/70 hover:bg-teal-100 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">responsividade</td>
                    <td className="py-4 px-4 text-slate-700">como a mudanca se comporta em diferentes tamanhos de tela e dispositivos.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleSimulate} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">tipo de mudanca</p>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(changeCopy) as ChangeType[]).map((key) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setChangeType(key)}
                    className={`rounded-2xl border px-4 py-3 text-left transition text-sm ${
                      changeType === key
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:border-primary-200'
                    }`}
                  >
                    <p className="font-semibold capitalize mb-1">{key}</p>
                    <p className="text-xs text-slate-500">{changeCopy[key]}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-semibold text-slate-600 mb-2">
                intensidade da mudanca
                <span className="text-primary-500">{confidence}/10</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={confidence}
                onChange={(event) => setConfidence(Number(event.target.value))}
                className="w-full accent-primary-500"
              />
            </div>

            <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <input
                type="checkbox"
                checked={accessibilityMode}
                onChange={(event) => setAccessibilityMode(event.target.checked)}
                className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              priorizar contraste e legibilidade
            </label>

            <div>
              <p className="text-sm font-semibold text-slate-600 mb-2">descreva sua ideia</p>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full min-h-[120px] rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="conte o que deseja testar"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
            >
              gerar previsao completa
            </button>
          </form>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <p className="text-sm uppercase font-semibold text-slate-500">previsao completa</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">impacto estimado em todas as dimensoes</h2>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: 'conversao', value: result.conversion, tone: 'text-emerald-500', category: 'core' },
                  { label: 'usabilidade', value: result.usability, tone: 'text-sky-500', category: 'core' },
                  { label: 'acessibilidade', value: result.accessibility, tone: 'text-amber-500', category: 'core' },
                  { label: 'velocidade percebida', value: result.perceivedSpeed, tone: 'text-violet-500', category: 'core' },
                  { label: 'proposicao de valor', value: result.valueProposition, tone: 'text-blue-500', category: 'ux' },
                  { label: 'navegacao', value: result.navigation, tone: 'text-indigo-500', category: 'ux' },
                  { label: 'qualidade do conteudo', value: result.contentQuality, tone: 'text-purple-500', category: 'ux' },
                  { label: 'hierarquia visual', value: result.visualHierarchy, tone: 'text-pink-500', category: 'ui' },
                  { label: 'responsividade', value: result.responsiveScore, tone: 'text-cyan-500', category: 'ui' },
                  { label: 'consistencia', value: result.consistencyScore, tone: 'text-teal-500', category: 'ui' },
                  { label: 'desempenho', value: result.performanceScore, tone: 'text-orange-500', category: 'ui' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-slate-100 p-4 bg-slate-50"
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className={`text-3xl font-bold ${item.tone}`}>{item.value}%</p>
                    <p className="text-xs text-slate-400 mt-1">{item.category}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showInfoModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfoModal(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative"
              >
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition text-slate-500 hover:text-slate-700"
                  aria-label="fechar"
                >
                  <X size={20} />
                </button>

                <div className="pr-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    o que significa "ux boost simulator"?
                  </h2>
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p className="text-lg">
                      <strong className="text-slate-900">ux boost simulator</strong> quer dizer <strong className="text-slate-900">simulador de melhorias de experiencia do usuario</strong>.
                    </p>
                    <p>
                      ele serve para <strong>testar mudancas antes de realmente fazer</strong>.
                    </p>
                    <p>
                      o sistema simula o impacto de:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>mudar um botao de lugar</li>
                      <li>trocar uma cor</li>
                      <li>ajustar o texto</li>
                      <li>reduzir passos</li>
                      <li>reorganizar uma tela</li>
                    </ul>
                    <p>
                      e te diz:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>"isso aumenta a conversao em 3%"</li>
                      <li>"isso reduz a confusao do usuario"</li>
                      <li>"isso melhora a acessibilidade"</li>
                      <li>"isso acelera o fluxo em 1.2 segundos"</li>
                    </ul>
                    <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                      <p className="font-semibold text-slate-900">resumo:</p>
                      <p>
                        e um simulador que preve o impacto das melhorias no seu site ou app.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
