import { Product } from '@/types'

export const products: Product[] = [
  {
    id: 1,
    name: 'Smartphone Pro Max',
    description: 'Tela de 6.7", 256GB, Câmera Tripla 108MP',
    price: 2999.99,
    originalPrice: 3499.99,
    image: '📱',
    category: 'Eletrônicos',
    rating: 4.8,
    inStock: true,
    tags: ['destaque', 'promoção']
  },
  {
    id: 2,
    name: 'Notebook Ultra',
    description: 'Intel i7, 16GB RAM, SSD 512GB, Tela 15.6"',
    price: 4499.99,
    originalPrice: 5299.99,
    image: '💻',
    category: 'Eletrônicos',
    rating: 4.9,
    inStock: true,
    tags: ['destaque']
  },
  {
    id: 3,
    name: 'Fone Bluetooth Premium',
    description: 'Cancelamento de Ruído, Bateria 30h',
    price: 599.99,
    originalPrice: 799.99,
    image: '🎧',
    category: 'Áudio',
    rating: 4.7,
    inStock: true,
    tags: ['promoção']
  },
  {
    id: 4,
    name: 'Smartwatch Fitness',
    description: 'Monitor Cardíaco, GPS, Resistente à Água',
    price: 899.99,
    image: '⌚',
    category: 'Wearables',
    rating: 4.6,
    inStock: true,
    tags: []
  },
  {
    id: 5,
    name: 'Tablet Pro',
    description: 'Tela 11", 128GB, Stylus Incluso',
    price: 2499.99,
    originalPrice: 2999.99,
    image: '📱',
    category: 'Eletrônicos',
    rating: 4.5,
    inStock: true,
    tags: ['promoção']
  },
  {
    id: 6,
    name: 'Caixa de Som Portátil',
    description: '360° Sound, Bateria 20h, À Prova d\'Água',
    price: 399.99,
    image: '🔊',
    category: 'Áudio',
    rating: 4.4,
    inStock: true,
    tags: []
  },
  {
    id: 7,
    name: 'Mouse Gamer RGB',
    description: '16000 DPI, 8 Botões Programáveis',
    price: 249.99,
    image: '🖱️',
    category: 'Periféricos',
    rating: 4.6,
    inStock: true,
    tags: []
  },
  {
    id: 8,
    name: 'Teclado Mecânico',
    description: 'Switches RGB, Layout ABNT2',
    price: 549.99,
    image: '⌨️',
    category: 'Periféricos',
    rating: 4.7,
    inStock: true,
    tags: []
  }
]

