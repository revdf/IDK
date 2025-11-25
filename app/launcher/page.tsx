'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type StatusType = 'checking' | 'ok' | 'fail'

type RouteConfig = {
  label: string
  path: string
}

const routes: RouteConfig[] = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Cursos', path: '/courses' },
  { label: 'Serviços', path: '/services' },
  { label: 'Consultas', path: '/consultation' },
  {
    label: 'Consultoria UX Boost',
    path: '/consultation/theme/ux-boost-simulator/consultant/demo'
  },
  { label: 'Apresentação', path: '/presentation' },
  { label: 'Inovação - SWOT', path: '/inovacao/analise-swot' },
  { label: 'Inovação - UX Boost', path: '/inovacao/ux-boost-simulator' },
  { label: 'Inovação - Digital Twin', path: '/inovacao/ux-digital-twin' }
]

export default function LauncherPage() {
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000')
  const [status, setStatus] = useState<{ message: string; type: StatusType }>({
    message: 'Verificando servidor...',
    type: 'checking'
  })

  const sanitizedBaseUrl = useMemo(
    () => baseUrl.trim().replace(/\/$/, ''),
    [baseUrl]
  )

  const openRoute = useCallback(
    (path: string) => {
      const url = `${sanitizedBaseUrl}${path}`
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    [sanitizedBaseUrl]
  )

  const pingServer = useCallback(async () => {
    setStatus({ message: 'Verificando servidor...', type: 'checking' })
    try {
      const res = await fetch(sanitizedBaseUrl, { mode: 'no-cors' })
      if (!res || (res.status !== 200 && res.type === 'opaque')) {
        setStatus({
          message: 'Servidor parece responder (modo no-cors).',
          type: 'ok'
        })
      } else {
        setStatus({ message: 'Servidor online.', type: 'ok' })
      }
    } catch (error) {
      console.error('Erro ao verificar servidor', error)
      setStatus({
        message: 'Servidor offline? Rode `npm run dev` e recarregue.',
        type: 'fail'
      })
    }
  }, [sanitizedBaseUrl])

  useEffect(() => {
    pingServer()
  }, [pingServer])

  const handleOpenAll = () => {
    routes.forEach((route, index) => {
      setTimeout(() => openRoute(route.path), index * 150)
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-6 font-sans">
      <header className="flex flex-col gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Atalho de páginas do projeto
        </h1>
        <input
          type="url"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="URL base do servidor (ex.: http://localhost:3000)"
          className="flex-1 min-w-[260px] rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleOpenAll}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Abrir todas
        </button>
      </header>

      <div
        className={`text-sm font-medium ${
          status.type === 'ok'
            ? 'text-emerald-400'
            : status.type === 'fail'
            ? 'text-rose-400'
            : 'text-slate-300'
        }`}
      >
        {status.message}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <article
            key={route.path}
            className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4"
          >
            <strong className="text-lg">{route.label}</strong>
            <code className="rounded bg-slate-800/80 px-2 py-1 text-sm text-slate-300">
              {route.path}
            </code>
            <button
              onClick={() => openRoute(route.path)}
              className="rounded-lg bg-blue-600 px-3 py-2 font-semibold text-sm shadow shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Abrir
            </button>
          </article>
        ))}
      </section>
    </div>
  )
}

