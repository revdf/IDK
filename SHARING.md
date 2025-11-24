# Como Compartilhar o Projeto IDK

## 📦 Preparação para Compartilhar

### Opção 1: Compactar o Projeto (Recomendado)

1. **Criar arquivo ZIP:**
   ```bash
   # No terminal, dentro da pasta do projeto:
   cd /Users/troll/Desktop/idk
   zip -r idk-mvp.zip . -x "node_modules/*" ".next/*" ".git/*"
   ```

2. **Ou usar o Finder (macOS):**
   - Clique com botão direito na pasta `idk`
   - Selecione "Compactar"
   - Isso criará um arquivo `idk.zip`

### Opção 2: Usar Git (Se o grupo tem Git)

1. **Criar repositório no GitHub/GitLab:**
   - Criar repositório novo
   - Fazer push do código

2. **Compartilhar link do repositório**

## 📤 Upload no Google Drive

1. **Acesse Google Drive:**
   - Vá para https://drive.google.com
   - Faça login na sua conta Google

2. **Fazer Upload:**
   - Clique em "Novo" → "Upload de arquivo"
   - Selecione o arquivo `idk-mvp.zip` ou `idk.zip`
   - Aguarde o upload completar

3. **Compartilhar:**
   - Clique com botão direito no arquivo
   - Selecione "Compartilhar"
   - Adicione os emails dos colegas OU
   - Clique em "Alterar para qualquer pessoa com o link"
   - Copie o link e envie para o grupo

## 📋 Instruções para os Colegas

### Após Baixar o Projeto:

1. **Extrair o arquivo ZIP:**
   - Clique duas vezes no arquivo `.zip`
   - Extraia para uma pasta

2. **Instalar dependências:**
   ```bash
   cd idk
   npm install
   ```

3. **Executar o projeto:**
   ```bash
   npm run dev
   ```

4. **Acessar no navegador:**
   - Abra http://localhost:3000

## ⚠️ Importante

- **node_modules NÃO está incluído** (é muito grande)
- Os colegas precisam ter Node.js instalado
- Após extrair, rodar `npm install` para instalar dependências

## 🔗 Links Úteis

- **Home:** http://localhost:3000
- **Apresentação:** http://localhost:3000/presentation
- **Consultoria:** http://localhost:3000/consultation
- **Video Aulas:** http://localhost:3000/courses
- **Dashboard:** http://localhost:3000/dashboard

