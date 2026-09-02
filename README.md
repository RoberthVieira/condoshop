# CondoShop 🛒

Frontend do **CondoShop** — um e-commerce para mercadinhos de condomínio. Projeto desenvolvido como forma de aprendizado de integração frontend com uma API REST real.

## 🚀 Tecnologias

- **React 18** + **TypeScript** — UI e tipagem estática
- **Vite** — bundler e dev server
- **React Router DOM** — roteamento client-side
- **Tailwind CSS** — estilização utility-first
- **React Hook Form** + **Zod** — formulários com validação
- **Stripe** — redirecionamento para checkout
- **Cloudinary** — upload de imagens direto do browser

## 📁 Estrutura do projeto
src/
├── components/ # Componentes reutilizáveis (Button, Input, CardProduto...)
├── context/ # CarrinhoContext — estado global do carrinho
├── hooks/ # useAuth, useBuscaProdutos
├── layouts/ # HomeLayout, DashboardLayout
├── pages/
│ ├── dashboard/ # Páginas do morador (Home, Perfil, Carrinho, ProdutoDetalhe)
│ │ └── admin/ # Painel admin (Dashboard, Produtos, Moradores)
│ ├── Home.tsx
│ ├── Login.tsx
│ ├── About.tsx
│ ├── Sucesso.tsx
│ └── Cancelado.tsx
├── routes/ # AppRoutes.tsx — definição de todas as rotas
├── services/ # api.ts — todas as chamadas à API
├── types/ # Interfaces TypeScript
└── style/ # CSS global (Tailwind)

## 🔐 Autenticação e Rotas Protegidas

- Login salva o **token JWT** e dados do morador no `localStorage`
- `ProtectedRoute` bloqueia acesso de não autenticados
- `AdminRoute` bloqueia acesso de não admins
- Hook `useAuth` expõe `login`, `logout` e `getMorador`

## 📦 Funcionalidades

### Área do Morador
- Vitrine de produtos com busca, filtro por categoria e paginação
- Carrinho com adição, remoção e finalização via Stripe
- Perfil com resumo de compras e histórico de pedidos expansível
- Detalhe do produto com imagem, descrição, preço e estoque
- Página de sucesso/cancelamento após pagamento

### Painel Admin
- Dashboard com métricas em tempo real
- Gestão de produtos: criar, editar, desativar e reativar
- Upload de imagens direto pro Cloudinary
- Paginação na listagem de produtos
- Gestão de moradores: criar, editar e deletar

## ⚙️ Como rodar localmente

```bash
git clone https://github.com/RoberthVieira/condoshop
cd condoshop
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## 🛣️ Rotas da aplicação

| Rota | Página | Acesso |
|------|--------|--------|
| `/` | Home pública | Todos |
| `/about` | Sobre | Todos |
| `/login` | Login | Todos |
| `/dashboardlayout` | Vitrine de produtos | Morador |
| `/dashboardlayout/perfil` | Perfil e histórico | Morador |
| `/dashboardlayout/produto/:id` | Detalhe do produto | Morador |
| `/dashboardlayout/carrinho` | Carrinho | Morador |
| `/sucesso` | Confirmação de compra | Todos |
| `/cancelado` | Pagamento cancelado | Todos |
| `/admin` | Dashboard admin | Admin |
| `/admin/produtos` | Gestão de produtos | Admin |
| `/admin/moradores` | Gestão de moradores | Admin |

## 💡 Conceitos praticados

- Componentização e reutilização no React
- Roteamento com React Router DOM (layouts aninhados, rotas protegidas)
- Context API para estado global (carrinho)
- Hooks customizados (useAuth, useBuscaProdutos)
- Integração com API REST (fetch, autenticação via header)
- Formulários com React Hook Form + Zod
- Upload de arquivos para serviço externo (Cloudinary)
- Paginação e filtros reativos
- Responsividade com Tailwind CSS