# 🚀 Sistema de Gestão de Marketing Digital e Vendas

Sistema completo para gerenciamento de campanhas de marketing digital, CRM de leads e integração com WhatsApp Business.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)

## 📋 Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre

Sistema integrado para gestão de marketing digital e vendas, desenvolvido com as melhores práticas e tecnologias modernas. Totalmente localizado para o Brasil com suporte a validações de CPF/CNPJ, máscaras de formatação e timezone de São Paulo.

### Principais Características

✅ **100% em Português do Brasil**  
✅ **Validações Brasileiras** (CPF, CNPJ, Telefone)  
✅ **Máscaras Automáticas** de formatação  
✅ **Timezone America/Sao_Paulo**  
✅ **Design Moderno** com Dark Mode  
✅ **Responsivo** para todos os dispositivos  

## ✨ Funcionalidades

### 📊 Gestão de Campanhas
- Integração com Google Ads e Meta Ads
- Criação e gerenciamento de campanhas
- Monitoramento de performance
- Relatórios detalhados

### 👥 CRM de Leads
- Kanban visual para gestão de leads
- Funil de vendas customizável
- Histórico de interações
- Atribuição de leads a vendedores

### 💬 WhatsApp Business
- Integração com WhatsApp Business API
- Envio de mensagens automatizadas
- Templates de mensagens
- Análise de conversas

### 📈 Relatórios e Analytics
- Dashboard com métricas em tempo real
- Gráficos interativos
- Exportação de dados
- Análise de ROI

### 🔐 Autenticação e Segurança
- Sistema de login com JWT
- Validação de dados no frontend e backend
- Proteção contra ataques comuns
- Controle de acesso por roles

## 🛠️ Tecnologias

### Frontend
- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS 4** - Estilização
- **React Query** - Gerenciamento de estado
- **Lucide React** - Ícones

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **Prisma** - ORM
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

### Ferramentas
- **Git** - Controle de versão
- **ESLint** - Linting
- **Prettier** - Formatação de código

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn
- Git

### 1. Clone o repositório

```bash
git clone git@github.com:arsdatascience/marketing_sales_system.git
cd marketing_sales_system
```

### 2. Instale as dependências do Backend

```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### 4. Execute as migrações do banco de dados

```bash
npx prisma generate
npx prisma db push
```

### 5. Instale as dependências do Frontend

```bash
cd ../frontend
npm install
```

## 🚀 Uso

### Desenvolvimento

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
O servidor estará rodando em `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
O aplicativo estará rodando em `http://localhost:3000`

### Produção

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
marketing-sales-system/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Schema do banco de dados
│   ├── src/
│   │   ├── config/                # Configurações
│   │   ├── controllers/           # Controllers da API
│   │   ├── middleware/            # Middlewares
│   │   ├── routes/                # Rotas da API
│   │   ├── services/              # Lógica de negócio
│   │   └── index.ts               # Entry point
│   ├── .env.example               # Exemplo de variáveis de ambiente
│   └── package.json
│
├── frontend/
│   ├── public/                    # Arquivos estáticos
│   ├── src/
│   │   ├── app/                   # Pages (Next.js App Router)
│   │   ├── components/            # Componentes React
│   │   │   ├── auth/              # Componentes de autenticação
│   │   │   ├── campaigns/         # Componentes de campanhas
│   │   │   ├── layout/            # Layout (Sidebar, Header)
│   │   │   ├── leads/             # Componentes de leads
│   │   │   └── ui/                # Componentes UI reutilizáveis
│   │   ├── lib/                   # Utilitários
│   │   │   ├── formatters.ts      # Formatação (moeda, data)
│   │   │   ├── masks.ts           # Máscaras (CPF, telefone)
│   │   │   ├── messages.ts        # Mensagens de erro/sucesso
│   │   │   ├── utils.ts           # Funções auxiliares
│   │   │   └── validators.ts      # Validações (CPF, CNPJ)
│   │   └── types/                 # Tipos TypeScript
│   └── package.json
│
├── LOCALIZACAO_BRASILEIRA.md     # Documentação de localização
├── GITHUB_SETUP.md                # Guia de setup do GitHub
└── README.md                      # Este arquivo
```

## 📚 Documentação

- [Localização Brasileira](./LOCALIZACAO_BRASILEIRA.md) - Validações, máscaras e formatações
- [Setup do GitHub](./GITHUB_SETUP.md) - Como subir o projeto para o GitHub

### Exemplos de Uso

#### Validação de CPF
```typescript
import { validateCPF } from '@/lib/validators';

if (!validateCPF('123.456.789-00')) {
    console.log('CPF inválido');
}
```

#### Input com Máscara de Telefone
```tsx
<MaskedInput 
    maskType="phone"
    placeholder="(11) 98765-4321"
    onValueChange={(value) => setTelefone(value)}
/>
```

#### Formatação de Moeda
```typescript
import { formatCurrency } from '@/lib/formatters';

console.log(formatCurrency(1500.50)); 
// Output: R$ 1.500,50
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrão de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **ARS Data Science** - [GitHub](https://github.com/arsdatascience)

## 🙏 Agradecimentos

- Next.js Team
- Prisma Team
- Comunidade Open Source

---

**Desenvolvido com ❤️ no Brasil 🇧🇷**
