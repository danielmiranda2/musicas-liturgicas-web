# Planejamento Musical Litúrgico 2026

Uma aplicação web interativa e elegante para gerenciar o planejamento de músicas nos períodos litúrgicos de **Epifania**, **Quaresma** e **Páscoa** de 2026.

## 🎵 Características

### Visualização Interativa
- **Design Minimalista Sacro**: Inspirado em manuscritos iluminados e vitrais
- **Filtros por Período**: Visualize facilmente Epifania, Quaresma ou Páscoa
- **Busca Inteligente**: Procure por nome de música
- **Cards Responsivos**: Interface elegante que funciona em desktop, tablet e mobile
- **Paleta Litúrgica**: Cores roxo/dourado que refletem a natureza sagrada do conteúdo

### Gerenciamento de Dados
- **Adicionar Músicas**: Crie novos registros com data, período, músicas e ênfase teológica
- **Editar Músicas**: Modifique qualquer informação de um registro existente
- **Deletar Músicas**: Remova registros com confirmação de segurança
- **Restaurar Padrão**: Volte aos dados originais com um clique
- **Persistência Local**: Todas as alterações são salvas automaticamente no navegador

### Estatísticas em Tempo Real
- Contagem dinâmica de domingos por período
- Atualização automática conforme você edita os dados

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação

```bash
# Clone ou extraia o projeto
cd musicas-liturgicas-web

# Instale as dependências
pnpm install
# ou
npm install

# Inicie o servidor de desenvolvimento
pnpm run dev
# ou
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
musicas-liturgicas-web/
├── client/
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/         # Componentes shadcn/ui
│   │   │   ├── EditMusicDialog.tsx    # Diálogo de edição
│   │   │   └── AddMusicDialog.tsx     # Diálogo de adição
│   │   ├── hooks/
│   │   │   └── useMusicasData.ts      # Hook de gerenciamento de dados
│   │   ├── pages/
│   │   │   ├── Home.tsx    # Página principal
│   │   │   └── NotFound.tsx
│   │   ├── contexts/       # Contextos React
│   │   ├── index.css       # Estilos globais com tema litúrgico
│   │   ├── App.tsx         # Componente raiz
│   │   └── main.tsx        # Ponto de entrada
│   └── index.html          # Template HTML
├── server/                 # Configuração do servidor (placeholder)
├── shared/                 # Tipos compartilhados
├── package.json            # Dependências do projeto
├── vite.config.ts          # Configuração do Vite
├── tsconfig.json           # Configuração TypeScript
└── README.md               # Este arquivo
```

## 🎨 Design e Tecnologia

### Stack Tecnológico
- **React 19**: Framework de UI moderna
- **TypeScript**: Type safety e melhor experiência de desenvolvimento
- **Tailwind CSS 4**: Utilitários CSS para estilização rápida
- **shadcn/ui**: Componentes de alta qualidade e acessibilidade
- **Vite**: Build tool rápido e moderno
- **Wouter**: Roteamento leve para React

### Fontes Tipográficas
- **Playfair Display**: Serifada elegante para títulos (Google Fonts)
- **Inter**: Sans-serif limpa para corpo de texto (Google Fonts)

### Paleta de Cores Litúrgica
- **Epifania**: Âmbar/Dourado (manifestação divina)
- **Quaresma**: Roxo/Violeta (reflexão e penitência)
- **Páscoa**: Amarelo/Branco (ressurreição e vitória)

## 💾 Persistência de Dados

Os dados são salvos automaticamente no **localStorage** do navegador:
- Todas as edições, adições e exclusões são persistidas
- Os dados permanecem salvos mesmo após fechar o navegador
- Use o botão "Restaurar" para voltar aos dados originais a qualquer momento

**Localização**: `localStorage.getItem('musicas-liturgicas-2026')`

## 🔧 Funcionalidades Detalhadas

### Adicionar Música
1. Clique no botão **"+ Adicionar"** no topo
2. Preencha os campos obrigatórios (data e primeira música)
3. Adicione as demais músicas e ênfase teológica
4. Clique em "Adicionar Música"

### Editar Música
1. Passe o mouse sobre um card de música
2. Clique no ícone de **lápis** (editar)
3. Modifique os campos desejados
4. Clique em "Salvar Alterações"

### Deletar Música
1. Passe o mouse sobre um card de música
2. Clique no ícone de **lixeira** (deletar)
3. Confirme a remoção no diálogo de confirmação

### Filtrar e Buscar
- Use as **abas** no topo para filtrar por período litúrgico
- Use a **barra de busca** para procurar por nome de música ou ênfase teológica
- Os filtros funcionam em conjunto

## 📊 Dados Inclusos

O projeto inclui 12 domingos pré-configurados:

| Período | Datas | Quantidade |
|---------|-------|-----------|
| **Epifania** | 08/02 - 15/02 | 2 domingos |
| **Quaresma** | 22/02 - 29/03 | 6 semanas |
| **Páscoa** | 05/04 - 26/04 | 4 domingos |

Cada domingo inclui:
- Data
- Período litúrgico
- 3 músicas tradicionais
- 1 música nova
- Ênfase teológica do dia

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
pnpm run dev

# Faz build para produção
pnpm run build

# Visualiza a build de produção localmente
pnpm run preview

# Verifica tipos TypeScript
pnpm run check

# Formata o código com Prettier
pnpm run format
```

### Adicionando Novos Componentes

Para adicionar novos componentes shadcn/ui:

```bash
npx shadcn-ui@latest add [component-name]
```

### Estendendo o Projeto

1. **Novos períodos litúrgicos**: Adicione entradas em `periodConfig` em `Home.tsx`
2. **Novos campos de dados**: Atualize a interface `MusicData` em `useMusicasData.ts`
3. **Novos diálogos**: Crie componentes seguindo o padrão de `EditMusicDialog.tsx`

## 📱 Responsividade

O projeto é totalmente responsivo:
- **Mobile**: Layout em coluna única, touch-friendly
- **Tablet**: Grid 2 colunas
- **Desktop**: Grid 3 colunas com hover effects

## ♿ Acessibilidade

- Componentes shadcn/ui com suporte ARIA
- Navegação por teclado completa
- Contraste de cores adequado
- Textos descritivos em todos os botões

## 🚢 Deploy

### Opção 1: Manus (Recomendado)
O projeto está pronto para deploy na plataforma Manus com suporte a domínios customizados.

### Opção 2: Vercel
```bash
npm install -g vercel
vercel
```

### Opção 3: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Opção 4: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 📝 Licença

Este projeto é fornecido como está para uso pessoal e educacional.

## 🤝 Contribuições

Sugestões de melhorias:
- Exportar dados como Excel/PDF
- Histórico de alterações com undo/redo
- Visualização em calendário mensal
- Sincronização com Google Calendar
- Modo dark/light theme

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se todas as dependências foram instaladas: `pnpm install`
2. Limpe o cache: `rm -rf node_modules && pnpm install`
3. Reinicie o servidor: `pnpm run dev`

## 🎯 Próximos Passos

1. **Personalizar cores**: Edite as variáveis CSS em `client/src/index.css`
2. **Adicionar mais períodos**: Estenda `periodConfig` em `Home.tsx`
3. **Integrar com backend**: Atualize `useMusicasData.ts` para usar API
4. **Adicionar autenticação**: Implemente login para múltiplos usuários

---

**Desenvolvido com ❤️ para o planejamento musical litúrgico**

Última atualização: Fevereiro de 2026
