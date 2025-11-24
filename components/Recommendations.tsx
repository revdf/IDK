'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types'
import { products } from '@/data/products'
import ProductCard from './ProductCard'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface RecommendationsProps {
  userBehavior: string[]
  onAddToCart: (product: Product) => void
}

export default function Recommendations({ userBehavior, onAddToCart }: RecommendationsProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])

  useEffect(() => {
    if (userBehavior.length === 0) {
      // Mostrar produtos em promoção como recomendação inicial
      setRecommendedProducts(products.filter(p => p.tags?.includes('promoção')).slice(0, 4))
      return
    }

    // Sistema de recomendação baseado em comportamento
    const categoryCounts = userBehavior.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topCategory = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0]

    if (topCategory) {
      const recommended = products
        .filter(p => p.category === topCategory)
        .slice(0, 4)
      
      if (recommended.length > 0) {
        setRecommendedProducts(recommended)
      } else {
        // Fallback para produtos similares
        setRecommendedProducts(products.slice(0, 4))
      }
    }
  }, [userBehavior])

  if (recommendedProducts.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-12 bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-primary-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">
          Recomendado para Você
        </h2>
      </div>
      
      <p className="text-gray-600 mb-4">
        {userBehavior.length > 0
          ? `Baseado no seu interesse em ${userBehavior[userBehavior.length - 1]}`
          : 'Ofertas especiais selecionadas para você'}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </motion.section>
  )
}

