export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  inStock: boolean
  tags?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface Recommendation {
  product: Product
  reason: string
  confidence: number
}

export interface AnalyticsData {
  conversionRate: number
  cartAbandonment: number
  averageOrderValue: number
  userEngagement: number
  checkoutSteps: number
  timeToCheckout: number
}

// Novos tipos para plataforma de consultoria
export interface Consultant {
  id: number
  name: string
  title: string
  bio: string
  avatar: string
  rating: number
  reviews: number
  pricePerHour: number
  specialties: string[]
  experience: number
  languages: string[]
  availability: 'available' | 'busy' | 'offline'
  verified: boolean
}

export interface ConsultationTheme {
  id: number
  name: string
  description: string
  icon: string
  category: 'ui' | 'ux' | 'strategy' | 'research' | 'design' | 'technology'
  consultants: Consultant[]
  priceRange: {
    min: number
    max: number
  }
}

export interface VideoCourse {
  id: number
  title: string
  description: string
  thumbnail: string
  duration: string
  instructor: string
  rating: number
  students: number
  price: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  modules: number
}

export interface ConsultationBooking {
  consultantId: number
  themeId: number
  date: string
  time: string
  duration: number
  total: number
}
