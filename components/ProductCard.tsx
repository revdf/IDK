'use client'

import { Product } from '@/types'
import { ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl"
    >
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-6xl">
          {product.image}
        </div>
        
        {product.originalPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            -{discount}%
          </span>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Esgotado</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>
        
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through mr-2">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-primary-600">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={18} />
          <span>Adicionar ao Carrinho</span>
        </button>
      </div>
    </motion.div>
  )
}

