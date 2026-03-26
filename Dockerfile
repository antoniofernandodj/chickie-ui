# Stage 1: Build
FROM node:22-alpine AS build

# Corepack é a forma recomendada e segura de gerenciar o npm em containers Node.js recentes
RUN corepack enable && corepack prepare npm@latest --activate

WORKDIR /app

# Instala as dependências separadamente para aproveitar o cache do Docker
COPY package*.json ./
RUN npm ci

# Copia o restante dos arquivos e executa o build de produção
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Runtime
FROM node:22-alpine AS runner

WORKDIR /app

# Define ambiente de produção
ENV NODE_ENV=production
ENV PORT=4000

# Copia apenas os arquivos necessários do estágio de build
# O Angular SSR moderno gera a saída em dist/Chickie-ui
COPY --from=build /app/dist/Chickie-ui ./dist/Chickie-ui

# Porta padrão do Angular SSR
EXPOSE 4000

# Comando para iniciar o servidor SSR
# Referenciando o script definido no package.json ou o caminho direto
CMD ["node", "dist/Chickie-ui/server/server.mjs"]
