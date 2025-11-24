import { ConsultationTheme } from '@/types'
import { consultants } from './consultants'

export const consultationThemes: ConsultationTheme[] = [
  {
    id: 1,
    name: 'Otimização de UI',
    description: 'Melhore a interface do seu site com design moderno, intuitivo e focado em conversão. Análise completa de usabilidade e recomendações práticas.',
    icon: '🎨',
    category: 'ui',
    consultants: consultants.filter(c => c.specialties.some(s => s.includes('UI') || s.includes('Design'))),
    priceRange: { min: 200, max: 350 }
  },
  {
    id: 2,
    name: 'Personalização de UX',
    description: 'Crie experiências personalizadas que engajam e convertem. Estratégias de personalização baseadas em dados e comportamento do usuário.',
    icon: '✨',
    category: 'ux',
    consultants: consultants.filter(c => c.specialties.some(s => s.includes('UX') || s.includes('Research'))),
    priceRange: { min: 250, max: 350 }
  },
  {
    id: 3,
    name: 'Gestão Estratégica',
    description: 'Desenvolva estratégias digitais que impulsionam resultados. Planejamento, análise de mercado e roadmap de crescimento.',
    icon: '📊',
    category: 'strategy',
    consultants: consultants.filter(c => c.specialties.some(s => s.includes('Estratégia') || s.includes('Growth'))),
    priceRange: { min: 300, max: 350 }
  },
  {
    id: 4,
    name: 'UX Research',
    description: 'Pesquisa profunda de usuários, personas, jornadas e testes de usabilidade. Entenda seu público e tome decisões baseadas em dados.',
    icon: '🔍',
    category: 'research',
    consultants: consultants.filter(c => c.specialties.some(s => s.includes('Research') || s.includes('Testing'))),
    priceRange: { min: 250, max: 300 }
  },
  {
    id: 5,
    name: 'Design System',
    description: 'Crie e implemente sistemas de design escaláveis. Componentes reutilizáveis, guias de estilo e documentação completa.',
    icon: '🧩',
    category: 'design',
    consultants: consultants.filter(c => c.specialties.some(s => s.includes('Design System') || s.includes('Prototipação'))),
    priceRange: { min: 200, max: 320 }
  },
  {
    id: 6,
    name: 'Performance & Tecnologia',
    description: 'Otimize performance, velocidade e SEO técnico. Melhore Core Web Vitals e experiência de carregamento.',
    icon: '⚡',
    category: 'technology',
    consultants: consultants.filter(c => c.specialties.some(s => s.includes('Performance') || s.includes('Frontend'))),
    priceRange: { min: 200, max: 300 }
  },
  {
    id: 7,
    name: 'Acessibilidade Web',
    description: 'Torne seu site acessível para todos. Conformidade WCAG, testes de acessibilidade e design inclusivo.',
    icon: '♿',
    category: 'ux',
    consultants: consultants.filter(c => c.specialties.some(s => s.includes('Acessibilidade'))),
    priceRange: { min: 280, max: 300 }
  },
  {
    id: 8,
    name: 'Product Design',
    description: 'Design de produtos digitais complexos. Estratégia de produto, roadmap e execução de design.',
    icon: '🚀',
    category: 'design',
    consultants: consultants.filter(c => c.specialties.some(s => s.includes('Product'))),
    priceRange: { min: 300, max: 350 }
  }
]
