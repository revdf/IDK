import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    // Normalizar URL
    let targetUrl = url.trim()
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`
    }

    // Fazer requisição para o site
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: AbortSignal.timeout(10000), // 10 segundos timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()

    // Análise básica do HTML
    const analysis = {
      url: targetUrl,
      title: extractTitle(html),
      hasH1: /<h1[^>]*>/i.test(html),
      h1Count: (html.match(/<h1[^>]*>/gi) || []).length,
      hasMetaDescription: /<meta[^>]*name=["']description["'][^>]*>/i.test(html),
      imageCount: (html.match(/<img[^>]*>/gi) || []).length,
      imagesWithAlt: (html.match(/<img[^>]*alt=["'][^"']+["'][^>]*>/gi) || []).length,
      linkCount: (html.match(/<a[^>]*href=["'][^"']+["'][^>]*>/gi) || []).length,
      formCount: (html.match(/<form[^>]*>/gi) || []).length,
      hasNavigation: /<nav[^>]*>/i.test(html) || /<header[^>]*>/i.test(html),
      hasHeader: /<header[^>]*>/i.test(html),
      hasFooter: /<footer[^>]*>/i.test(html),
      hasMain: /<main[^>]*>/i.test(html),
      hasButton: /<button[^>]*>/i.test(html),
      buttonCount: (html.match(/<button[^>]*>/gi) || []).length,
      hasInput: /<input[^>]*>/i.test(html),
      inputCount: (html.match(/<input[^>]*>/gi) || []).length,
      hasLabel: /<label[^>]*>/i.test(html),
      labelCount: (html.match(/<label[^>]*>/gi) || []).length,
      hasAriaLabel: /aria-label=["'][^"']+["']/i.test(html),
      hasLang: /<html[^>]*lang=["'][^"']+["']/i.test(html),
      hasViewport: /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html),
      hasCharset: /<meta[^>]*charset=["'][^"']+["']/i.test(html),
      scriptCount: (html.match(/<script[^>]*>/gi) || []).length,
      styleCount: (html.match(/<style[^>]*>/gi) || []).length,
      linkStylesheetCount: (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).length,
      htmlLength: html.length,
      loadTime: Date.now(),
    }

    // Calcular scores
    const accessibilityScore = calculateAccessibilityScore(analysis)
    const contrastScore = 75 // Placeholder - seria necessário análise de CSS
    const performanceScore = calculatePerformanceScore(analysis)
    const usabilityScore = calculateUsabilityScore(analysis)

    return NextResponse.json({
      ...analysis,
      scores: {
        accessibility: accessibilityScore,
        contrast: contrastScore,
        performance: performanceScore,
        usability: usabilityScore,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to analyze site' },
      { status: 500 }
    )
  }
}

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return titleMatch ? titleMatch[1].trim() : 'No title found'
}

function calculateAccessibilityScore(analysis: any): number {
  let score = 0
  let maxScore = 0

  // H1 presente e único
  maxScore += 10
  if (analysis.hasH1 && analysis.h1Count === 1) score += 10
  else if (analysis.hasH1) score += 5

  // Meta description
  maxScore += 5
  if (analysis.hasMetaDescription) score += 5

  // Imagens com alt
  maxScore += 15
  if (analysis.imageCount > 0) {
    const altRatio = analysis.imagesWithAlt / analysis.imageCount
    score += Math.round(15 * altRatio)
  }

  // Labels em formulários
  maxScore += 15
  if (analysis.inputCount > 0) {
    const labelRatio = Math.min(analysis.labelCount / analysis.inputCount, 1)
    score += Math.round(15 * labelRatio)
  }

  // ARIA labels
  maxScore += 10
  if (analysis.hasAriaLabel) score += 10

  // Lang attribute
  maxScore += 5
  if (analysis.hasLang) score += 5

  // Viewport meta
  maxScore += 5
  if (analysis.hasViewport) score += 5

  // Estrutura semântica
  maxScore += 15
  let semanticScore = 0
  if (analysis.hasNavigation) semanticScore += 3
  if (analysis.hasHeader) semanticScore += 3
  if (analysis.hasMain) semanticScore += 3
  if (analysis.hasFooter) semanticScore += 3
  if (analysis.hasButton) semanticScore += 3
  score += semanticScore

  // Charset
  maxScore += 5
  if (analysis.hasCharset) score += 5

  return Math.min(100, Math.round((score / maxScore) * 100))
}

function calculatePerformanceScore(analysis: any): number {
  let score = 100

  // Penalizar muitos scripts
  if (analysis.scriptCount > 20) score -= 20
  else if (analysis.scriptCount > 10) score -= 10

  // Penalizar HTML muito grande
  if (analysis.htmlLength > 1000000) score -= 20
  else if (analysis.htmlLength > 500000) score -= 10

  // Penalizar muitos estilos inline
  if (analysis.styleCount > 10) score -= 10

  return Math.max(0, score)
}

function calculateUsabilityScore(analysis: any): number {
  let score = 0
  let maxScore = 0

  // Título presente
  maxScore += 10
  if (analysis.title && analysis.title !== 'No title found') score += 10

  // Navegação presente
  maxScore += 15
  if (analysis.hasNavigation) score += 15

  // Links presentes
  maxScore += 10
  if (analysis.linkCount > 0) score += 10

  // Botões presentes
  maxScore += 10
  if (analysis.hasButton) score += 10

  // Formulários com labels
  maxScore += 15
  if (analysis.formCount > 0 && analysis.labelCount > 0) score += 15

  // Estrutura semântica
  maxScore += 20
  let semanticScore = 0
  if (analysis.hasHeader) semanticScore += 5
  if (analysis.hasMain) semanticScore += 5
  if (analysis.hasNavigation) semanticScore += 5
  if (analysis.hasFooter) semanticScore += 5
  score += semanticScore

  // Viewport (mobile-friendly)
  maxScore += 10
  if (analysis.hasViewport) score += 10

  // Meta description (SEO/UX)
  maxScore += 10
  if (analysis.hasMetaDescription) score += 10

  return Math.min(100, Math.round((score / maxScore) * 100))
}

