# 🐔 Chickie API

API REST para sistema de pedidos e entregas de comida, construída em **Rust** com **Axum**.

[![Rust](https://img.shields.io/badge/Rust-1.88-orange.svg)](https://www.rust-lang.org/)
[![Axum](https://img.shields.io/badge/Axum-0.8-blue.svg)](https://github.com/tokio-rs/axum)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 📋 Visão Geral

Chickie é um sistema de delivery que permite:

- 🏪 Lojas (tenants) gerenciarem seus catálogos, produtos e equipes
- 🛒 Clientes navegarem catálogos, montarem pedidos com partes personalizáveis (ex: pizza meio-a-meio) e aplicarem cupons de desconto
- 🛵 Entregadores serem atribuídos a pedidos para entrega
- ⭐ Avaliações de lojas e produtos por clientes autenticados
- 🎫 Cupons de desconto e promoções por dia da semana

---

## 🚀 Quick Start

### Pré-requisitos

- **Rust 1.88+** (edição 2024)
- **PostgreSQL 15+**
- **Docker** (opcional, para rodar o banco localmente)

### Rodando Localmente

1. **Clone o repositório:**
   ```bash
   git clone <repo-url>
   cd chickie-api
   ```

2. **Suba o banco de dados (Docker):**
   ```bash
   docker compose up -d
   ```

3. **Configure o banco:**
   ```bash
   export DATABASE_URL="postgres://myuser:mypassword@localhost:5432/mydatabase"
   sqlx migrate run
   ```

4. **Rode a API:**
   ```bash
   cargo run
   ```

   A API estará disponível em `http://localhost:3000`.

### Build de Produção

```bash
cargo build --release
```

Ou via Docker:

```bash
docker build -t chickie .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgres://..." \
  chickie
```

---

## 📚 Documentação da API

### Swagger / OpenAPI

A API possui documentação interativa via Swagger/OpenAPI com todos os 58+ endpoints documentados.

- **Swagger UI:** `http://localhost:3000/proto/docs/swagger-ui`
- **OpenAPI JSON:** `http://localhost:3000/proto/docs/openapi.json`

**Recursos:**
- Documentação completa de todos os endpoints com request/response schemas
- Teste de requisições e respostas diretamente pelo navegador
- Suporte a autenticação JWT: clique no cadeado no topo da página para inserir seu token
- Explore schemas de todos os models (Usuario, Loja, Pedido, Produto, etc.)

---

## 📡 Endpoints da API

Todos os endpoints vivem sob `/api`.

### Autenticação (sem auth)

| Método | Rota              | Descrição        | Auth | Classe |
|--------|-------------------|------------------|------|--------|
| `POST` | `/proto/auth/signup`| Cadastro de usuário | ❌  | — |
| `POST` | `/proto/auth/login` | Login (gera JWT)    | ❌  | — |
| `GET`  | `/proto/auth/me`    | Usuário autenticado | ✅  | — |

> **Bloqueio:** Usuários com `bloqueado = true` são rejeitados no login e no middleware JWT.

### Sistema de Permissões

| Extractor | Permissão | Uso |
|-----------|-----------|-----|
| `AdminPermission` | `classe = "administrador"` | Criar lojas, funcionários, entregadores |
| `OwnerPermission` | `classe = "owner"` OU `email == OWNER_EMAIL` | God mode — acesso total |

**Variável de ambiente:** `OWNER_EMAIL=seu@email.com`

### Usuários (auth required, Owner para maioria)

| Método  | Rota            | Descrição        | Auth |
|---------|-----------------|------------------|------|
| `GET`   | `/proto/usuarios/?classe=...` | Listar usuários (Owner). Query opcional: `?classe=cliente\|administrador` | ✅ Owner |
| `PATCH` | `/proto/usuarios/{uuid}/marcar-remocao` | Marcar para remoção | ✅ Self/Owner |
| `PATCH` | `/proto/usuarios/{uuid}/desmarcar-remocao` | Desmarcar remoção | ✅ Self/Owner |
| `PUT`   | `/proto/usuarios/{uuid}/ativo` | Ativar/desativar | ✅ Owner |
| `PATCH` | `/proto/usuarios/{uuid}/bloqueado` | Toggle bloqueio | ✅ Owner |

### Lojas Públicas

| Método  | Rota               | Descrição           | Auth |
|---------|--------------------|---------------------|------|
| `GET`   | `/proto/lojas/`      | Listar lojas        | ❌   |
| `GET`   | `/proto/lojas/pesquisar` | Pesquisar lojas | ❌   |
| `GET`   | `/proto/lojas/{uuid}` | Buscar loja por UUID | ❌   |
| `GET`   | `/proto/lojas/slug/{slug}` | Buscar loja por Slug | ❌   |

### Administração (auth required, apenas admin)

| Método  | Rota                                     | Descrição            | Auth | Classe |
|---------|------------------------------------------|----------------------|------|--------|
| `POST`  | `/proto/admin/lojas`                       | Criar loja           | ✅   | Admin  |
| `GET`   | `/proto/admin/lojas/listar`                | Listar todas as lojas| ✅   | Admin  |
| `GET`   | `/proto/admin/lojas/minhas-lojas`          | Listar lojas do admin| ✅   | Admin  |
| `POST`  | `/proto/admin/lojas/{loja_uuid}/funcionarios` | Adicionar funcionário | ✅ | Admin |
| `POST`  | `/proto/admin/lojas/{loja_uuid}/entregadores` | Adicionar entregador | ✅  | Admin  |
| `POST`  | `/proto/admin/lojas/{loja_uuid}/clientes`  | Adicionar cliente    | ✅   | Admin  |

### Produtos (auth required)

| Método | Rota                | Descrição           | Auth |
|--------|---------------------|---------------------|------|
| `POST` | `/proto/produtos/`    | Criar produto       | ✅   |
| `GET`  | `/proto/produtos/`    | Listar produtos     | ✅   |
| `GET`  | `/proto/produtos/categoria/{categoria_uuid}` | Listar produtos por categoria | ✅ |
| `GET`  | `/proto/produtos/{uuid}` | Buscar produto por UUID | ✅ |
| `PUT`  | `/proto/produtos/{uuid}` | Atualizar produto | ✅   |
| `DELETE` | `/proto/produtos/{uuid}` | Deletar produto | ✅ |
| `PUT` | `/proto/produtos/{loja_uuid}/{produto_uuid}/disponibilidade` | Atualizar disponibilidade | ✅ |
| `POST` | `/proto/produtos/{uuid}/imagem` | Subir imagem do produto (S3) | ✅ |

### Horários de Funcionamento (auth required)

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `GET` | `/proto/horarios/{loja_uuid}` | Listar horários | ✅ |
| `POST` | `/proto/horarios/{loja_uuid}` | Criar ou atualizar horário | ✅ |
| `PUT` | `/proto/horarios/{loja_uuid}/dia/{dia_semana}/ativo` | Ativar/desativar dia | ✅ |
| `DELETE` | `/proto/horarios/{loja_uuid}/dia/{dia_semana}` | Deletar horário do dia | ✅ |

### Configurações de Pedido (auth required)

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `GET` | `/proto/config-pedido/{loja_uuid}` | Buscar configuração | ✅ |
| `PUT` | `/proto/config-pedido/{loja_uuid}` | Salvar configuração | ✅ |

### Cupons Admin (auth required)

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `PUT` | `/proto/cupons/admin/{loja_uuid}/{uuid}` | Atualizar cupom | ✅ |
| `DELETE` | `/proto/cupons/admin/{loja_uuid}/{uuid}` | Deletar cupom | ✅ |

### Ingredientes (auth required)

| Método | Rota                                     | Descrição          | Auth |
|--------|------------------------------------------|--------------------|------|
| `POST` | `/proto/ingredientes/{loja_uuid}`          | Criar ingrediente  | ✅   |
| `GET`  | `/proto/ingredientes/{loja_uuid}`          | Listar ingredientes| ✅   |
| `PUT`  | `/proto/ingredientes/{loja_uuid}/{uuid}`   | Atualizar ingrediente | ✅ |
| `DELETE`| `/proto/ingredientes/{loja_uuid}/{uuid}`  | Deletar ingrediente| ✅   |

### Funcionários (auth required)

| Método | Rota                                                    | Descrição                | Auth |
|--------|---------------------------------------------------------|--------------------------|------|
| `GET`  | `/proto/funcionarios/{loja_uuid}`                         | Listar funcionários      | ✅   |
| `PUT`  | `/proto/funcionarios/{loja_uuid}/{uuid}`                  | Atualizar funcionário    | ✅   |
| `PUT`  | `/proto/funcionarios/{loja_uuid}/usuarios/{usuario_uuid}/credenciais` | Trocar email/senha | ✅   |

### Entregadores (auth required)

| Método | Rota                                                    | Descrição                | Auth |
|--------|---------------------------------------------------------|--------------------------|------|
| `GET`  | `/proto/entregadores/{loja_uuid}`                         | Listar entregadores      | ✅   |
| `PUT`  | `/proto/entregadores/{loja_uuid}/{uuid}`                  | Atualizar entregador     | ✅   |
| `PUT`  | `/proto/entregadores/{loja_uuid}/usuarios/{usuario_uuid}/credenciais` | Trocar email/senha | ✅   |

### Catálogo (auth required)

| Método | Rota                                     | Descrição              | Auth |
|--------|------------------------------------------|------------------------|------|
| `POST` | `/proto/catalogo/{loja_uuid}/adicionais`   | Criar adicional        | ✅   |
| `GET`  | `/proto/catalogo/{loja_uuid}/adicionais`   | Listar todos adicionais| ✅   |
| `GET`  | `/proto/catalogo/{loja_uuid}/adicionais/disponiveis` | Listar disponíveis | ✅ |
| `PUT`  | `/proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}` | Atualizar adicional | ✅ |
| `PUT`  | `/proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}/disponibilidade` | Atualizar disponibilidade | ✅ |
| `DELETE` | `/proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}` | Deletar adicional | ✅ |
| `POST` | `/proto/catalogo/{loja_uuid}/categorias`   | Criar categoria        | ✅   |
| `GET`  | `/proto/catalogo/{loja_uuid}/categorias`   | Listar categorias      | ✅   |
| `PUT`  | `/proto/catalogo/{loja_uuid}/categorias/{uuid}` | Atualizar categoria | ✅ |
| `DELETE` | `/proto/catalogo/{loja_uuid}/categorias/{uuid}` | Deletar categoria (só se vazia) | ✅ |

### Pedidos (auth required)

| Método | Rota                | Descrição           | Auth |
|--------|---------------------|---------------------|------|
| `POST` | `/proto/pedidos/criar` | Criar pedido (`loja_uuid` no body) | ✅ |
| `GET`  | `/proto/pedidos/listar` | Listar todos pedidos | ✅   |
| `GET`  | `/proto/pedidos/meus` | Listar meus pedidos | ✅ |
| `GET`  | `/proto/pedidos/por-loja/{loja_uuid}` | Listar por loja | ✅ |
| `GET`  | `/proto/pedidos/{uuid}` | Buscar pedido     | ✅   |
| `GET`  | `/proto/pedidos/{uuid}/com-entrega` | Pedido com endereço | ✅ |
| `PUT`  | `/proto/pedidos/{uuid}/status` | Avançar status | ✅ |
| `PUT`  | `/proto/pedidos/{pedido_uuid}/entregador/{loja_uuid}` | Atribuir entregador | ✅ |
| `DELETE` | `/proto/pedidos/{pedido_uuid}/entregador/{loja_uuid}` | Remover entregador | ✅ |
| `GET`  | `/proto/pedidos/{uuid}/com-entregador` | Pedido com entregador | ✅ |

### Cupons & Avaliações

| Método | Rota                                    | Descrição              | Auth |
|--------|-----------------------------------------|------------------------|------|
| `POST` | `/proto/marketing/{loja_uuid}/cupons`     | Criar cupom            | ✅   |
| `GET`  | `/proto/marketing/cupons`                 | Listar cupons da loja  | ✅   |
| `GET`  | `/proto/marketing/cupons/{codigo}`        | Validar cupom          | ❌   |
| `POST` | `/proto/marketing/{loja_uuid}/avaliar-loja` | Avaliar loja         | ✅   |
| `POST` | `/proto/marketing/{loja_uuid}/avaliar-produto` | Avaliar produto   | ✅   |
| `POST` | `/proto/marketing/{loja_uuid}/promocoes`  | Criar promoção (escopo: loja, produto ou categoria) | ✅   |
| `GET`  | `/proto/marketing/{loja_uuid}/promocoes`  | Listar promoções     | ✅   |
| `PUT`  | `/proto/marketing/{loja_uuid}/promocoes/{uuid}` | Atualizar promoção | ✅ |
| `DELETE` | `/proto/marketing/{loja_uuid}/promocoes/{uuid}` | Deletar promoção | ✅ |

### Endereços de Entrega (auth required)

| Método | Rota                                                | Descrição              | Auth |
|--------|-----------------------------------------------------|------------------------|------|
| `POST` | `/proto/enderecos-entrega/{pedido_uuid}/{loja_uuid}` | Criar endereço para pedido | ✅ |
| `GET`  | `/proto/enderecos-entrega/{pedido_uuid}`             | Buscar endereço do pedido  | ✅ |

### Endereços de Usuário (auth required)

| Método | Rota                            | Descrição              | Auth |
|--------|---------------------------------|------------------------|------|
| `POST` | `/proto/enderecos-usuario/`       | Criar endereço         | ✅   |
| `GET`  | `/proto/enderecos-usuario/`       | Listar endereços       | ✅   |
| `GET`  | `/proto/enderecos-usuario/{uuid}` | Buscar endereço        | ✅   |
| `PUT`  | `/proto/enderecos-usuario/{uuid}` | Atualizar endereço     | ✅   |
| `DELETE`| `/proto/enderecos-usuario/{uuid}`| Deletar endereço       | ✅   |

### Lojas Favoritas (auth required)

| Método | Rota                            | Descrição              | Auth |
|--------|---------------------------------|------------------------|------|
| `POST` | `/proto/favoritos/{loja_uuid}`    | Adicionar às favoritas | ✅   |
| `DELETE` | `/proto/favoritos/{loja_uuid}`  | Remover das favoritas  | ✅   |
| `GET`  | `/proto/favoritos/minhas`         | Listar minhas favoritas| ✅   |
| `GET`  | `/proto/favoritos/{loja_uuid}/verificar` | Verificar se é favorita | ✅ |

### Administração

| Método   | Rota         | Descrição                      | Auth |
|----------|--------------|--------------------------------|------|
| `DELETE` | `/proto/wipe`  | ⚠️ Limpar todo o banco (dev)  | ❌   |

> **⚠️ O endpoint `/proto/wipe` é apenas para desenvolvimento. Deve ser removido antes do deploy em produção.**

---

## 🏗️ Arquitetura

### Camadas

```
┌─────────────────────────────────────────┐
│         API Layer (Axum Handlers)       │  ← Rotas, DTOs, validação
├─────────────────────────────────────────┤
│       Use Case Layer                    │  ← Casos de uso orquestradores
├─────────────────────────────────────────┤
│       Service Layer                     │  ← Regras de negócio
├─────────────────────────────────────────┤
│    Repository Layer (sqlx)              │  ← Acesso ao banco
├─────────────────────────────────────────┤
│       Domain Layer (models)             │  ← Entidades, value objects
└─────────────────────────────────────────┘
```

### Estrutura do Projeto

```
src/
├── main.rs                 # Bootstrap, tracing, servidor
├── database.rs             # Pool PostgreSQL
├── utils.rs                # Utilitários (ex: agora())
│
├── models/                 # Entidades de domínio
├── repositories/           # Queries SQL (trait Repository<T>)
├── services/               # Regras de negócio
├── usecases/               # Casos de uso (orquestram services + usuário)
│
└── api/
    ├── routers.rs          # Definição de rotas
    ├── state.rs            # AppState (estado global)
    ├── auth.rs             # JWT middleware
    ├── dto/                # Request DTOs + AppError
    ├── wipe.rs             # ⚠️ Wipe DB (dev only)
    ├── usuario/            # Handlers de usuário
    ├── loja/               # Handlers de loja
    ├── pedido/             # Handlers de pedido
    ├── produto/            # Handlers de produto
    ├── cupom/              # Handlers de cupom
    ├── catalogo/           # Handlers de catálogo
    ├── endereco_entrega/   # Handlers de endereço de entrega
    ├── endereco_usuario/   # Handlers de endereço de usuário
    ├── loja_favorita/      # Handlers de lojas favoritas
    └── marketing/          # Handlers de avaliação
```

### Stack

| Componente   | Tecnologia                    |
|--------------|-------------------------------|
| Linguagem    | Rust 1.88 (edição 2024)       |
| HTTP         | Axum 0.8                      |
| Runtime      | Tokio                         |
| Database     | sqlx + PostgreSQL 15          |
| Logging      | tracing + tracing-subscriber  |
| Auth         | JWT (jsonwebtoken)            |
| Serialização | serde / serde_json            |
| Timestamps   | chrono::DateTime<Utc>         |
| Horários     | chrono::NaiveTime             |
| Decimais     | rust_decimal::Decimal         |

---

## 🔑 Autenticação & Autorização

A API usa **JWT (JSON Web Token)** para autenticação e **classe de usuário** para autorização.

### Classes de Usuario

| Classe | Descrição |
|--------|-----------|
| `cliente` | Padrão. Pode navegar lojas, fazer pedidos e avaliar. |
| `administrador` | Pode criar lojas e gerenciar catálogos, funcionários e entregadores. |
| `funcionario` | Funcionário de uma loja. Possui conta de usuário com credenciais. |
| `entregador` | Entregador de uma loja. Possui conta de usuário com credenciais. |
| `owner` | Dono da plataforma. Acesso total. |

### Fluxo

1. `POST /proto/auth/signup` — cria usuário com `classe` (opcional, padrão: `"cliente"`)
2. `POST /proto/auth/login` — autentica com email/senha, retorna token
3. Inclua o token no header: `Authorization: Bearer <token>`

### Exemplo de Signup

**Criar cliente:**
```json
POST /proto/auth/signup
{
  "nome": "João Silva",
  "username": "joao",
  "email": "joao@email.com",
  "senha": "senha123",
  "celular": "11999999999",
  "auth_method": "email"
}
```

**Criar administrador:**
```json
POST /proto/auth/signup
{
  "nome": "Maria Admin",
  "username": "maria",
  "email": "maria@email.com",
  "senha": "senha123",
  "celular": "11888888888",
  "auth_method": "email",
  "classe": "administrador"
}
```

### Serviços Disponíveis

| Serviço | Responsabilidade |
|---------|-----------------|
| `UsuarioService` | Registro, autenticação, listagem |
| `LojaService` | Criação de loja, funcionários, entregadores, clientes |
| `CatalogoService` | Produtos, categorias, adicionais |
| `PedidoService` | Criação, busca, listagem de pedidos |
| `MarketingService` | Cupons, promoções, avaliações |
| `EnderecoEntregaService` | Endereços de entrega vinculados a pedidos |
| `EnderecoUsuarioService` | CRUD de endereços de usuários |
| `LojaFavoritaService` | Favoritar/desfavoritar lojas, listar favoritas |

---

## 📦 Estrutura de um Pedido

Pedidos suportam partes personalizáveis (ex: pizza meio-a-meio):

```
Pedido
├── observacoes
├── itens[]
│   ├── quantidade
│   ├── observacoes
│   └── partes[]
│       ├── produto_nome
│       ├── preco_unitario
│       ├── posicao
│       └── adicionais[]
│           ├── nome
│           ├── descricao
│           └── preco
└── endereco_entrega
    ├── logradouro, numero, bairro, cidade, estado
    └── cep
```

### Lifecycle do Pedido

```
criado → aguardando_confirmacao → confirmado → em_preparo
       → pronto_para_retirada → saiu_para_entrega → entregue
```

---

## 🔧 Comandos Úteis

```bash
cargo run                  # Rodar localmente
cargo test                 # Executar testes
cargo check                # Verificar compilação
cargo build --release      # Build de produção
cargo clippy               # Lint do projeto
docker compose up -d       # Subir PostgreSQL local
docker build -t chickie .  # Build da imagem
```

---

## 🌍 Variáveis de Ambiente

| Variável       | Padrão     | Descrição                                  |
|----------------|------------|--------------------------------------------|
| `APP_PORT`     | `3000`     | Porta do servidor                          |
| `DATABASE_URL` | —          | String de conexão PostgreSQL               |
| `RUST_LOG`     | `info`     | Nível de log (`debug` em dev)              |
| `JWT_SECRET`   | `secret`   | Chave de assinatura JWT                    |
| `MODE`         | —          | `development` = dropa banco e reaplica migrações no startup |

---

## 🗄️ Banco de Dados

Migrações são gerenciadas pelo `sqlx-cli`.

```bash
# Criar nova migração
sqlx migrate add <nome_da_migracao>

# Aplicar migrações
sqlx migrate run

# Reverter última migração
sqlx migrate revert
```

Migrações existentes estão em:
- `migrations/0001_criar_tabelas.sql` — schema base
- `migrations/0002_add_promocao_escopo.sql` — escopo de promoção

---

## 📝 Convenções de Desenvolvimento

- **Logging:** usar `tracing` — nunca `println!` fora do `main`
- **Erros:** handlers retornam `Result<impl IntoResponse, AppError>`
- **Sem `.unwrap()`:** em código de produção, fora do bootstrap
- **Rotas:** todas sob `/api`, exceto health check (`/`) e fallback 404
- **AppState:** único ponto de estado global compartilhado via `Arc<AppState>`

---

## 🗺️ Roadmap

- [ ] **Pagamentos:** métodos de pagamento, transações, histórico
- [ ] **Endereços:** múltiplos endereços por cliente, validação de área de entrega
- [ ] **Notificações:** alertas de status do pedido, promoções
- [ ] **Cardápio avançado:** variações de produto (P/M/G), produtos em destaque
- [ ] **Rastreamento:** tempo estimado, localização em tempo real
- [ ] **Promoções por produto/categoria** (atualmente aplica para toda a loja)
- [ ] **CI/CD:** pipeline de testes, lint e deploy automatizado
- [ ] **Remover endpoint `/proto/wipe`** antes de produção

---

## 🐳 Docker

### Multi-stage Build

O `Dockerfile` usa dois estágios para minimizar a imagem final:

1. **Builder:** Rust 1.88 com compilação otimizada
2. **Runtime:** Debian slim com apenas o binário e migrações

### Deploy

Deploy via **Dokploy** com Docker. A imagem é construída e publicada no registry interno.

---

## Arquitetura

Este projeto segue Clean Architecture / Hexagonal:

```
Handler → Usecase → Service → Port (trait) → Repository → Database
```

- **23 port traits** definem contratos sem dependência de banco
- **20 repositories** implementam os ports com sqlx
- **15 services** aplicam regras de negócio usando ports
- **DomainError** tipifica erros do domínio
- **AppError** mapeia DomainError → HTTP status

### Tutorial

Para criar novas entidades, repositórios, services e endpoints, consulte:
- [`CLEAN_ARCHITECTURE_GUIDE.md`](./CLEAN_ARCHITECTURE_GUIDE.md) — tutorial passo-a-passo completo

---

## 📄 Licença

MIT
