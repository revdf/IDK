'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react'

type FlowStep = {
  name: string
  touchpoint: string
  emotion: 'positivo' | 'neutro' | 'friccao'
}

type UxChecklist = {
  valueProposition: boolean
  h1Clarity: boolean
  subheadlineExists: boolean
  navigationSimple: boolean
  clearPathToCta: boolean
  pageIndicator: boolean
  loadSpeed: boolean
  ctaProminent: boolean
  formsShort: boolean
  searchAccurate: boolean
  consistency: boolean
  contrast: boolean
  altText: boolean
  keyboardNav: boolean
  touchTargets: boolean
  contentHierarchy: boolean
  scannable: boolean
  visualHierarchy: boolean
  responsive: boolean
  colorConsistency: boolean
  typographyConsistency: boolean
  imageQuality: boolean
  performance: boolean
}

type DigitalTwin = {
  id: string
  persona: string
  goal: string
  accessibilityScore: number
  contrastScore: number
  extraClicks: number
  brokenPaths: number
  loadTime: number
  steps: FlowStep[]
  checklist: UxChecklist
}

const seedFlows: DigitalTwin[] = [
  {
    id: 'checkout',
    persona: 'profissional mobile first',
    goal: 'finalizar compra em menos de 2 minutos',
    accessibilityScore: 82,
    contrastScore: 74,
    extraClicks: 3,
    brokenPaths: 1,
    loadTime: 2.8,
    steps: [
      { name: 'home', touchpoint: 'landing personalizada', emotion: 'positivo' },
      { name: 'busca por produto', touchpoint: 'barra inteligente', emotion: 'neutro' },
      { name: 'carrinho', touchpoint: 'drawer lateral', emotion: 'friccao' },
      { name: 'checkout', touchpoint: 'multi step', emotion: 'friccao' },
      { name: 'confirmacao', touchpoint: 'modal de sucesso', emotion: 'positivo' },
    ],
    checklist: {
      valueProposition: true,
      h1Clarity: true,
      subheadlineExists: true,
      navigationSimple: true,
      clearPathToCta: false,
      pageIndicator: true,
      loadSpeed: true,
      ctaProminent: false,
      formsShort: false,
      searchAccurate: true,
      consistency: true,
      contrast: false,
      altText: true,
      keyboardNav: true,
      touchTargets: true,
      contentHierarchy: true,
      scannable: true,
      visualHierarchy: false,
      responsive: true,
      colorConsistency: true,
      typographyConsistency: true,
      imageQuality: true,
      performance: true,
    },
  },
  {
    id: 'consultoria',
    persona: 'gestora que precisa de insights rapidos',
    goal: 'agendar consultoria guiada',
    accessibilityScore: 91,
    contrastScore: 88,
    extraClicks: 1,
    brokenPaths: 0,
    loadTime: 1.9,
    steps: [
      { name: 'landing', touchpoint: 'hero com CTA', emotion: 'positivo' },
      { name: 'servicos', touchpoint: 'cards comparativos', emotion: 'neutro' },
      { name: 'agenda', touchpoint: 'wizard 3 passos', emotion: 'positivo' },
      { name: 'pagamento', touchpoint: 'checkout express', emotion: 'neutro' },
    ],
    checklist: {
      valueProposition: true,
      h1Clarity: true,
      subheadlineExists: true,
      navigationSimple: true,
      clearPathToCta: true,
      pageIndicator: true,
      loadSpeed: true,
      ctaProminent: true,
      formsShort: true,
      searchAccurate: true,
      consistency: true,
      contrast: true,
      altText: true,
      keyboardNav: true,
      touchTargets: true,
      contentHierarchy: true,
      scannable: true,
      visualHierarchy: true,
      responsive: true,
      colorConsistency: true,
      typographyConsistency: true,
      imageQuality: true,
      performance: true,
    },
  },
]

const emotionPalette: Record<FlowStep['emotion'], { color: string; label: string }> = {
  positivo: { color: 'bg-green-100 border-green-300 text-green-700', label: 'fluxo fluido' },
  neutro: { color: 'bg-slate-100 border-slate-200 text-slate-700', label: 'ponto a observar' },
  friccao: { color: 'bg-rose-50 border-rose-200 text-rose-700', label: 'alerta de friccao' },
}

const checklistLabels: Record<keyof UxChecklist, { category: string; label: string }> = {
  valueProposition: { category: 'UX - Clareza', label: 'proposicao de valor clara em 5 segundos' },
  h1Clarity: { category: 'UX - Clareza', label: 'titulo principal (H1) claro e direto' },
  subheadlineExists: { category: 'UX - Clareza', label: 'subheadline ou texto de apoio presente' },
  navigationSimple: { category: 'UX - Navegacao', label: 'menu de navegacao simples e compreensivel' },
  clearPathToCta: { category: 'UX - Navegacao', label: 'caminho claro para acoes principais' },
  pageIndicator: { category: 'UX - Navegacao', label: 'indicador de pagina atual (breadcrumbs/menu ativo)' },
  loadSpeed: { category: 'UX - Usabilidade', label: 'carrega em menos de 3 segundos' },
  ctaProminent: { category: 'UX - Usabilidade', label: 'ctas proeminentes com texto de acao claro' },
  formsShort: { category: 'UX - Usabilidade', label: 'formularios curtos e bem rotulados' },
  searchAccurate: { category: 'UX - Usabilidade', label: 'busca precisa e retorna resultados relevantes' },
  consistency: { category: 'UX - Usabilidade', label: 'elementos interativos previsiveis' },
  contrast: { category: 'UX - Acessibilidade', label: 'contraste suficiente entre texto e fundo' },
  altText: { category: 'UX - Acessibilidade', label: 'imagens com texto alternativo descritivo' },
  keyboardNav: { category: 'UX - Acessibilidade', label: 'navegavel apenas com teclado (Tab)' },
  touchTargets: { category: 'UX - Acessibilidade', label: 'elementos grandes o suficiente para toque' },
  contentHierarchy: { category: 'UX - Conteudo', label: 'uso de titulos (H1, H2, H3) para quebrar texto' },
  scannable: { category: 'UX - Conteudo', label: 'paragrafos curtos e linguagem simples' },
  visualHierarchy: { category: 'UI - Hierarquia', label: 'elementos importantes se destacam visualmente' },
  responsive: { category: 'UI - Responsivo', label: 'funcional em todos os dispositivos' },
  colorConsistency: { category: 'UI - Consistencia', label: 'paleta de cores limitada e consistente' },
  typographyConsistency: { category: 'UI - Consistencia', label: 'maximo 2 fontes, tamanhos consistentes' },
  imageQuality: { category: 'UI - Imagética', label: 'imagens nitidas e relevantes' },
  performance: { category: 'UI - Desempenho', label: 'otimizado (imagens comprimidas, codigo limpo)' },
}

export default function UxDigitalTwinPage() {
  const [twins, setTwins] = useState<DigitalTwin[]>(seedFlows)
  const [selected, setSelected] = useState<string>(seedFlows[0].id)
  const [newTwin, setNewTwin] = useState({
    persona: '',
    goal: '',
    steps: '',
  })
  const [activeTab, setActiveTab] = useState<'fluxo' | 'checklist'>('fluxo')
  const [showInfoModal, setShowInfoModal] = useState(false)

  const current = useMemo(
    () => twins.find((flow) => flow.id === selected) ?? twins[0],
    [selected, twins],
  )

  const diagnostics = useMemo(() => {
    if (!current) return null
    const frictionIndex =
      (current.steps.filter((step) => step.emotion === 'friccao').length / current.steps.length) *
      100
    const accessibilityFlag = current.accessibilityScore < 85 ? 'precisa reforcar contraste e labels' : 'fluxo pronto para AA'
    const extraInteractionCopy =
      current.extraClicks > 2 ? `${current.extraClicks} cliques extras detectados` : 'sem excesso de cliques'

    const checklistItems = Object.entries(current.checklist)
    const passed = checklistItems.filter(([, value]) => value).length
    const total = checklistItems.length
    const checklistScore = Math.round((passed / total) * 100)

    const categoryScores = {
      clareza: Math.round(
        ([current.checklist.valueProposition, current.checklist.h1Clarity, current.checklist.subheadlineExists].filter(Boolean).length /
          3) *
          100,
      ),
      navegacao: Math.round(
        ([current.checklist.navigationSimple, current.checklist.clearPathToCta, current.checklist.pageIndicator].filter(Boolean).length /
          3) *
          100,
      ),
      usabilidade: Math.round(
        ([current.checklist.loadSpeed, current.checklist.ctaProminent, current.checklist.formsShort, current.checklist.searchAccurate, current.checklist.consistency].filter(Boolean).length /
          5) *
          100,
      ),
      acessibilidade: Math.round(
        ([current.checklist.contrast, current.checklist.altText, current.checklist.keyboardNav, current.checklist.touchTargets].filter(Boolean).length /
          4) *
          100,
      ),
      conteudo: Math.round(
        ([current.checklist.contentHierarchy, current.checklist.scannable].filter(Boolean).length / 2) * 100,
      ),
      ui: Math.round(
        ([current.checklist.visualHierarchy, current.checklist.responsive, current.checklist.colorConsistency, current.checklist.typographyConsistency, current.checklist.imageQuality, current.checklist.performance].filter(Boolean).length /
          6) *
          100,
      ),
    }

    return {
      frictionIndex: Math.round(frictionIndex),
      accessibilityFlag,
      extraInteractionCopy,
      coverage: 100 - current.brokenPaths * 12,
      checklistScore,
      categoryScores,
    }
  }, [current])

  const handleCreateTwin = () => {
    if (!newTwin.persona.trim() || !newTwin.goal.trim() || !newTwin.steps.trim()) return

    const parsedSteps: FlowStep[] = newTwin.steps
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const touchpoint = line.split(':')[0] ?? `ponto ${index + 1}`
        return {
          name: `passo ${index + 1}`,
          touchpoint,
          emotion: index % 3 === 0 ? 'positivo' : index % 2 === 0 ? 'neutro' : 'friccao',
        }
      })

    const simulatedTwin: DigitalTwin = {
      id: `twin-${Date.now()}`,
      persona: newTwin.persona,
      goal: newTwin.goal,
      accessibilityScore: 70 + Math.floor(Math.random() * 25),
      contrastScore: 65 + Math.floor(Math.random() * 30),
      extraClicks: Math.max(0, parsedSteps.length - 4),
      brokenPaths: parsedSteps.length > 5 ? 1 : 0,
      loadTime: 1.5 + Math.random() * 2.5,
      steps: parsedSteps,
      checklist: {
        valueProposition: Math.random() > 0.3,
        h1Clarity: Math.random() > 0.2,
        subheadlineExists: Math.random() > 0.3,
        navigationSimple: Math.random() > 0.25,
        clearPathToCta: Math.random() > 0.4,
        pageIndicator: Math.random() > 0.3,
        loadSpeed: Math.random() > 0.4,
        ctaProminent: Math.random() > 0.35,
        formsShort: Math.random() > 0.4,
        searchAccurate: Math.random() > 0.3,
        consistency: Math.random() > 0.25,
        contrast: Math.random() > 0.4,
        altText: Math.random() > 0.3,
        keyboardNav: Math.random() > 0.25,
        touchTargets: Math.random() > 0.3,
        contentHierarchy: Math.random() > 0.25,
        scannable: Math.random() > 0.3,
        visualHierarchy: Math.random() > 0.35,
        responsive: Math.random() > 0.2,
        colorConsistency: Math.random() > 0.25,
        typographyConsistency: Math.random() > 0.25,
        imageQuality: Math.random() > 0.3,
        performance: Math.random() > 0.35,
      },
    }

    setTwins((prev) => [...prev, simulatedTwin])
    setSelected(simulatedTwin.id)
    setNewTwin({ persona: '', goal: '', steps: '' })
  }

  const checklistByCategory = useMemo(() => {
    if (!current) return {}
    const grouped: Record<string, Array<{ key: keyof UxChecklist; label: string; value: boolean }>> = {}
    Object.entries(current.checklist).forEach(([key, value]) => {
      const info = checklistLabels[key as keyof UxChecklist]
      if (!grouped[info.category]) grouped[info.category] = []
      grouped[info.category].push({ key: key as keyof UxChecklist, label: info.label, value })
    })
    return grouped
  }, [current])

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-primary-500 font-semibold tracking-wide uppercase">
              ux digital twin
            </p>
            <button
              onClick={() => setShowInfoModal(true)}
              className="p-1.5 rounded-full hover:bg-primary-50 text-primary-500 hover:text-primary-600 transition"
              aria-label="o que e ux digital twin"
            >
              <Info size={18} />
            </button>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            analise completa de ux/ui com gemeo digital da experiencia
          </h1>
          <p className="text-slate-600 text-lg">
            geramos um modelo interativo do fluxo real, destacamos friccoes, contraste, acessibilidade, navegacao, conteudo, hierarquia visual, responsividade e desempenho. tudo em um unico lugar.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">modelos ativos</h2>
              <div className="space-y-3">
                {twins.map((flow) => (
                  <button
                    key={flow.id}
                    onClick={() => setSelected(flow.id)}
                    className={`w-full text-left rounded-xl border p-4 transition ${
                      selected === flow.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:border-primary-200'
                    }`}
                  >
                    <p className="font-semibold capitalize">{flow.persona}</p>
                    <p className="text-sm text-slate-500">{flow.goal}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">criar novo gemeo</h2>
              <div className="space-y-3">
                <input
                  placeholder="persona ou publico"
                  value={newTwin.persona}
                  onChange={(event) => setNewTwin((prev) => ({ ...prev, persona: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <input
                  placeholder="objetivo principal"
                  value={newTwin.goal}
                  onChange={(event) => setNewTwin((prev) => ({ ...prev, goal: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <textarea
                  placeholder="descreva os passos (um por linha)"
                  value={newTwin.steps}
                  onChange={(event) => setNewTwin((prev) => ({ ...prev, steps: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[120px]"
                />
                <button
                  onClick={handleCreateTwin}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition shadow-sm"
                >
                  gerar gemeo digital
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {current && diagnostics && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-white rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm text-slate-500">friccao total</p>
                    <p className="text-3xl font-bold text-rose-500">{diagnostics.frictionIndex}%</p>
                    <p className="text-slate-500 text-sm">passos que desafiam a fluidez</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm text-slate-500">mapa acessibilidade</p>
                    <p className="text-3xl font-bold text-emerald-500">{current.accessibilityScore}%</p>
                    <p className="text-slate-500 text-sm">{diagnostics.accessibilityFlag}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm text-slate-500">checklist completo</p>
                    <p className="text-3xl font-bold text-indigo-500">{diagnostics.checklistScore}%</p>
                    <p className="text-slate-500 text-sm">pontos de ux/ui validados</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm text-slate-500">tempo de carregamento</p>
                    <p className="text-3xl font-bold text-primary-500">{current.loadTime.toFixed(1)}s</p>
                    <p className="text-slate-500 text-sm">{current.loadTime < 3 ? 'dentro do ideal' : 'acima do recomendado'}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex gap-4 mb-6 border-b border-slate-200">
                    <button
                      onClick={() => setActiveTab('fluxo')}
                      className={`pb-3 px-2 font-semibold transition ${
                        activeTab === 'fluxo'
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      mapa visual do fluxo
                    </button>
                    <button
                      onClick={() => setActiveTab('checklist')}
                      className={`pb-3 px-2 font-semibold transition ${
                        activeTab === 'checklist'
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      checklist ux/ui completo
                    </button>
                  </div>

                  {activeTab === 'fluxo' && (
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div>
                          <p className="text-sm text-slate-500">mapa visual</p>
                          <h3 className="text-2xl font-semibold text-slate-900 capitalize">{current.persona}</h3>
                          <p className="text-slate-500">{current.goal}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {current.steps.map((step, index) => (
                          <motion.div
                            key={`${step.name}-${index}`}
                            initial={{ opacity: 0, translateX: -20 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative border ${emotionPalette[step.emotion].color} rounded-2xl p-4 shadow-sm`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs uppercase tracking-wide text-slate-500">passo {index + 1}</p>
                                <p className="text-lg font-semibold capitalize">{step.touchpoint}</p>
                              </div>
                              <span className="text-xs font-semibold">{emotionPalette[step.emotion].label}</span>
                            </div>
                            {index < current.steps.length - 1 && (
                              <div className="absolute left-1/2 bottom-[-28px] h-7 w-px bg-gradient-to-b from-slate-200 to-transparent mx-auto" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'checklist' && (
                    <div className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(diagnostics.categoryScores).map(([category, score]) => (
                          <div key={category} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">{category}</p>
                            <p className={`text-2xl font-bold ${score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-amber-500' : 'text-rose-500'}`}>
                              {score}%
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-6">
                        {Object.entries(checklistByCategory).map(([category, items]) => (
                          <div key={category} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                            <h4 className="font-semibold text-slate-900 mb-3 uppercase text-sm tracking-wide">{category}</h4>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {items.map((item) => (
                                <div
                                  key={item.key}
                                  className={`flex items-center gap-2 p-3 rounded-lg ${
                                    item.value ? 'bg-green-50 border border-green-200' : 'bg-rose-50 border border-rose-200'
                                  }`}
                                >
                                  {item.value ? (
                                    <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                                  ) : (
                                    <XCircle size={18} className="text-rose-600 flex-shrink-0" />
                                  )}
                                  <span className={`text-sm ${item.value ? 'text-green-700' : 'text-rose-700'}`}>
                                    {item.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
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
                    o que e ux digital twin?
                  </h2>
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p className="text-lg">
                      <strong className="text-slate-900">ux digital twin</strong> quer dizer <strong className="text-slate-900">gemeo digital da experiencia do usuario</strong>.
                    </p>
                    <p>
                      em vez de analisar o site original direto, o sistema cria um <strong>modelo digital</strong>, uma copia inteligente que mostra como o usuario usa o site:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>como ele navega</li>
                      <li>onde ele trava</li>
                      <li>onde clica mais</li>
                      <li>onde perde tempo</li>
                      <li>onde fica confuso</li>
                    </ul>
                    <p>
                      e como se o sistema criasse uma <strong>versao virtual do seu site</strong>, com todos os caminhos e comportamentos, para descobrir problemas sem precisar testar tudo manualmente.
                    </p>
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
