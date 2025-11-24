'use client'

import { TrendingUp, ShoppingCart, Users, Clock, DollarSign, Target } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const metrics = [
  {
    icon: TrendingUp,
    label: 'Taxa de Conversão',
    value: '3.2%',
    change: '+12%',
    positive: true
  },
  {
    icon: ShoppingCart,
    label: 'Abandono de Carrinho',
    value: '45%',
    change: '-8%',
    positive: true
  },
  {
    icon: DollarSign,
    label: 'Ticket Médio',
    value: 'R$ 1.245',
    change: '+5%',
    positive: true
  },
  {
    icon: Users,
    label: 'Engajamento',
    value: '68%',
    change: '+15%',
    positive: true
  },
  {
    icon: Clock,
    label: 'Tempo no Checkout',
    value: '2.3 min',
    change: '-25%',
    positive: true
  },
  {
    icon: Target,
    label: 'Taxa de Erro',
    value: '1.2%',
    change: '-40%',
    positive: true
  }
]

const conversionData = [
  { month: 'Jan', antes: 2.1, depois: 2.8 },
  { month: 'Fev', antes: 2.3, depois: 2.9 },
  { month: 'Mar', antes: 2.2, depois: 3.0 },
  { month: 'Abr', antes: 2.4, depois: 3.1 },
  { month: 'Mai', antes: 2.5, depois: 3.2 },
  { month: 'Jun', antes: 2.6, depois: 3.2 }
]

const checkoutSteps = [
  { step: 'Carrinho', taxa: 100 },
  { step: 'Informações', taxa: 78 },
  { step: 'Pagamento', taxa: 65 },
  { step: 'Confirmação', taxa: 58 }
]

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  metric.positive ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon className={metric.positive ? 'text-green-600' : 'text-red-600'} size={24} />
                </div>
                <span className={`text-sm font-semibold ${
                  metric.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Evolução da Taxa de Conversão
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="antes" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Antes"
              />
              <Line 
                type="monotone" 
                dataKey="depois" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                name="Depois"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Funil de Checkout
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={checkoutSteps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="step" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="taxa" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8 border border-primary-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Impacto Social e Sustentabilidade
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-2 text-primary-700">
              🌱 Sustentabilidade Ambiental
            </h4>
            <p className="text-gray-700">
              Interfaces mais claras reduzem erros de compra, diminuindo a taxa de devolução 
              de produtos. Isso resulta em menos logística, transporte e embalagens, 
              reduzindo significativamente a pegada de carbono.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-primary-700">
              ♿ Inclusão Digital
            </h4>
            <p className="text-gray-700">
              Otimizar a interface para ser mais intuitiva e limpa também significa torná-la 
              mais acessível e fácil de usar para públicos com menor familiaridade digital 
              ou com algum tipo de deficiência, promovendo a Inclusão Digital.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

