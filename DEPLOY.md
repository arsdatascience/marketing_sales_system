# 🚀 Guia de Deploy - Vercel + Railway

## 📋 Visão Geral

- **Frontend (Next.js)** → Vercel
- **Backend (Node.js + Express)** → Railway
- **Banco de Dados** → Railway PostgreSQL

---

## ✅ Pré-requisitos

- [x] Conta no GitHub (já configurado)
- [ ] Conta na Vercel (https://vercel.com)
- [ ] Conta no Railway (https://railway.app)
- [ ] Repositório no GitHub (✅ já criado)

---

## 🎯 Parte 1: Deploy do Backend no Railway

### Passo 1: Criar Conta no Railway

1. Acesse: https://railway.app
2. Clique em **"Start a New Project"**
3. Faça login com GitHub

### Passo 2: Criar Novo Projeto

1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha: `arsdatascience/marketing_sales_system`
4. Selecione a pasta: **`backend`**

### Passo 3: Adicionar PostgreSQL

1. No projeto, clique em **"+ New"**
2. Selecione **"Database"** → **"Add PostgreSQL"**
3. Railway criará automaticamente o banco

### Passo 4: Configurar Variáveis de Ambiente

No Railway, vá em **Variables** e adicione:

```env
# Database (Railway fornece automaticamente)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# JWT Secret (gere uma chave forte)
JWT_SECRET=sua-chave-super-secreta-aqui-mude-isso

# Port (Railway define automaticamente)
PORT=${{PORT}}

# Timezone
TZ=America/Sao_Paulo

# Frontend URL (será configurado depois)
FRONTEND_URL=https://seu-app.vercel.app
```

**⚠️ IMPORTANTE:** Gere um JWT_SECRET forte:
```bash
# No seu terminal local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Passo 5: Atualizar Schema do Prisma para PostgreSQL

No arquivo `backend/prisma/schema.prisma`, altere:

```prisma
datasource db {
  provider = "postgresql"  // Mudar de "sqlite" para "postgresql"
  url      = env("DATABASE_URL")
}
```

### Passo 6: Deploy

1. Faça commit das alterações:
```bash
git add .
git commit -m "chore: configurar para deploy no Railway"
git push origin master
```

2. Railway fará deploy automaticamente
3. Aguarde o build completar (2-5 minutos)

### Passo 7: Executar Migrações

No Railway, vá em **Settings** → **Deploy** e adicione:

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma db push && npm run build
```

**Start Command:**
```bash
npm start
```

### Passo 8: Obter URL do Backend

1. No Railway, clique em **Settings** → **Networking**
2. Clique em **Generate Domain**
3. Copie a URL (ex: `https://seu-backend.up.railway.app`)

---

## 🎨 Parte 2: Deploy do Frontend na Vercel

### Passo 1: Criar Conta na Vercel

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Faça login com GitHub

### Passo 2: Importar Projeto

1. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
2. Selecione: `arsdatascience/marketing_sales_system`
3. **Root Directory:** Selecione `frontend`
4. **Framework Preset:** Next.js (detectado automaticamente)

### Passo 3: Configurar Variáveis de Ambiente

Adicione as seguintes variáveis:

```env
# URL do Backend (Railway)
NEXT_PUBLIC_API_URL=https://seu-backend.up.railway.app
```

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (2-3 minutos)
3. Vercel fornecerá uma URL (ex: `https://seu-app.vercel.app`)

### Passo 5: Atualizar CORS no Backend

No arquivo `backend/src/index.ts`, atualize o CORS:

```typescript
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://seu-app.vercel.app',  // Adicione sua URL da Vercel
    ],
    credentials: true
}));
```

Commit e push:
```bash
git add .
git commit -m "chore: atualizar CORS para produção"
git push origin master
```

### Passo 6: Atualizar URL da API no Frontend

Crie um arquivo `.env.local` no frontend (ou configure na Vercel):

```env
NEXT_PUBLIC_API_URL=https://seu-backend.up.railway.app
```

E atualize os arquivos que fazem chamadas à API para usar:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

---

## 🔧 Configurações Adicionais

### Domínio Customizado (Opcional)

#### Na Vercel:
1. Settings → Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

#### No Railway:
1. Settings → Networking → Custom Domain
2. Adicione seu domínio
3. Configure DNS

---

## 📊 Monitoramento

### Railway
- **Logs:** Veja logs em tempo real no dashboard
- **Metrics:** CPU, RAM, Network
- **Deployments:** Histórico de deploys

### Vercel
- **Analytics:** Tráfego e performance
- **Logs:** Logs de build e runtime
- **Speed Insights:** Métricas de velocidade

---

## 🐛 Solução de Problemas

### Erro: "Prisma Client not generated"
**Solução:** Adicione `postinstall` script no package.json:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Erro: "Database connection failed"
**Solução:** Verifique se DATABASE_URL está configurado corretamente

### Erro: "CORS policy"
**Solução:** Adicione a URL da Vercel no CORS do backend

### Erro: "Module not found"
**Solução:** Verifique se todas as dependências estão no package.json

---

## 📋 Checklist de Deploy

### Backend (Railway)
- [ ] PostgreSQL adicionado
- [ ] Variáveis de ambiente configuradas
- [ ] Schema do Prisma atualizado para PostgreSQL
- [ ] Build command configurado
- [ ] Domínio gerado
- [ ] Migrações executadas
- [ ] API respondendo

### Frontend (Vercel)
- [ ] Projeto importado
- [ ] Root directory configurado (frontend)
- [ ] Variável NEXT_PUBLIC_API_URL configurada
- [ ] Deploy bem-sucedido
- [ ] Site acessível
- [ ] Comunicação com backend funcionando

### Integração
- [ ] CORS configurado
- [ ] URLs atualizadas
- [ ] Testes de login funcionando
- [ ] Testes de CRUD funcionando

---

## 🚀 Deploy Automático (CI/CD)

Ambos Vercel e Railway fazem deploy automático quando você faz push para o GitHub!

```bash
# Fazer alterações
git add .
git commit -m "feat: nova funcionalidade"
git push origin master

# Vercel e Railway farão deploy automaticamente! 🎉
```

---

## 💰 Custos

### Vercel (Frontend)
- **Hobby Plan:** GRÁTIS
  - 100 GB bandwidth/mês
  - Domínio .vercel.app grátis
  - Deploy automático

### Railway (Backend)
- **Starter Plan:** $5/mês de crédito grátis
  - Depois: ~$5-20/mês dependendo do uso
  - PostgreSQL incluído
  - 500 horas de execução

**Total estimado:** $0-20/mês

---

## 📝 Próximos Passos Após Deploy

1. **Configurar Domínio Customizado**
2. **Adicionar SSL (automático na Vercel e Railway)**
3. **Configurar Backups do Banco de Dados**
4. **Adicionar Monitoramento (Sentry, LogRocket)**
5. **Configurar Email (SendGrid, Resend)**
6. **Adicionar Analytics (Google Analytics, Plausible)**

---

## 🔗 Links Úteis

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Prisma Deploy:** https://www.prisma.io/docs/guides/deployment

---

**Pronto! Seu sistema estará no ar! 🎉**
