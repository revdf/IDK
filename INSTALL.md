# Guia de Instalação - IDK MVP

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no navegador

## Estrutura do Projeto

```
idk/
├── app/                    # Páginas Next.js (App Router)
│   ├── page.tsx           # Página principal (loja)
│   ├── dashboard/         # Dashboard de análise
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── Header.tsx         # Cabeçalho com navegação
│   ├── ProductCard.tsx    # Card de produto
│   ├── ProductGrid.tsx    # Grid de produtos
│   ├── Recommendations.tsx # Sistema de recomendações
│   ├── Cart.tsx           # Carrinho de compras
│   ├── Checkout.tsx       # Checkout simplificado
│   ├── ProcessSteps.tsx   # Processo de 5 etapas
│   └── AnalyticsDashboard.tsx # Dashboard de métricas
├── data/                  # Dados mockados
│   └── products.ts        # Lista de produtos
├── types/                 # Definições TypeScript
│   └── index.ts          # Tipos e interfaces
└── package.json          # Dependências do projeto
```

## Funcionalidades Implementadas

### ✅ Interface Otimizada
- Design limpo e moderno
- Responsivo para mobile e desktop
- Animações suaves com Framer Motion

### ✅ Sistema de Recomendações
- Baseado em comportamento do usuário
- Promoções dinâmicas
- Personalização em tempo real

### ✅ Checkout Simplificado
- Processo reduzido de atrito
- Formulário otimizado
- Múltiplas opções de pagamento

### ✅ Dashboard de Análise
- Métricas de conversão
- Gráficos de evolução
- Funil de checkout
- Processo de 5 etapas (Pesquisa, Análise, Design, Testes, Relatório)

### ✅ Impacto Social e Sustentabilidade
- Redução de erros de compra
- Inclusão digital
- Sustentabilidade ambiental

## Build para Produção

```bash
npm run build
npm start
```

## Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones

