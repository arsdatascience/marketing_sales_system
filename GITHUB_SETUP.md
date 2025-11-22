# 🚀 Guia: Como Subir o Projeto para o GitHub

## 📋 Pré-requisitos

✅ Git instalado
✅ Repositório criado no GitHub: `git@github.com:arsdatascience/marketing_sales_system.git`
✅ Chave SSH configurada no GitHub (ou usar HTTPS)

---

## 🔧 Passo a Passo

### 1️⃣ Adicionar o Remote do GitHub

```powershell
git remote add origin git@github.com:arsdatascience/marketing_sales_system.git
```

**Verificar se foi adicionado:**
```powershell
git remote -v
```

---

### 2️⃣ Adicionar Todos os Arquivos ao Stage

```powershell
git add .
```

**Verificar o que será commitado:**
```powershell
git status
```

---

### 3️⃣ Fazer o Primeiro Commit

```powershell
git commit -m "feat: Initial commit - Sistema de Gestão de Marketing e Vendas

- Implementação completa do frontend (Next.js + TailwindCSS)
- Implementação completa do backend (Node.js + Express + Prisma)
- Sistema de autenticação com JWT
- CRUD de Campanhas (Google Ads, Meta Ads)
- CRUD de Leads com Kanban
- Integração WhatsApp Business
- Localização completa em PT-BR
- Validações brasileiras (CPF, CNPJ, Telefone)
- Máscaras de formatação
- Timezone America/Sao_Paulo
- Mensagens de erro em português
- Design moderno com dark mode"
```

---

### 4️⃣ Enviar para o GitHub

```powershell
git push -u origin master
```

**Ou se o branch principal for `main`:**
```powershell
git branch -M main
git push -u origin main
```

---

## 🔐 Alternativa: Usar HTTPS em vez de SSH

Se você não tiver a chave SSH configurada, pode usar HTTPS:

```powershell
git remote remove origin
git remote add origin https://github.com/arsdatascience/marketing_sales_system.git
git push -u origin master
```

---

## 📝 Comandos Úteis

### Ver histórico de commits
```powershell
git log --oneline
```

### Ver branches
```powershell
git branch -a
```

### Criar um novo branch
```powershell
git checkout -b develop
```

### Atualizar do GitHub
```powershell
git pull origin master
```

---

## 🎯 Estrutura de Commits Recomendada

Para commits futuros, use o padrão Conventional Commits:

```
feat: adiciona nova funcionalidade
fix: corrige um bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona testes
chore: tarefas de manutenção
```

**Exemplos:**
```powershell
git commit -m "feat: adiciona validação de CNPJ"
git commit -m "fix: corrige formatação de moeda"
git commit -m "docs: atualiza README com instruções de instalação"
```

---

## 📂 Arquivos Importantes no Repositório

Certifique-se de que estes arquivos estão incluídos:

### Backend:
- ✅ `backend/package.json`
- ✅ `backend/src/`
- ✅ `backend/prisma/schema.prisma`
- ✅ `backend/.env.example` (criar este arquivo!)
- ✅ `backend/.gitignore`

### Frontend:
- ✅ `frontend/package.json`
- ✅ `frontend/src/`
- ✅ `frontend/public/`
- ✅ `frontend/.gitignore`

### Documentação:
- ✅ `README.md`
- ✅ `LOCALIZACAO_BRASILEIRA.md`

---

## ⚠️ IMPORTANTE: Criar .env.example

**Nunca commite o arquivo `.env` com dados sensíveis!**

Crie um arquivo `.env.example` no backend:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="your-secret-key-here"

# Server
PORT=3001

# Timezone
TZ=America/Sao_Paulo

# APIs (opcional)
GOOGLE_ADS_CLIENT_ID=""
GOOGLE_ADS_CLIENT_SECRET=""
META_ADS_ACCESS_TOKEN=""
WHATSAPP_API_TOKEN=""
```

---

## 🌿 Estratégia de Branches Recomendada

```
master/main     → Produção (código estável)
develop         → Desenvolvimento (próxima versão)
feature/xxx     → Novas funcionalidades
fix/xxx         → Correções de bugs
hotfix/xxx      → Correções urgentes em produção
```

**Criar branch de desenvolvimento:**
```powershell
git checkout -b develop
git push -u origin develop
```

---

## 📋 Checklist Antes do Push

- [ ] Remover arquivos sensíveis (.env)
- [ ] Verificar .gitignore
- [ ] Testar se o código compila
- [ ] Atualizar README.md
- [ ] Criar .env.example
- [ ] Verificar se node_modules está no .gitignore
- [ ] Verificar se dev.db está no .gitignore

---

## 🚨 Solução de Problemas

### Erro: "Permission denied (publickey)"
**Solução:** Configure sua chave SSH ou use HTTPS

### Erro: "Updates were rejected"
**Solução:** 
```powershell
git pull origin master --rebase
git push origin master
```

### Erro: "fatal: remote origin already exists"
**Solução:**
```powershell
git remote remove origin
git remote add origin git@github.com:arsdatascience/marketing_sales_system.git
```

---

## 📖 Próximos Passos Após o Push

1. **Configurar GitHub Actions** (CI/CD)
2. **Adicionar badges ao README**
3. **Configurar proteção de branches**
4. **Adicionar colaboradores**
5. **Criar Issues e Projects**

---

**Pronto! Seu código estará no GitHub! 🎉**
