# 🔐 Guia: Configurar Chave SSH para GitHub

## 📋 Opção 1: Criar Chave SSH (Recomendado)

### Passo 1: Verificar se já existe uma chave SSH

```powershell
ls ~/.ssh
```

Se você ver arquivos como `id_rsa.pub` ou `id_ed25519.pub`, você já tem uma chave SSH.

---

### Passo 2: Criar uma nova chave SSH

```powershell
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"
```

**Substitua** `seu-email@exemplo.com` pelo email da sua conta do GitHub.

**Durante o processo:**
1. Pressione **Enter** para aceitar o local padrão
2. Digite uma senha (ou deixe em branco)
3. Confirme a senha

---

### Passo 3: Copiar a chave pública

```powershell
cat ~/.ssh/id_ed25519.pub
```

**OU** use este comando para copiar direto para a área de transferência:

```powershell
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
```

A chave começa com `ssh-ed25519` e termina com seu email.

---

### Passo 4: Adicionar a chave no GitHub

1. Acesse: https://github.com/settings/keys
2. Clique em **"New SSH key"**
3. **Title:** Digite um nome (ex: "Meu PC - Windows")
4. **Key type:** Authentication Key
5. **Key:** Cole a chave pública que você copiou
6. Clique em **"Add SSH key"**

---

### Passo 5: Testar a conexão

```powershell
ssh -T git@github.com
```

Você deve ver:
```
Hi arsdatascience! You've successfully authenticated, but GitHub does not provide shell access.
```

---

### Passo 6: Fazer o push

```powershell
git push -u origin master
```

---

## 📋 Opção 2: Usar HTTPS (Mais Simples)

Se você preferir não configurar SSH, use HTTPS:

### Passo 1: Remover o remote SSH

```powershell
git remote remove origin
```

### Passo 2: Adicionar remote HTTPS

```powershell
git remote add origin https://github.com/arsdatascience/marketing_sales_system.git
```

### Passo 3: Fazer o push

```powershell
git push -u origin master
```

O GitHub pedirá:
- **Username:** seu usuário do GitHub
- **Password:** use um **Personal Access Token** (não sua senha)

---

## 🔑 Como Criar um Personal Access Token (PAT)

### Passo 1: Acessar configurações do GitHub

1. Vá para: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**

### Passo 2: Configurar o token

- **Note:** "Token para marketing_sales_system"
- **Expiration:** 90 days (ou No expiration)
- **Scopes:** Marque:
  - ✅ `repo` (acesso completo a repositórios)
  - ✅ `workflow` (se usar GitHub Actions)

### Passo 3: Gerar e copiar

1. Clique em **"Generate token"**
2. **COPIE O TOKEN** (você não verá ele novamente!)
3. Use este token como senha ao fazer push

---

## 🚀 Comandos Completos - Opção HTTPS

```powershell
# 1. Remover remote SSH
git remote remove origin

# 2. Adicionar remote HTTPS
git remote add origin https://github.com/arsdatascience/marketing_sales_system.git

# 3. Fazer o push
git push -u origin master
```

Quando pedir credenciais:
- **Username:** `arsdatascience`
- **Password:** Cole o Personal Access Token

---

## 🔧 Solução de Problemas

### Erro: "Permission denied (publickey)"
**Solução:** Use HTTPS ou configure a chave SSH corretamente

### Erro: "Authentication failed"
**Solução:** Use um Personal Access Token, não sua senha

### Erro: "Could not read from remote repository"
**Solução:** Verifique se o repositório existe e você tem acesso

---

## 💡 Qual Opção Escolher?

### Use SSH se:
- ✅ Você faz push/pull frequentemente
- ✅ Não quer digitar credenciais toda vez
- ✅ Trabalha com múltiplos repositórios

### Use HTTPS se:
- ✅ É sua primeira vez configurando
- ✅ Quer algo mais simples
- ✅ Está atrás de um firewall que bloqueia SSH

---

## 📝 Resumo Rápido

### Para SSH:
```powershell
# 1. Criar chave
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"

# 2. Copiar chave
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

# 3. Adicionar no GitHub (https://github.com/settings/keys)

# 4. Testar
ssh -T git@github.com

# 5. Push
git push -u origin master
```

### Para HTTPS:
```powershell
# 1. Mudar para HTTPS
git remote remove origin
git remote add origin https://github.com/arsdatascience/marketing_sales_system.git

# 2. Criar token (https://github.com/settings/tokens)

# 3. Push (usar token como senha)
git push -u origin master
```

---

**Escolha a opção que preferir e siga os passos! 🚀**
