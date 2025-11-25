'use client'

import { Header } from '@/components/Header'
import ConsultationMarketplace from '@/components/ConsultationMarketplace'

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={0} onCartClick={() => {}} />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Consultoria Online
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o tema da sua consultoria e selecione o profissional ideal para 
            impulsionar o sucesso do seu site. Otimização de UI, Personalização de UX 
            e Gestão Estratégica.
          </p>
        </div>

        <ConsultationMarketplace />
      </main>
    </div>
  )
}

