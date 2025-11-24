'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { consultationThemes } from '@/data/themes'
import { consultants } from '@/data/consultants'
import { Calendar, Clock, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

export default function BookingPage() {
  const params = useParams()
  const themeId = parseInt(params.themeId as string)
  const consultantId = parseInt(params.consultantId as string)
  
  const theme = consultationThemes.find(t => t.id === themeId)
  const consultant = consultants.find(c => c.id === consultantId)
  
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState(1)
  const [step, setStep] = useState(1)

  if (!theme || !consultant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Consultor ou tema não encontrado</h1>
          <Link href="/consultation" className="text-primary-600 hover:text-primary-700">
            Voltar para consultoria
          </Link>
        </div>
      </div>
    )
  }

  const total = consultant.pricePerHour * duration

  const handleBooking = () => {
    // Simular agendamento
    setStep(2)
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Consultoria Agendada!
            </h2>
            <p className="text-gray-600 mb-6">
              Sua consultoria com <strong>{consultant.name}</strong> foi agendada com sucesso.
              Você receberá um email de confirmação com os detalhes.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <div className="space-y-2">
                <div><strong>Tema:</strong> {theme.name}</div>
                <div><strong>Consultor:</strong> {consultant.name}</div>
                <div><strong>Data:</strong> {selectedDate}</div>
                <div><strong>Horário:</strong> {selectedTime}</div>
                <div><strong>Duração:</strong> {duration} hora(s)</div>
                <div><strong>Total:</strong> R$ {total.toFixed(2)}</div>
              </div>
            </div>
            <Link
              href="/consultation"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Agendar Outra Consultoria
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/consultation"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Agendar Consultoria
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline mr-2" size={18} />
                    Data
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline mr-2" size={18} />
                    Horário
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione um horário</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline mr-2" size={18} />
                    Duração (horas)
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value={1}>1 hora</option>
                    <option value={2}>2 horas</option>
                    <option value={3}>3 horas</option>
                    <option value={4}>4 horas</option>
                  </select>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="text-5xl mb-4">{theme.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {theme.name}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {theme.description}
              </p>

              <div className="border-t pt-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{consultant.avatar}</div>
                  <div>
                    <div className="font-bold">{consultant.name}</div>
                    <div className="text-sm text-gray-600">{consultant.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold">{consultant.rating}</span>
                  <span className="text-gray-500 text-sm">
                    ({consultant.reviews} avaliações)
                  </span>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Preço por hora:</span>
                  <span className="font-bold">R$ {consultant.pricePerHour}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-bold">{duration} hora(s)</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-primary-600">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

