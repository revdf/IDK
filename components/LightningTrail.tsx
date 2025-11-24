'use client'

import { useEffect, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
  timestamp: number
}

export default function LightningTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState<Point | null>(null)
  const trailRef = useRef<Point[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: Point = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }

      setMousePos(newPoint)
      trailRef.current.push(newPoint)

      // Manter apenas os últimos 20 pontos para performance
      if (trailRef.current.length > 20) {
        trailRef.current.shift()
      }
    }

    const drawLightning = (
      ctx: CanvasRenderingContext2D,
      from: Point,
      to: Point,
      intensity: number
    ) => {
      const distance = Math.sqrt(
        Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
      )

      if (distance < 5) return

      // Criar múltiplos segmentos para efeito de raio
      const segments = Math.max(3, Math.floor(distance / 30))
      const points: { x: number; y: number }[] = []

      // Ponto inicial
      points.push({ x: from.x, y: from.y })

      // Criar pontos intermediários com variação aleatória
      for (let i = 1; i < segments; i++) {
        const t = i / segments
        const baseX = from.x + (to.x - from.x) * t
        const baseY = from.y + (to.y - from.y) * t

        // Adicionar variação aleatória para efeito de raio
        const variation = (1 - t) * 15 * intensity
        const angle = Math.random() * Math.PI * 2

        points.push({
          x: baseX + Math.cos(angle) * variation,
          y: baseY + Math.sin(angle) * variation
        })
      }

      // Ponto final
      points.push({ x: to.x, y: to.y })

      // Desenhar o raio
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }

      // Gradiente elétrico - mais azul para fundo branco
      const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y)
      gradient.addColorStop(0, `rgba(59, 130, 246, ${0.9 * intensity})`) // Azul forte
      gradient.addColorStop(0.3, `rgba(37, 99, 235, ${1.0 * intensity})`) // Azul mais escuro
      gradient.addColorStop(0.7, `rgba(29, 78, 216, ${0.95 * intensity})`) // Azul escuro
      gradient.addColorStop(1, `rgba(59, 130, 246, ${0.85 * intensity})`) // Azul

      ctx.strokeStyle = gradient
      ctx.lineWidth = 4 + intensity * 4 // Mais grosso (era 2 + intensity * 2)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowBlur = 15
      ctx.shadowColor = 'rgba(59, 130, 246, 0.9)'
      ctx.stroke()

      // Camada interna mais brilhante para visibilidade
      ctx.strokeStyle = `rgba(147, 197, 253, ${0.8 * intensity})` // Azul claro
      ctx.lineWidth = 2 + intensity * 2
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(59, 130, 246, 0.6)'
      ctx.stroke()

      // Brilho branco no centro para destaque
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * intensity})`
      ctx.lineWidth = 1
      ctx.shadowBlur = 3
      ctx.stroke()
    }

      const maxAge = 500 // 500ms de duração

      const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const trail = trailRef.current
      const now = Date.now()

      // Desenhar rastro conectando os pontos
      for (let i = 0; i < trail.length - 1; i++) {
        const from = trail[i]
        const to = trail[i + 1]

        // Calcular intensidade baseada na idade do ponto
        const age = now - from.timestamp
        const intensity = Math.max(0, 1 - age / maxAge)

        if (intensity > 0) {
          drawLightning(ctx, from, to, intensity)
        }
      }

      // Remover pontos antigos
      trailRef.current = trail.filter(
        (point) => now - point.timestamp < maxAge
      )

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'normal' }}
    />
  )
}

