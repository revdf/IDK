# IDK - Plataforma de Consultoria em UX/UI

Plataforma completa de consultoria em Otimização de UI e Personalização de UX, inspirada na Neotix.

## 🎯 Sobre o Projeto

A IDK é uma plataforma de marketplace que conecta empresas e profissionais que precisam de consultoria em UX/UI com especialistas certificados. Oferecemos:

- **Consultoria Online**: Marketplace com temas de consultoria e profissionais especializados
- **Video Aulas**: Cursos completos sobre UX/UI Design, Estratégia Digital e mais
- **Serviços**: Research, Design e Technology
- **Dashboard**: Métricas e análises de performance

## 🚀 Como executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📋 Funcionalidades

### 1. Home Page
- Hero section com call-to-action
- Estatísticas da plataforma
- Seção de serviços
- Preview do marketplace de consultoria
- Preview de video aulas

### 2. Consultoria Online (`/consultation`)
- Marketplace de temas de consultoria:
  - Otimização de UI
  - Personalização de UX
  - Gestão Estratégica
  - UX Research
  - Design System
  - Performance & Tecnologia
  - Acessibilidade Web
  - Product Design
- Seleção de consultores por tema
- Sistema de agendamento e pagamento
- Perfis de consultores com avaliações

### 3. Video Aulas (`/courses`)
- Catálogo completo de cursos
- Filtros por categoria e nível
- Informações detalhadas de cada curso
- Sistema de compra de cursos

### 4. Serviços (`/services`)
- Detalhamento dos serviços:
  - **Research**: Pesquisa de usuários, personas, jornadas
  - **Design**: UI Design, sistemas de design, prototipação
  - **Technology**: Performance, SEO técnico, implementação

### 5. Dashboard (`/dashboard`)
- Métricas de conversão
- Análise de performance
- Processo de 5 etapas (Pesquisa, Análise, Design, Testes, Relatório)
- Impacto social e sustentabilidade

## 🏗️ Estrutura do Projeto

```
idk/
├── app/                          # Páginas Next.js (App Router)
│   ├── page.tsx                 # Home page
│   ├── consultation/            # Marketplace de consultoria
│   │   ├── page.tsx
│   │   └── theme/[themeId]/consultant/[consultantId]/
│   ├── courses/                 # Video aulas
│   ├── services/                # Serviços
│   └── dashboard/               # Dashboard de análise
├── components/                   # Componentes React
│   ├── Header.tsx
│   ├── ServicesSection.tsx
│   ├── ConsultationMarketplace.tsx
│   ├── ConsultantCard.tsx
│   ├── VideoCoursesSection.tsx
│   ├── StatsSection.tsx
│   └── AnalyticsDashboard.tsx
├── data/                        # Dados mockados
│   ├── consultants.ts          # Lista de consultores
│   ├── themes.ts               # Temas de consultoria
│   └── videoCourses.ts         # Cursos de video
└── types/                       # Definições TypeScript
```

## 💡 Conceitos Implementados

### Marketplace de Consultoria
- Sistema de temas/áreas de consultoria
- Múltiplos consultores por tema
- Seleção e agendamento de consultores
- Sistema de preços por hora
- Avaliações e reviews

### Personalização
- Recomendações baseadas em interesse
- Filtros e busca
- Interface adaptativa

### Otimização de UI
- Design limpo e moderno
- Interface intuitiva
- Animações suaves
- Responsivo

## 🌱 Impacto Social e Sustentabilidade

- **Redução de Erros**: Consultoria especializada reduz erros de implementação
- **Inclusão Digital**: Design acessível e inclusivo
- **Eficiência**: Menos retrabalho e mais resultados

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones

## 📝 Próximos Passos

- [ ] Integração com sistema de pagamento
- [ ] Sistema de autenticação
- [ ] Área do consultor
- [ ] Sistema de videochamada
- [ ] Notificações em tempo real
- [ ] Sistema de reviews e avaliações
