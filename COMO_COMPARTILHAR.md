# 📤 Como Compartilhar o Projeto IDK no Google Drive

## Passo 1: Criar o Arquivo ZIP

O arquivo `idk-mvp.zip` já foi criado na pasta do projeto!

**Localização:** `/Users/troll/Desktop/idk/idk-mvp.zip`

## Passo 2: Fazer Upload no Google Drive

### Opção A: Pelo Navegador

1. **Acesse o Google Drive:**
   - Vá para: https://drive.google.com
   - Faça login com sua conta Google

2. **Fazer Upload:**
   - Clique no botão **"Novo"** (canto superior esquerdo)
   - Selecione **"Upload de arquivo"**
   - Navegue até: `/Users/troll/Desktop/idk/`
   - Selecione o arquivo **`idk-mvp.zip`**
   - Aguarde o upload completar

3. **Compartilhar:**
   - Clique com botão direito no arquivo `idk-mvp.zip`
   - Selecione **"Compartilhar"**
   - **Opção 1:** Adicione os emails dos seus colegas
   - **Opção 2:** Clique em **"Alterar para qualquer pessoa com o link"**
     - Escolha **"Visualizador"** ou **"Editor"**
     - Copie o link gerado
     - Envie o link para o grupo

### Opção B: Arrastar e Soltar

1. Abra o Google Drive no navegador
2. Arraste o arquivo `idk-mvp.zip` da pasta para a janela do Google Drive
3. Aguarde o upload
4. Compartilhe seguindo os passos acima

## Passo 3: Instruções para os Colegas

Envie estas instruções junto com o link:

---

### 📥 Como Baixar e Executar o Projeto

1. **Baixar o arquivo:**
   - Acesse o link do Google Drive
   - Clique em "Download" no arquivo `idk-mvp.zip`

2. **Extrair o arquivo:**
   - Clique duas vezes no arquivo `.zip` para extrair
   - Ou use um programa de descompactação

3. **Abrir no terminal:**
   ```bash
   cd idk-mvp
   ```

4. **Instalar dependências:**
   ```bash
   npm install
   ```
   ⚠️ **Importante:** Isso pode levar alguns minutos na primeira vez

5. **Executar o projeto:**
   ```bash
   npm run dev
   ```

6. **Acessar no navegador:**
   - Abra: http://localhost:3000
   - Navegue pelas páginas:
     - Home: http://localhost:3000
     - Apresentação: http://localhost:3000/presentation
     - Consultoria: http://localhost:3000/consultation
     - Video Aulas: http://localhost:3000/courses
     - Dashboard: http://localhost:3000/dashboard

## ⚠️ Requisitos

Antes de executar, os colegas precisam ter instalado:

- **Node.js** (versão 18 ou superior)
  - Download: https://nodejs.org/
  - Verificar instalação: `node --version`

- **npm** (vem com Node.js)
  - Verificar: `npm --version`

## 📋 O que está incluído no ZIP

✅ Todo o código fonte
✅ Arquivos de configuração
✅ README com instruções
✅ Documentação

❌ **NÃO inclui:**
- `node_modules` (muito grande, será instalado com `npm install`)
- `.next` (pasta de build, será gerada automaticamente)

## 🔗 Links Úteis

- **Repositório:** (se usar Git)
- **Documentação:** README.md
- **Apresentação:** http://localhost:3000/presentation

## 💡 Dicas

- Se alguém tiver problemas, verifique se o Node.js está instalado
- O primeiro `npm install` pode demorar alguns minutos
- Se der erro, tente deletar `node_modules` e rodar `npm install` novamente

