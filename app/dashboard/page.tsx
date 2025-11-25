'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import ProcessSteps from '@/components/ProcessSteps'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header cartCount={0} onCartClick={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard de Análise UX
          </h1>
          <p className="text-gray-600">
            Métricas e insights para otimização contínua
          </p>
        </div>

        <ProcessSteps />

        <AnalyticsDashboard />
      </main>
    </div>
  )
}

