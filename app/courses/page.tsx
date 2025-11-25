'use client'

import { Header } from '@/components/Header'
import VideoCoursesSection from '@/components/VideoCoursesSection'

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={0} onCartClick={() => {}} />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Video Aulas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprenda com os melhores profissionais através de cursos completos e práticos 
            sobre UX/UI Design, Estratégia Digital e muito mais.
          </p>
        </div>

        <VideoCoursesSection />
      </main>
    </div>
  )
}

