# ADNV - Assembléia de Deus em Nova Vida

Este é o repositório oficial do site da **Assembléia de Deus em Nova Vida (ADNV)**. O projeto consiste em uma plataforma moderna e responsiva para gerenciar a presença digital da igreja, integrando um frontend dinâmico com um painel de administração (CMS) robusto.

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS (Gerenciamento de Conteúdo)**: [Sanity.io](https://www.sanity.io/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Navegação**: [React Router DOM](https://reactrouter.com/)
- **Analytics**: [Vercel Speed Insights](https://vercel.com/docs/analytics/speed-insights)

---

## ✨ Funcionalidades

- **Carrossel Dinâmico**: Suporte para imagens e vídeos (incluindo YouTube) gerenciados via CMS.
- **Tema Customizável**: Cores primárias, secundárias e modo de tema (claro/escuro) configuráveis diretamente pelo Sanity.
- **Gerenciamento de Unidades**: Páginas dedicadas para cada sede/congregação da igreja, com horários, eventos e links sociais.
- **Projetos de Missão**: Seção detalhada para apresentar a visão, missão e valores da organização, além de projetos específicos.
- **Rádio Online**: Widget integrado para transmissão de áudio em tempo real.
- **Configurações Gerais**: Gerenciamento Centralizado de links de redes sociais, informações de contato e SEO.

---

## 📂 Estrutura do Projeto

O repositório está dividido em duas partes principais:

- `/`: Contém o código do frontend (aplicação React).
- `/studio-adnv`: Contém a configuração do **Sanity Studio**, onde o conteúdo é gerenciado.

---

## 🛠️ Configuração Local

### Pré-requisitos
- Node.js instalado.
- Gerenciador de pacotes (npm ou yarn).

### 1. Clonar o repositório
```bash
git clone https://github.com/gabriel-chagas-albuquerque/ADNV.git
cd ADNV
```

### 2. Configurar o Frontend
Instalar dependências:
```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com as seguintes chaves (substitua pelos seus valores do Sanity):
```env
VITE_SANITY_PROJECT_ID=seu_project_id
VITE_SANITY_DATASET=production
```

Rodar em modo de desenvolvimento:
```bash
npm run dev
```

### 3. Configurar o Sanity Studio
Navegue até a pasta do studio:
```bash
cd studio-adnv
npm install
```

Rodar o Studio localmente:
```bash
npx sanity dev
```
O Studio estará disponível em `http://localhost:3333`.

---

## 🎨 Design e Estilo

O projeto utiliza um sistema de design moderno com suporte a temas, animações suaves via CSS/Framer Motion e componentes altamente reutilizáveis. As cores e tipografia foram escolhidas para transmitir a identidade visual da ADNV de forma premium e acolhedora.

## 📄 Licença

Este projeto é de uso restrito à Assembléia de Deus em Nova Vida.
