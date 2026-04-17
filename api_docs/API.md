# API Specification — Chickie

> Especificação completa de todos os endpoints, request/response bodies, headers e autenticação.

---

## Interactive API Documentation (Swagger/OpenAPI)

This API provides interactive documentation powered by **utoipa** with automatic OpenAPI specification generation.

### Quick Access

| Resource | URL |
|----------|-----|
| **Swagger UI** | `http://localhost:3000/proto/docs/swagger-ui` |
| **OpenAPI JSON Spec** | `http://localhost:3000/proto/docs/openapi.json` |

### Features

- **Interactive Testing**: Execute API requests directly from the browser
- **Complete Schema Documentation**: View all request/response models
- **Authentication Support**: Configure JWT tokens for testing protected endpoints
- **Real-time Validation**: See parameter requirements and data constraints

### Using Swagger UI

1. Navigate to `http://localhost:3000/proto/docs/swagger-ui`
2. Browse endpoints organized by tags
3. Click on any endpoint to expand details
4. Click **"Try it out"** to enable request testing
5. Fill in required parameters
6. Click **"Execute"** to send the request
7. View response body and headers

> **Note**: For protected endpoints (🔒), authenticate first by clicking the **Authorize** button and entering your JWT token as `Bearer <token>`.

---

## Informações Gerais

| Item | Valor |
|------|-------|
| **Base URL** | `http://localhost:3000/api` |
| **Protocolo** | HTTP/1.1 |
| **Formato** | JSON (`application/json`) |
| **Autenticação** | JWT Bearer Token via header `Authorization: Bearer <token>` |
| **Charset** | UTF-8 |

### Autenticação

Endpoints marcados com 🔒 exigem:
```
Authorization: Bearer <JWT_TOKEN>
```

Endpoints marcados com 👑 exigem além do JWT que o usuário tenha `classe = "administrador"`.

### Classes de Usuário

| Classe | Descrição |
|--------|-----------|
| `cliente` | Padrão. Faz pedidos e avalia. |
| `administrador` | Cria e gerencia lojas, funcionários e entregadores. |
| `funcionario` | Funcionário de uma loja (vinculado via `usuario_uuid`). |
| `entregador` | Entregador de uma loja (vinculado via `usuario_uuid`). |
| `owner` | Dono da plataforma. Acesso total. |

### Erros

Todos os endpoints retornam erros no formato:
```json
{
  "error": "Mensagem de erro descritiva"
}
```

| Status | Significado |
|--------|-------------|
| `400` | Bad Request — dados inválidos ou transição de estado inválida |
| `403` | Forbidden — sem permissão (admin necessário) |
| `404` | Not Found — recurso não encontrado |
| `500` | Internal Server Error — erro interno |
| `201` | Created — recurso criado com sucesso |
| `204` | No Content — operação bem-sucedida sem body |

---

## Máquina de Estados do Pedido

Um pedido passa por uma máquina de estados com transições válidas definidas:

```
Criado
  ↓
AguardandoConfirmacaoDeLoja ←────┐
  ↓                               │
ConfirmadoPelaLoja ───────────────┘
  ↓
EmPreparo ────────────────────────┐
  ↓                               │
ProntoParaRetirada ←──────────────┘
  ↓
SaiuParaEntrega ──────────────────┐
  ↓                               │
Entregue (terminal) ←─────────────┘
```

### Estados e Transições

| Estado Atual | Próximo Válido |
|--------------|----------------|
| `criado` | `aguardando_confirmacao_de_loja` |
| `aguardando_confirmacao_de_loja` | `confirmado_pela_loja` ou voltar para `criado` |
| `confirmado_pela_loja` | `em_preparo` ou voltar para `aguardando_confirmacao_de_loja` |
| `em_preparo` | `pronto_para_retirada` ou voltar para `confirmado_pela_loja` |
| `pronto_para_retirada` | `saiu_para_entrega` ou voltar para `em_preparo` |
| `saiu_para_entrega` | `entregue` ou voltar para `pronto_para_retirada` |
| `entregue` | **(estado terminal — sem transições)** |

### Response ao Avançar Estado

```json
{
  "uuid": "pedido-uuid",
  "status": "em_preparo",
  "transicoes_permitidas": ["pronto_para_retirada", "confirmado_pela_loja"]
}
```

---

## Prefixos de Rota

| Prefixo | Grupo |
|---------|-------|
| `/proto/auth/` | Autenticação |
| `/proto/usuarios/` | Usuários |
| `/proto/lojas/` | Lojas (público) |
| `/proto/admin/` | Administração |
| `/proto/pedidos/` | Pedidos |
| `/proto/marketing/` | Cupons, avaliações, promoções |
| `/proto/catalogo/` | Adicionais, categorias |
| `/proto/enderecos-entrega/` | Endereços de entrega |
| `/proto/enderecos-usuario/` | Endereços de usuário |
| `/proto/favoritos/` | Lojas favoritas |
| `/proto/produtos/` | Produtos |

---

## 1. Health Check

```
GET /
```

**Response `200`:**
```json
{
  "message": "🚀 Servidor compilado com sucesso!"
}
```

---

## 2. Autenticação (público)

### 2.1 Cadastrar Usuário

```
POST /proto/auth/signup
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "string",
  "username": "string",
  "senha": "string",
  "email": "string",
  "celular": "string",
  "auth_method": "string",
  "classe": "cliente" | "administrador" | "funcionario" | "entregador" | "owner"
}
```

> `classe` é opcional. Default: `"cliente"`.

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "João Silva",
  "username": "joao",
  "email": "joao@email.com",
  "celular": "11999999999",
  "classe": "cliente",
  "ativo": true,
  "passou_pelo_primeiro_acesso": false,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z",
  "modo_de_cadastro": "email",
  "senha_hash": "$2b$12$..."
}
```

---

### 2.2 Login

```
POST /proto/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "string",
  "senha": "string"
}
```

**Response `200`:**
```json
{
  "access_token": "string (JWT)",
  "token_type": "Bearer"
}
```

### 2.3 Me (Obter Usuário Autenticado)

```
GET /proto/auth/me
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "João Silva",
  "username": "joao",
  "email": "joao@email.com",
  "celular": "11999999999",
  "classe": "cliente",
  "ativo": true,
  "passou_pelo_primeiro_acesso": false,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z",
  "modo_de_cadastro": "email"
}
```

**Response `401`:**
```json
{
  "error": "Token de autenticação não fornecido. Inclua o header: Authorization: Bearer <token>"
}
```

---

## 3. Lojas (público)

### 3.1 Listar Lojas

```
GET /proto/lojas/
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Pizzaria do João",
    "slug": "pizzaria-do-joao",
    "descricao": "A melhor pizza da cidade",
    "email": "contato@pizzaria.com",
    "celular": "11999999999",
    "ativa": true,
    "logo_url": "https://example.com/logo.png",
    "banner_url": "https://example.com/banner.jpg",
    "horario_abertura": "18:00",
    "horario_fechamento": "23:00",
    "dias_funcionamento": "2,3,4,5,6,0",
    "tempo_preparo_min": 45,
    "taxa_entrega": 5.0,
    "valor_minimo_pedido": 20.0,
    "raio_entrega_km": 5.0,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z"
  }
]
```

### 3.2 Pesquisar Lojas

```
GET /proto/lojas/pesquisar?termo={valor}
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Pizzaria do João",
    "slug": "pizzaria-do-joao",
    "descricao": "A melhor pizza da cidade",
    "email": "contato@pizzaria.com",
    "celular": "11999999999",
    "ativa": true,
    "logo_url": "https://example.com/logo.png",
    "banner_url": "https://example.com/banner.jpg",
    "horario_abertura": "18:00",
    "horario_fechamento": "23:00",
    "dias_funcionamento": "2,3,4,5,6,0",
    "tempo_preparo_min": 45,
    "taxa_entrega": 5.0,
    "valor_minimo_pedido": 20.0,
    "raio_entrega_km": 5.0,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 3.3 Buscar Loja

```
GET /proto/lojas/{uuid}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Pizzaria do João",
  "slug": "pizzaria-do-joao",
  "descricao": "A melhor pizza da cidade",
  "email": "contato@pizzaria.com",
  "celular": "11999999999",
  "ativa": true,
  "logo_url": "https://example.com/logo.png",
  "banner_url": "https://example.com/banner.jpg",
  "horario_abertura": "18:00",
  "horario_fechamento": "23:00",
  "dias_funcionamento": "2,3,4,5,6,0",
  "tempo_preparo_min": 45,
  "taxa_entrega": 5.0,
  "valor_minimo_pedido": 20.0,
  "raio_entrega_km": 5.0,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z"
}
```

---

### 3.4 Buscar Loja por Slug

```
GET /proto/lojas/slug/{slug}
```

**Response `200`:** (mesmo schema de buscar por UUID)

---

### 3.5 Verificar Disponibilidade de Slug

```
GET /proto/lojas/verificar-slug/{slug}
```

**Response `200` (slug disponível):**
```json
{
  "disponivel": true,
  "slug": "pizzaria-do-joao"
}
```

**Response `200` (slug já em uso):**
```json
{
  "disponivel": false,
  "slug": "pizzaria-do-joao"
}
```

---

## 4. Usuários (🔒 + 👑 Owner)

> **Nota:** A maioria dos endpoints de usuário exige `OwnerPermission`. O owner é definido pela variável de ambiente `OWNER_EMAIL` ou pela classe `owner`.

### 4.1 Listar Usuários

```
GET /proto/usuarios/
Authorization: Bearer <token>
```

**Query Parameters:**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `classe` | `string` | Não | Filtrar por classe: `cliente`, `administrador`, `funcionario`, `entregador`, `owner` |

**Exemplos:**
- `GET /proto/usuarios/` — lista todos os usuários
- `GET /proto/usuarios/?classe=cliente` — lista apenas clientes
- `GET /proto/usuarios/?classe=administrador` — lista apenas administradores

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "João Silva",
    "username": "joao",
    "email": "joao@email.com",
    "celular": "11999999999",
    "classe": "cliente",
    "ativo": true,
    "bloqueado": false,
    "passou_pelo_primeiro_acesso": true,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z",
    "modo_de_cadastro": "email",
    "senha_hash": "$2b$12$..."
  }
]
```

---

### 4.2 Marcar Usuário para Remoção

```
PATCH /proto/usuarios/{usuario_uuid}/marcar-remocao
Authorization: Bearer <token>
```

> **Permissão:** Apenas o próprio usuário OU o owner da plataforma.

**Response `204`:** No Content

---

### 4.3 Desmarcar Remoção de Usuário

```
PATCH /proto/usuarios/{usuario_uuid}/desmarcar-remocao
Authorization: Bearer <token>
```

> **Permissão:** Apenas o próprio usuário OU o owner da plataforma.

**Response `204`:** No Content

---

### 4.4 Alternar Status Ativo do Usuário

```
PUT /proto/usuarios/{usuario_uuid}/ativo
Authorization: Bearer <token>
Content-Type: application/json
```

> **Permissão:** Apenas o owner da plataforma.

**Request Body:**
```json
{
  "ativo": true
}
```

**Response `200`:**
```json
{
  "message": "Usuário ativado com sucesso",
  "ativo": true
}
```

---

### 4.5 Toggle Bloqueio do Usuário

```
PATCH /proto/usuarios/{usuario_uuid}/bloqueado
Authorization: Bearer <token>
```

> **Permissão:** Apenas o owner da plataforma.
> Alterna o status `bloqueado` do usuário. Usuários bloqueados não podem fazer login.

**Response `200`:**
```json
{
  "message": "Usuário bloqueado com sucesso",
  "bloqueado": true
}
```

Ou ao desbloquear:
```json
{
  "message": "Usuário desbloqueado com sucesso",
  "bloqueado": false
}
```

---

## 5. Lojas

### 5.1 Listar Lojas Públicas

### 5.1 Criar Loja

```
POST /proto/admin/lojas
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "string",
  "slug": "string",
  "email_contato": "string",
  "descricao": "string | null",
  "celular": "string | null",
  "hora_abertura": "string | null",
  "hora_fechamento": "string | null",
  "dias_funcionamento": "string | null",
  "tempo_medio": 30,
  "nota_media": 4.5,
  "taxa_entrega_base": 5.0,
  "pedido_minimo": 20.0,
  "max_partes": 4
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Pizzaria do João",
  "slug": "pizzaria-do-joao",
  "descricao": "A melhor pizza da cidade",
  "email": "contato@pizzaria.com",
  "celular": "11999999999",
  "ativa": true,
  "logo_url": "https://example.com/logo.png",
  "banner_url": "https://example.com/banner.jpg",
  "horario_abertura": "18:00",
  "horario_fechamento": "23:00",
  "dias_funcionamento": "2,3,4,5,6,0",
  "tempo_preparo_min": 45,
  "taxa_entrega": 5.0,
  "valor_minimo_pedido": 20.0,
  "raio_entrega_km": 5.0,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z"
}
```

---

### 5.2 Listar Todas as Lojas

```
GET /proto/admin/lojas/listar
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Pizzaria do João",
    "slug": "pizzaria-do-joao",
    "descricao": "A melhor pizza da cidade",
    "email": "contato@pizzaria.com",
    "celular": "11999999999",
    "ativa": true,
    "logo_url": "https://example.com/logo.png",
    "banner_url": "https://example.com/banner.jpg",
    "horario_abertura": "18:00",
    "horario_fechamento": "23:00",
    "dias_funcionamento": "2,3,4,5,6,0",
    "tempo_preparo_min": 45,
    "taxa_entrega": 5.0,
    "valor_minimo_pedido": 20.0,
    "raio_entrega_km": 5.0,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 5.3 Minhas Lojas (Lojas do Admin)

```
GET /proto/admin/lojas/minhas-lojas
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Pizzaria do João",
    "slug": "pizzaria-do-joao"
  }
]
```

---

### 5.4 Toggle Bloqueio da Loja

```
PATCH /proto/lojas/{loja_uuid}/bloqueado
Authorization: Bearer <token>
```

> **Permissão:** Apenas o owner da plataforma.
> Alterna o status `bloqueado` da loja. Lojas bloqueadas não podem operar.

**Response `200`:**
```json
{
  "message": "Loja bloqueada com sucesso",
  "bloqueado": true
}
```

Ou ao desbloquear:
```json
{
  "message": "Loja desbloqueada com sucesso",
  "bloqueado": false
}
```

---

### 5.5 Adicionar Funcionário

```
POST /proto/admin/lojas/{loja_uuid}/funcionarios
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "string",
  "username": "string",
  "email": "string",
  "senha": "string",
  "celular": "string",
  "cargo": "string | null",
  "salario": 2500.0,
  "data_admissao": "2026-04-04"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440001",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440002",
  "cargo": "Gerente",
  "salario": 2500.0,
  "data_admissao": "2026-04-04",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 5.5 Adicionar Entregador

```
POST /proto/admin/lojas/{loja_uuid}/entregadores
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "string",
  "username": "string",
  "email": "string",
  "senha": "string",
  "celular": "string",
  "veiculo": "string | null",
  "placa": "string | null"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440003",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440004",
  "veiculo": "Moto",
  "placa": "ABC-1234",
  "disponivel": true,
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 5.6 Adicionar Cliente

```
POST /proto/admin/lojas/{loja_uuid}/clientes
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "string",
  "username": "string",
  "email": "string",
  "senha": "string",
  "celular": "string"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440005",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440006",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

## 6. Pedidos (🔒)

### 6.1 Criar Pedido

```
POST /proto/pedidos/criar
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "taxa_entrega": 5.0,
  "forma_pagamento": "PIX",
  "observacoes": "string | null",
  "codigo_cupom": "string | null",
  "itens": [
    {
      "quantidade": 1,
      "observacoes": "string | null",
      "partes": [
        {
          "produto_uuid": "uuid",
          "posicao": 1
        }
      ]
    }
  ],
  "endereco_entrega": {
    "cep": "string | null",
    "logradouro": "string",
    "numero": "string",
    "complemento": "string | null",
    "bairro": "string",
    "cidade": "string",
    "estado": "string"
  }
}
```

**Response `201`:**
```json
{ "uuid": "uuid" }
```

---

### 6.2 Listar Pedidos

```
GET /proto/pedidos/
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440010",
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "entregador_uuid": null,
    "status": "criado",
    "total": 65.90,
    "subtotal": 55.90,
    "taxa_entrega": 5.0,
    "desconto": 0.0,
    "forma_pagamento": "PIX",
    "observacoes": "Sem cebola",
    "tempo_estimado_min": 45,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z",
    "itens": [
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440011",
        "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
        "pedido_uuid": "550e8400-e29b-41d4-a716-446655440010",
        "quantidade": 1,
        "observacoes": null,
        "adicionais": [],
        "partes": [
          {
            "uuid": "550e8400-e29b-41d4-a716-446655440012",
            "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
            "item_uuid": "550e8400-e29b-41d4-a716-446655440011",
            "produto_nome": "Pizza Grande",
            "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
            "preco_unitario": 49.90,
            "posicao": 1,
            "adicionais": [
              {
                "uuid": "550e8400-e29b-41d4-a716-446655440014",
                "item_uuid": "550e8400-e29b-41d4-a716-446655440011",
                "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
                "nome": "Queijo Extra",
                "descricao": "Queijo mussarela adicional",
                "preco": 3.50
              }
            ]
          }
        ]
      }
    ],
    "partes": []
  }
]
```

---

### 6.2.1 Listar Meus Pedidos (Por Usuário)

```
GET /proto/pedidos/meus
Authorization: Bearer <token>
```

> Retorna todos os pedidos criados pelo usuário autenticado, ordenados do mais recente ao mais antigo. Inclui itens, partes e adicionais hidratados.

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440010",
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "entregador_uuid": null,
    "status": "criado",
    "total": 65.90,
    "subtotal": 55.90,
    "taxa_entrega": 5.0,
    "desconto": 0.0,
    "forma_pagamento": "PIX",
    "observacoes": "Sem cebola",
    "tempo_estimado_min": 45,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z",
    "itens": [
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440011",
        "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
        "pedido_uuid": "550e8400-e29b-41d4-a716-446655440010",
        "quantidade": 1,
        "observacoes": null,
        "adicionais": [],
        "partes": [
          {
            "uuid": "550e8400-e29b-41d4-a716-446655440012",
            "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
            "item_uuid": "550e8400-e29b-41d4-a716-446655440011",
            "produto_nome": "Pizza Grande",
            "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
            "preco_unitario": 49.90,
            "posicao": 1,
            "adicionais": []
          }
        ]
      }
    ],
    "partes": []
  }
]
```

**Response `200` (vazio — sem pedidos):**
```json
[]
```

---

### 6.3 Buscar Pedido

```
GET /proto/pedidos/{uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440010",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "entregador_uuid": null,
  "status": "criado",
  "total": 65.90,
  "subtotal": 55.90,
  "taxa_entrega": 5.0,
  "desconto": 0.0,
  "forma_pagamento": "PIX",
  "observacoes": "Sem cebola",
  "tempo_estimado_min": 45,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z",
  "itens": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440011",
      "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
      "pedido_uuid": "550e8400-e29b-41d4-a716-446655440010",
      "quantidade": 1,
      "observacoes": null,
      "adicionais": [],
      "partes": [
        {
          "uuid": "550e8400-e29b-41d4-a716-446655440012",
          "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
          "item_uuid": "550e8400-e29b-41d4-a716-446655440011",
          "produto_nome": "Pizza Grande",
          "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
          "preco_unitario": 49.90,
          "posicao": 1,
          "adicionais": [
            {
              "uuid": "550e8400-e29b-41d4-a716-446655440014",
              "item_uuid": "550e8400-e29b-41d4-a716-446655440011",
              "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
              "nome": "Queijo Extra",
              "descricao": "Queijo mussarela adicional",
              "preco": 3.50
            }
          ]
        }
      ]
    }
  ],
  "partes": []
}
```

---

### 6.4 Listar Pedidos por Loja

```
GET /proto/pedidos/criar
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440010",
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "entregador_uuid": null,
    "status": "criado",
    "total": 65.90,
    "subtotal": 55.90,
    "taxa_entrega": 5.0,
    "desconto": 0.0,
    "forma_pagamento": "PIX",
    "observacoes": "Sem cebola",
    "tempo_estimado_min": 45,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z",
    "itens": [
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440011",
        "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
        "pedido_uuid": "550e8400-e29b-41d4-a716-446655440010",
        "quantidade": 1,
        "observacoes": null,
        "adicionais": [],
        "partes": [
          {
            "uuid": "550e8400-e29b-41d4-a716-446655440012",
            "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
            "item_uuid": "550e8400-e29b-41d4-a716-446655440011",
            "produto_nome": "Pizza Grande",
            "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
            "preco_unitario": 49.90,
            "posicao": 1,
            "adicionais": []
          }
        ]
      }
    ],
    "partes": []
  }
]
```

---

### 6.5 Buscar Pedido com Endereço de Entrega

```
GET /proto/pedidos/{pedido_uuid}/com-entrega
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "pedido": {
    "uuid": "550e8400-e29b-41d4-a716-446655440010",
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "entregador_uuid": null,
    "status": "criado",
    "total": 65.90,
    "subtotal": 55.90,
    "taxa_entrega": 5.0,
    "desconto": 0.0,
    "forma_pagamento": "PIX",
    "observacoes": null,
    "tempo_estimado_min": 45,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z",
    "itens": [],
    "partes": []
  },
  "endereco_entrega": {
    "uuid": "550e8400-e29b-41d4-a716-446655440020",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "pedido_uuid": "550e8400-e29b-41d4-a716-446655440010",
    "cep": "01001-000",
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Apto 101",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "latitude": -23.5505,
    "longitude": -46.6333
  }
}
```

---

### 6.6 Atualizar Status do Pedido

```
PUT /proto/pedidos/criar/{pedido_uuid}/status
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "novo_status": "em_preparo"
}
```

**Valores válidos para `novo_status`:**
- `criado`
- `aguardando_confirmacao_de_loja`
- `confirmado_pela_loja`
- `em_preparo`
- `pronto_para_retirada`
- `saiu_para_entrega`
- `entregue`

> A transição deve ser válida conforme a máquina de estados. Transições inválidas retornam `400 Bad Request`.

**Response `200`:**
```json
{
  "uuid": "pedido-uuid",
  "status": "em_preparo",
  "transicoes_permitidas": ["pronto_para_retirada", "confirmado_pela_loja"]
}
```

**Response `400` (transição inválida):**
```json
{
  "error": "Transição inválida: Criado -> Entregue. Transições permitidas: [AguardandoConfirmacaoDeLoja]"
}
```

---

### 6.7 Atribuir Entregador ao Pedido

```
PUT /proto/pedidos/{pedido_uuid}/entregador/{loja_uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

> Vincula um entregador existente ao pedido. O entregador deve pertencer à mesma loja do pedido.

**Request Body:**
```json
{
  "entregador_uuid": "550e8400-e29b-41d4-a716-446655440099"
}
```

**Response `204`:** No Content

**Response `404` (pedido ou entregador não encontrado):**
```json
{
  "error": "Pedido não encontrado ou não pertence a esta loja"
}
```

---

### 6.8 Remover Entregador do Pedido

```
DELETE /proto/pedidos/{pedido_uuid}/entregador/{loja_uuid}
Authorization: Bearer <token>
```

> Remove o entregador vinculado ao pedido (define `entregador_uuid` como NULL).

**Response `204`:** No Content

**Response `404` (pedido não encontrado):**
```json
{
  "error": "Pedido não encontrado ou não pertence a esta loja"
}
```

---

### 6.9 Buscar Pedido com Informações do Entregador

```
GET /proto/pedidos/{pedido_uuid}/com-entregador
Authorization: Bearer <token>
```

> Retorna o pedido completo com dados do entregador vinculado (nome, veículo, placa). Se nenhum entregador estiver atribuído, os campos retornam vazios e `entregador_uuid` é `null`.

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440010",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "entregador_uuid": "550e8400-e29b-41d4-a716-446655440099",
  "status": "saiu_para_entrega",
  "total": 65.90,
  "subtotal": 55.90,
  "taxa_entrega": 5.0,
  "desconto": 0.0,
  "forma_pagamento": "PIX",
  "observacoes": "Sem cebola",
  "tempo_estimado_min": 45,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z",
  "entregador_nome": "Carlos Entregador",
  "veiculo": "Moto",
  "placa": "ABC-1234"
}
```

**Response `404`:**
```json
{
  "error": "Pedido não encontrado"
}
```

---

## 7. Cupons (🔒)

### 7.1 Criar Cupom (Genérico)

```
POST /proto/cupons/
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "codigo": "PROMO10",
  "descricao": "10% off",
  "tipo_desconto": "percentual",
  "valor_desconto": 10.0,
  "valor_minimo": 50.0,
  "data_validade": "2026-12-31T23:59:59Z",
  "limite_uso": 100
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440030",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "codigo": "PROMO10",
  "descricao": "10% off",
  "tipo_desconto": "percentual",
  "valor_desconto": 10.0,
  "valor_minimo": 50.0,
  "data_validade": "2026-12-31T23:59:59Z",
  "limite_uso": 100,
  "uso_atual": 0,
  "status": "Ativo",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 7.2 Listar Todos os Cupons

```
GET /proto/cupons/
Authorization: Bearer <token>
```

> Retorna todos os cupons de todas as lojas.

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440030",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "codigo": "PROMO10",
    "descricao": "10% off",
    "tipo_desconto": "percentual",
    "valor_desconto": 10.0,
    "valor_minimo": 50.0,
    "data_validade": "2026-12-31T23:59:59Z",
    "limite_uso": 100,
    "uso_atual": 0,
    "status": "Ativo",
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 7.3 Buscar Cupom por UUID

```
GET /proto/cupons/{uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440030",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "codigo": "PROMO10",
  "descricao": "10% off",
  "tipo_desconto": "percentual",
  "valor_desconto": 10.0,
  "valor_minimo": 50.0,
  "data_validade": "2026-12-31T23:59:59Z",
  "limite_uso": 100,
  "uso_atual": 0,
  "status": "Ativo",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

**Response `404`:**
```json
{
  "error": "Cupom não encontrado"
}
```

---

### 7.4 Atualizar Cupom

```
PUT /proto/cupons/{uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "codigo": "PROMO20",
  "descricao": "20% off",
  "tipo_desconto": "percentual",
  "valor_desconto": 20.0,
  "valor_minimo": 100.0,
  "data_validade": "2027-12-31T23:59:59Z",
  "limite_uso": 200
}
```

**Response `204`:** No Content

---

### 7.5 Deletar Cupom

```
DELETE /proto/cupons/{uuid}
Authorization: Bearer <token>
```

**Response `204`:** No Content

**Response `404`:**
```json
{
  "error": "Cupom não encontrado"
}
```

---

### 7.6 Atualizar Status do Cupom (Ativar/Inativar)

```
PATCH /proto/cupons/{uuid}/status
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "ativo": true
}
```

> Envie `"ativo": false` para inativar o cupom.

**Response `204`:** No Content

**Response `404`:**
```json
{
  "error": "Cupom não encontrado"
}
```

---

## 8. Marketing: Cupons (Legado), Avaliações e Promoções

### 8.1 Criar Cupom (Legado)

> ⚠️ Endpoint legado. Use `POST /proto/cupons/` para novo código.

```
POST /proto/marketing/{loja_uuid}/cupons
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "codigo": "PROMO10",
  "descricao": "10% off",
  "tipo_desconto": "percentual",
  "valor_desconto": 10.0,
  "valor_minimo": 50.0,
  "data_validade": "2026-12-31T23:59:59Z",
  "limite_uso": 100
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440030",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "codigo": "PROMO10",
  "descricao": "10% off",
  "tipo_desconto": "percentual",
  "valor_desconto": 10.0,
  "valor_minimo": 50.0,
  "data_validade": "2026-12-31T23:59:59Z",
  "limite_uso": 100,
  "uso_atual": 0,
  "status": "Ativo",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 8.2 Listar Cupons da Loja (Legado)

> ⚠️ Endpoint legado. Use `GET /proto/cupons/` para listar todos.

```
GET /proto/marketing/cupons
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440030",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "codigo": "PROMO10",
    "descricao": "10% off",
    "tipo_desconto": "percentual",
    "valor_desconto": 10.0,
    "valor_minimo": 50.0,
    "data_validade": "2026-12-31T23:59:59Z",
    "limite_uso": 100,
    "uso_atual": 0,
    "status": "Ativo",
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 8.3 Validar Cupom

> ⚠️ **Atenção**: Este endpoint é público (sem autenticação).

```
GET /proto/marketing/cupons/{codigo}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440030",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "codigo": "PROMO10",
  "descricao": "10% off",
  "tipo_desconto": "percentual",
  "valor_desconto": 10.0,
  "valor_minimo": 50.0,
  "data_validade": "2026-12-31T23:59:59Z",
  "limite_uso": 100,
  "uso_atual": 0,
  "status": "Ativo",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 7.4 Avaliar Loja

```
POST /proto/marketing/{loja_uuid}/avaliar-loja
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nota": 4.5,
  "comentario": "string | null"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440040",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nota": 4.5,
  "comentario": "Ótima pizza!",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 7.5 Avaliar Produto

```
POST /proto/marketing/{loja_uuid}/avaliar-produto
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "produto_uuid": "uuid",
  "nota": 5.0,
  "descricao": "string",
  "comentario": "string | null"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440041",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
  "nota": 5.0,
  "descricao": "Pizza deliciosa!",
  "comentario": "Melhor pizza que já comi",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 7.5.1 Listar Avaliações de Loja

```
GET /proto/marketing/{loja_uuid}/avaliacoes-loja
Authorization: Bearer <token>
```

> Retorna todas as avaliações de uma loja, ordenadas da mais recente para a mais antiga. Inclui `usuario_nome` e `usuario_email` obtidos via JOIN com a tabela de usuários (evita queries N+1).

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440040",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "usuario_nome": "João Silva",
    "usuario_email": "joao@email.com",
    "nota": "4.50",
    "comentario": "Ótima pizza!",
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

**Campos do response (`AvaliacaoDeLojaComUsuario`):**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `uuid` | UUID | UUID da avaliação |
| `loja_uuid` | UUID | UUID da loja avaliada |
| `usuario_uuid` | UUID | UUID do usuário que avaliou |
| `usuario_nome` | String | Nome do usuário (via JOIN) |
| `usuario_email` | String | Email do usuário (via JOIN) |
| `nota` | String (Decimal) | Nota de 0 a 5 |
| `comentario` | String \| null | Comentário opcional |
| `criado_em` | DateTime | Data de criação |

---

### 7.5.2 Buscar Avaliação de Loja por UUID

```
GET /proto/marketing/avaliacoes-loja/{uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440040",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nota": 4.5,
  "comentario": "Ótima pizza!",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

**Response `404`:**
```json
{
  "error": "Avaliação de loja não encontrada"
}
```

---

### 7.5.3 Atualizar Avaliação de Loja

```
PUT /proto/marketing/avaliacoes-loja/{uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nota": 3.5,
  "comentario": "Melhou depois da última visita"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440040",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nota": 3.5,
  "comentario": "Melhou depois da última visita",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 7.5.4 Deletar Avaliação de Loja

```
DELETE /proto/marketing/avaliacoes-loja/{uuid}
Authorization: Bearer <token>
```

**Response `204`:** No Content

**Response `404`:**
```json
{
  "error": "Avaliação de loja não encontrada"
}
```

---

### 7.5.5 Listar Avaliações de Produto por Loja

```
GET /proto/marketing/{loja_uuid}/avaliacoes-produto
Authorization: Bearer <token>
```

> Retorna todas as avaliações de produtos de uma loja, ordenadas da mais recente para a mais antiga.

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440041",
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
    "nota": 5.0,
    "descricao": "Pizza deliciosa!",
    "comentario": "Melhor pizza que já comi",
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 7.5.6 Listar Avaliações de Produto por Produto

```
GET /proto/marketing/avaliacoes-produto/produto/{produto_uuid}
Authorization: Bearer <token>
```

> Retorna todas as avaliações de um produto específico.

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440041",
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
    "nota": 5.0,
    "descricao": "Pizza deliciosa!",
    "comentario": "Melhor pizza que já comi",
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 7.5.7 Buscar Avaliação de Produto por UUID

```
GET /proto/marketing/avaliacoes-produto/{uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440041",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
  "nota": 5.0,
  "descricao": "Pizza deliciosa!",
  "comentario": "Melhor pizza que já comi",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

**Response `404`:**
```json
{
  "error": "Avaliação de produto não encontrada"
}
```

---

### 7.5.8 Atualizar Avaliação de Produto

```
PUT /proto/marketing/avaliacoes-produto/{uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nota": 4.0,
  "descricao": "Boa pizza, mas poderia ser melhor",
  "comentario": "Massa boa, molho médio"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440041",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
  "nota": 4.0,
  "descricao": "Boa pizza, mas poderia ser melhor",
  "comentario": "Massa boa, molho médio",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 7.5.9 Deletar Avaliação de Produto

```
DELETE /proto/marketing/avaliacoes-produto/{uuid}
Authorization: Bearer <token>
```

**Response `204`:** No Content

**Response `404`:**
```json
{
  "error": "Avaliação de produto não encontrada"
}
```

---

### 7.6 Criar Promoção

```
POST /proto/marketing/{loja_uuid}/promocoes
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "Promoção Pizza",
  "descricao": "string",
  "tipo_desconto": "percentual",
  "valor_desconto": 20.0,
  "valor_minimo": null,
  "data_inicio": "2026-04-04T00:00:00Z",
  "data_fim": "2026-04-04T23:59:59Z",
  "dias_semana_validos": [5],
  "tipo_escopo": "produto",
  "produto_uuid": "uuid-do-produto",
  "categoria_uuid": null,
  "prioridade": 1
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440050",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Promoção Pizza",
  "descricao": "Desconto especial em pizzas",
  "tipo_desconto": "percentual",
  "valor_desconto": 20.0,
  "valor_minimo": null,
  "data_inicio": "2026-04-04T00:00:00Z",
  "data_fim": "2026-04-04T23:59:59Z",
  "dias_semana_validos": [5],
  "tipo_escopo": "produto",
  "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
  "categoria_uuid": null,
  "status": "Ativo",
  "prioridade": 1,
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 7.7 Listar Promoções

```
GET /proto/marketing/{loja_uuid}/promocoes
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440050",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Promoção Pizza",
    "descricao": "Desconto especial em pizzas",
    "tipo_desconto": "percentual",
    "valor_desconto": 20.0,
    "valor_minimo": null,
    "data_inicio": "2026-04-04T00:00:00Z",
    "data_fim": "2026-04-04T23:59:59Z",
    "dias_semana_validos": [5],
    "tipo_escopo": "produto",
    "produto_uuid": "550e8400-e29b-41d4-a716-446655440013",
    "categoria_uuid": null,
    "status": "Ativo",
    "prioridade": 1,
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 7.8 Atualizar Promoção

```
PUT /proto/marketing/{loja_uuid}/promocoes/{uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (mesmo schema de criar)

**Response `204`:** No Content

---

### 7.9 Deletar Promoção

```
DELETE /proto/marketing/{loja_uuid}/promocoes/{uuid}
Authorization: Bearer <token>
```

**Response `204`:** No Content

---

## 8. Catálogo (🔒)

### 8.1 Criar Adicional

```
POST /proto/catalogo/{loja_uuid}/adicionais
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "Queijo Extra",
  "descricao": "string",
  "preco": 3.50
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440060",
  "nome": "Queijo Extra",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "disponivel": true,
  "descricao": "Queijo mussarela adicional",
  "preco": 3.50,
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 8.2 Listar Adicionais

```
GET /proto/catalogo/{loja_uuid}/adicionais
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440060",
    "nome": "Queijo Extra",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "disponivel": true,
    "descricao": "Queijo mussarela adicional",
    "preco": 3.50,
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 8.3 Listar Adicionais Disponíveis

```
GET /proto/catalogo/{loja_uuid}/adicionais/disponiveis
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440060",
    "nome": "Queijo Extra",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "disponivel": true,
    "descricao": "Queijo mussarela adicional",
    "preco": 3.50,
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 8.4 Atualizar Adicional

```
PUT /proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "Queijo Extra Premium",
  "descricao": "Queijo mussarela especial importado",
  "preco": 5.00
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440060",
  "nome": "Queijo Extra Premium",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "disponivel": true,
  "descricao": "Queijo mussarela especial importado",
  "preco": 5.00,
  "criado_em": "2026-04-04T00:00:00Z"
}
```

**Response `404` (adicional não encontrado):**
```json
{
  "error": "Adicional não encontrado"
}
```

**Response `400` (adicional não pertence à loja):**
```json
{
  "error": "Adicional não pertence a esta loja"
}
```

---

### 8.5 Atualizar Disponibilidade do Adicional

```
PUT /proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}/disponibilidade
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "disponivel": false
}
```

> Envie `"disponivel": true` para tornar o adicional disponível novamente.

**Response `204`:** No Content

**Response `404` (adicional não encontrado):**
```json
{
  "error": "Adicional não encontrado"
}
```

**Response `400` (adicional não pertence à loja):**
```json
{
  "error": "Adicional não pertence a esta loja"
}
```

---

### 8.6 Deletar Adicional

```
DELETE /proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}
Authorization: Bearer <token>
```

**Response `204`:** No Content

**Response `404` (adicional não encontrado):**
```json
{
  "error": "Adicional não encontrado"
}
```

**Response `400` (adicional não pertence à loja):**
```json
{
  "error": "Adicional não pertence a esta loja"
}
```

---

### 8.7 Criar Categoria

```
POST /proto/catalogo/{loja_uuid}/categorias
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "Bebidas",
  "descricao": "string | null",
  "ordem": 1,
  "pizza_mode": false
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440070",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Bebidas",
  "descricao": "Bebidas geladas",
  "ordem": 1,
  "pizza_mode": false,
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 8.8 Listar Categorias

```
GET /proto/catalogo/{loja_uuid}/categorias
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440070",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Bebidas",
    "descricao": "Bebidas geladas",
    "ordem": 1,
    "pizza_mode": false,
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 8.9 Atualizar Categoria

```
PUT /proto/catalogo/{loja_uuid}/categorias/{uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "Bebidas Geladas",
  "descricao": "string | null",
  "ordem": 2,
  "pizza_mode": false
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440070",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Bebidas Geladas",
  "descricao": "Bebidas bem geladas",
  "ordem": 2,
  "pizza_mode": false,
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 8.10 Deletar Categoria

```
DELETE /proto/catalogo/{loja_uuid}/categorias/{uuid}
Authorization: Bearer <token>
```

> ⚠️ Apenas funciona se a categoria não tiver produtos vinculados.

**Response `204`:** No Content

**Response `400` (categoria com produtos):**
```json
{
  "error": "Não é possível deletar categoria com 3 produto(s). Remova os produtos primeiro."
}
```

---

## 9. Endereços de Entrega (🔒)

### 9.1 Criar Endereço para Pedido

```
POST /proto/enderecos-entrega/{pedido_uuid}/{loja_uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "cep": "string | null",
  "logradouro": "string",
  "numero": "string",
  "complemento": "string | null",
  "bairro": "string",
  "cidade": "string",
  "estado": "string"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440080",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "pedido_uuid": "550e8400-e29b-41d4-a716-446655440010",
  "cep": "01001-000",
  "logradouro": "Rua das Flores",
  "numero": "123",
  "complemento": "Apto 101",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

---

### 9.2 Buscar Endereço por Pedido

```
GET /proto/enderecos-entrega/{pedido_uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440080",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "pedido_uuid": "550e8400-e29b-41d4-a716-446655440010",
  "cep": "01001-000",
  "logradouro": "Rua das Flores",
  "numero": "123",
  "complemento": "Apto 101",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

---

### 9.3 Listar Endereços por Loja

```
GET /proto/enderecos-entrega/{loja_uuid}/loja
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440080",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "pedido_uuid": "550e8400-e29b-41d4-a716-446655440010",
    "cep": "01001-000",
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Apto 101",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "latitude": -23.5505,
    "longitude": -46.6333
  }
]
```

---

## 10. Endereços de Loja (🔒)

### 10.1 Listar Endereços da Loja

```
GET /proto/enderecos-loja/{loja_uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440085",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "cep": "01001-000",
    "logradouro": "Rua das Lojas",
    "numero": "100",
    "complemento": "Loja 5",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "latitude": -23.5505,
    "longitude": -46.6333
  }
]
```

---

### 10.2 Criar Endereço da Loja

```
POST /proto/enderecos-loja/{loja_uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "cep": "string | null",
  "logradouro": "string",
  "numero": "string",
  "complemento": "string | null",
  "bairro": "string",
  "cidade": "string",
  "estado": "string",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

**Response `201`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440085"
}
```

---

### 10.3 Atualizar Endereço da Loja

```
PUT /proto/enderecos-loja/{loja_uuid}/{endereco_uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "cep": "string | null",
  "logradouro": "string",
  "numero": "string",
  "complemento": "string | null",
  "bairro": "string",
  "cidade": "string",
  "estado": "string",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

**Response `204`:** No Content

---

### 10.4 Deletar Endereço da Loja

```
DELETE /proto/enderecos-loja/{loja_uuid}/{endereco_uuid}
Authorization: Bearer <token>
```

**Response `204`:** No Content

**Response `404` (endereço não encontrado):**
```json
{
  "error": "Endereço não encontrado"
}
```

---

## 11. Endereços de Usuário (🔒)

### 11.1 Criar Endereço

```
POST /proto/enderecos-usuario/
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "cep": "string | null",
  "logradouro": "string",
  "numero": "string",
  "complemento": "string | null",
  "bairro": "string",
  "cidade": "string",
  "estado": "string"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440090",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "cep": "01001-000",
  "logradouro": "Rua das Flores",
  "numero": "123",
  "complemento": "Apto 101",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

---

### 11.2 Listar Endereços

```
GET /proto/enderecos-usuario/
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440090",
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "cep": "01001-000",
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Apto 101",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "latitude": -23.5505,
    "longitude": -46.6333
  }
]
```

---

### 11.3 Buscar Endereço

```
GET /proto/enderecos-usuario/{uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440090",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "cep": "01001-000",
  "logradouro": "Rua das Flores",
  "numero": "123",
  "complemento": "Apto 101",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

---

### 11.4 Atualizar Endereço

```
PUT /proto/enderecos-usuario/{uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "cep": "string | null",
  "logradouro": "string",
  "numero": "string",
  "complemento": "string | null",
  "bairro": "string",
  "cidade": "string",
  "estado": "string"
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440090",
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "cep": "01001-000",
  "logradouro": "Rua Nova",
  "numero": "456",
  "complemento": "Casa",
  "bairro": "Jardim",
  "cidade": "São Paulo",
  "estado": "SP",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

---

### 11.5 Deletar Endereço

```
DELETE /proto/enderecos-usuario/{uuid}
Authorization: Bearer <token>
```

**Response `204`:** No Content

---

## 12. Lojas Favoritas (🔒)

### 12.1 Adicionar Favorita

```
POST /proto/favoritos/{loja_uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "uuid": "550e8400-e29b-41d4-a716-446655440100",
  "criado_em": "2026-04-04T00:00:00Z"
}
```

---

### 12.2 Remover Favorita

```
DELETE /proto/favoritos/{loja_uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{ "message": "Loja removida das favoritas" }
```

---

### 12.3 Listar Minhas Favoritas

```
GET /proto/favoritos/minhas
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "usuario_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "uuid": "550e8400-e29b-41d4-a716-446655440100",
    "criado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 12.4 Verificar se é Favorita

```
GET /proto/favoritos/{loja_uuid}/verificar
Authorization: Bearer <token>
```

**Response `200`:**
```json
{ "favorita": true }
```

---

## 13. Produtos (🔒)

### 13.1 Criar Produto

```
POST /proto/produtos/
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "loja_uuid": "uuid",
  "categoria_uuid": "uuid",
  "nome": "Pizza Grande",
  "descricao": "string | null",
  "preco": 49.90,
  "imagem_url": "string | null",
  "disponivel": true,
  "tempo_preparo_min": 30,
  "destaque": false
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440013",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "categoria_uuid": "550e8400-e29b-41d4-a716-446655440070",
  "nome": "Pizza Grande",
  "descricao": "Pizza grande com até 4 sabores",
  "preco": 49.90,
  "imagem_url": "https://example.com/pizza.jpg",
  "disponivel": true,
  "tempo_preparo_min": 30,
  "destaque": false,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z"
}
```

---

### 13.2 Listar Produtos

```
GET /proto/produtos/
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440013",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "categoria_uuid": "550e8400-e29b-41d4-a716-446655440070",
    "nome": "Pizza Grande",
    "descricao": "Pizza grande com até 4 sabores",
    "preco": 49.90,
    "imagem_url": "https://example.com/pizza.jpg",
    "disponivel": true,
    "tempo_preparo_min": 30,
    "destaque": false,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 13.3 Listar Produtos por Categoria

```
GET /proto/produtos/categoria/{categoria_uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440013",
    "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "categoria_uuid": "550e8400-e29b-41d4-a716-446655440070",
    "nome": "Pizza Grande",
    "descricao": "Pizza grande com até 4 sabores",
    "preco": 49.90,
    "imagem_url": "https://example.com/pizza.jpg",
    "disponivel": true,
    "tempo_preparo_min": 30,
    "destaque": false,
    "criado_em": "2026-04-04T00:00:00Z",
    "atualizado_em": "2026-04-04T00:00:00Z"
  }
]
```

---

### 13.4 Buscar Produto por UUID

```
GET /proto/produtos/{uuid}
Authorization: Bearer <token>
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440013",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "categoria_uuid": "550e8400-e29b-41d4-a716-446655440070",
  "nome": "Pizza Grande",
  "descricao": "Pizza grande com até 4 sabores",
  "preco": 49.90,
  "imagem_url": "https://example.com/pizza.jpg",
  "disponivel": true,
  "tempo_preparo_min": 30,
  "destaque": false,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z"
}
```

---

### 13.5 Atualizar Produto

```
PUT /proto/produtos/{uuid}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "string",
  "descricao": "string | null",
  "preco": 59.90,
  "categoria_uuid": "uuid",
  "tempo_preparo_min": 35
}
```

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440013",
  "loja_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "categoria_uuid": "550e8400-e29b-41d4-a716-446655440070",
  "nome": "Pizza Grande Especial",
  "descricao": "Pizza grande premium",
  "preco": 59.90,
  "imagem_url": "https://example.com/pizza.jpg",
  "disponivel": true,
  "tempo_preparo_min": 35,
  "destaque": true,
  "criado_em": "2026-04-04T00:00:00Z",
  "atualizado_em": "2026-04-04T00:00:00Z"
}
```

---

### 13.6 Deletar Produto

```
DELETE /proto/produtos/{uuid}
Authorization: Bearer <token>
```

**Response `204`:** No Content

---

### 13.7 Atualizar Disponibilidade do Produto

```
PUT /proto/produtos/{loja_uuid}/{produto_uuid}/disponibilidade
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "disponivel": false
}
```

> Envie `"disponivel": true` para tornar o produto disponível novamente.

**Response `204`:** No Content

**Response `404` (produto não encontrado):**
```json
{
  "error": "Produto não encontrado"
}
```

**Response `400` (produto não pertence à loja):**
```json
{
  "error": "Produto não pertence a esta loja"
}
```

---

### 13.8 Subir Imagem do Produto

```
POST /proto/produtos/{uuid}/imagem
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:** (multipart form-data)
- `file`: Image file (JPEG, PNG, WebP, etc.)

**Response `200`:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440013",
  "imagem_url": "https://s3.example.com/bucket/produtos/550e8400-...-pizza.jpg",
  "message": "Imagem enviada com sucesso"
}
```

**Environment Variables Required:**
```bash
S3_BUCKET_NAME=your-bucket-name
S3_REGION=us-east-1                 # Optional, default: us-east-1
S3_ENDPOINT=https://s3.example.com  # Optional, for custom endpoints (rust-fs)
S3_ACCESS_KEY_ID=your-access-key    # Optional, for custom endpoints
S3_SECRET_ACCESS_KEY=your-secret-key # Optional, for custom endpoints
```

---

## 13. Utilitários

### 13.1 OK

```
GET /proto/ok
```

**Response `200`:**
```json
{ "msg": "ok" }
```

---

### 13.2 Wipe Database (⚠️ Dev Only)

```
DELETE /proto/wipe
```

> ⚠️ Apenas com `MODE=development`. Apaga todas as tabelas e reaplica migrações.

**Response `200`:**
```json
{
  "message": "Database wiped successfully",
  "warning": "⚠️ All data has been permanently deleted"
}
```

---

## Sumário Completo de Endpoints

| # | Método | Rota | Auth | Admin |
|---|--------|------|------|-------|
| 1 | `GET` | `/` | — | — |
| 2 | `POST` | `/proto/auth/signup` | — | — |
| 3 | `POST` | `/proto/auth/login` | — | — |
| 4 | `GET` | `/proto/auth/me` | 🔒 | — |
| 5 | `GET` | `/proto/lojas/` | — | — |
| 6 | `GET` | `/proto/lojas/pesquisar` | — | — |
| 7 | `GET` | `/proto/lojas/{uuid}` | — | — |
| 8 | `GET` | `/proto/lojas/slug/{slug}` | — | — |
| 9 | `GET` | `/proto/lojas/verificar-slug/{slug}` | — | — |
| 9.1 | `PATCH` | `/proto/lojas/{uuid}/bloqueado` | 🔒 + 👑 Owner | — |
| 10 | `GET` | `/proto/usuarios/?classe=...` | 🔒 + 👑 Owner | — |
| 10.1 | `PATCH` | `/proto/usuarios/{uuid}/marcar-remocao` | 🔒 (Self/Owner) | — |
| 10.2 | `PATCH` | `/proto/usuarios/{uuid}/desmarcar-remocao` | 🔒 (Self/Owner) | — |
| 10.3 | `PUT` | `/proto/usuarios/{uuid}/ativo` | 🔒 + 👑 Owner | — |
| 10.4 | `PATCH` | `/proto/usuarios/{uuid}/bloqueado` | 🔒 + 👑 Owner | — |
| 11 | `POST` | `/proto/admin/lojas` | 🔒 | 👑 |
| 12 | `GET` | `/proto/admin/lojas/listar` | 🔒 | — |
| 13 | `POST` | `/proto/admin/lojas/{loja_uuid}/funcionarios` | 🔒 | 👑 |
| 14 | `POST` | `/proto/admin/lojas/{loja_uuid}/entregadores` | 🔒 | 👑 |
| 15 | `POST` | `/proto/admin/lojas/{loja_uuid}/clientes` | 🔒 | 👑 |
| 16 | `POST` | `/proto/pedidos/criar` | 🔒 | — |
| 17 | `GET` | `/proto/pedidos/listar` | 🔒 | — |
| 17.1 | `GET` | `/proto/pedidos/meus` | 🔒 | — |
| 18 | `GET` | `/proto/pedidos/por-loja/{loja_uuid}` | 🔒 | — |
| 19 | `GET` | `/proto/pedidos/{uuid}` | 🔒 | — |
| 20 | `GET` | `/proto/pedidos/{uuid}/com-entrega` | 🔒 | — |
| 21 | `PUT` | `/proto/pedidos/{uuid}/status` | 🔒 | — |
| 22 | `PUT` | `/proto/pedidos/{pedido_uuid}/entregador/{loja_uuid}` | 🔒 | — |
| 23 | `DELETE` | `/proto/pedidos/{pedido_uuid}/entregador/{loja_uuid}` | 🔒 | — |
| 24 | `GET` | `/proto/pedidos/{pedido_uuid}/com-entregador` | 🔒 | — |
| 25 | `POST` | `/proto/cupons/` | 🔒 | — |
| 26 | `GET` | `/proto/cupons/` | 🔒 | — |
| 27 | `GET` | `/proto/cupons/{uuid}` | 🔒 | — |
| 28 | `PUT` | `/proto/cupons/{uuid}` | 🔒 | — |
| 29 | `DELETE` | `/proto/cupons/{uuid}` | 🔒 | — |
| 29.1 | `PATCH` | `/proto/cupons/{uuid}/status` | 🔒 | — |
| 30 | `POST` | `/proto/marketing/{loja_uuid}/cupons` | 🔒 | — |
| 31 | `GET` | `/proto/marketing/cupons/{codigo}` | — | — |
| 32 | `GET` | `/proto/marketing/cupons` | 🔒 | — |
| 33 | `POST` | `/proto/marketing/{loja_uuid}/avaliar-loja` | 🔒 | — |
| 34 | `POST` | `/proto/marketing/{loja_uuid}/avaliar-produto` | 🔒 | — |
| 34.1 | `GET` | `/proto/marketing/{loja_uuid}/avaliacoes-loja` | 🔒 | — |
| 34.2 | `GET` | `/proto/marketing/avaliacoes-loja/{uuid}` | 🔒 | — |
| 34.3 | `PUT` | `/proto/marketing/avaliacoes-loja/{uuid}` | 🔒 | — |
| 34.4 | `DELETE` | `/proto/marketing/avaliacoes-loja/{uuid}` | 🔒 | — |
| 34.5 | `GET` | `/proto/marketing/{loja_uuid}/avaliacoes-produto` | 🔒 | — |
| 34.6 | `GET` | `/proto/marketing/avaliacoes-produto/produto/{produto_uuid}` | 🔒 | — |
| 34.7 | `GET` | `/proto/marketing/avaliacoes-produto/{uuid}` | 🔒 | — |
| 34.8 | `PUT` | `/proto/marketing/avaliacoes-produto/{uuid}` | 🔒 | — |
| 34.9 | `DELETE` | `/proto/marketing/avaliacoes-produto/{uuid}` | 🔒 | — |
| 35 | `POST` | `/proto/marketing/{loja_uuid}/promocoes` | 🔒 | — |
| 36 | `GET` | `/proto/marketing/{loja_uuid}/promocoes` | 🔒 | — |
| 37 | `PUT` | `/proto/marketing/{loja_uuid}/promocoes/{uuid}` | 🔒 | — |
| 38 | `DELETE` | `/proto/marketing/{loja_uuid}/promocoes/{uuid}` | 🔒 | — |
| 39 | `POST` | `/proto/catalogo/{loja_uuid}/adicionais` | 🔒 | — |
| 40 | `GET` | `/proto/catalogo/{loja_uuid}/adicionais` | 🔒 | — |
| 41 | `GET` | `/proto/catalogo/{loja_uuid}/adicionais/disponiveis` | 🔒 | — |
| 42 | `PUT` | `/proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}` | 🔒 | — |
| 43 | `PUT` | `/proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}/disponibilidade` | 🔒 | — |
| 44 | `DELETE` | `/proto/catalogo/{loja_uuid}/adicionais/{adicional_uuid}` | 🔒 | — |
| 45 | `POST` | `/proto/catalogo/{loja_uuid}/categorias` | 🔒 | — |
| 46 | `GET` | `/proto/catalogo/{loja_uuid}/categorias` | 🔒 | — |
| 47 | `PUT` | `/proto/catalogo/{loja_uuid}/categorias/{uuid}` | 🔒 | — |
| 48 | `DELETE` | `/proto/catalogo/{loja_uuid}/categorias/{uuid}` | 🔒 | — |
| 49 | `POST` | `/proto/enderecos-entrega/{pedido_uuid}/{loja_uuid}` | 🔒 | — |
| 50 | `GET` | `/proto/enderecos-entrega/{pedido_uuid}` | 🔒 | — |
| 51 | `GET` | `/proto/enderecos-entrega/{loja_uuid}/loja` | 🔒 | — |
| 52 | `GET` | `/proto/enderecos-loja/{loja_uuid}` | 🔒 | — |
| 53 | `POST` | `/proto/enderecos-loja/{loja_uuid}` | 🔒 | — |
| 54 | `PUT` | `/proto/enderecos-loja/{loja_uuid}/{endereco_uuid}` | 🔒 | — |
| 55 | `DELETE` | `/proto/enderecos-loja/{loja_uuid}/{endereco_uuid}` | 🔒 | — |
| 56 | `POST` | `/proto/enderecos-usuario/` | 🔒 | — |
| 57 | `GET` | `/proto/enderecos-usuario/` | 🔒 | — |
| 58 | `GET` | `/proto/enderecos-usuario/{uuid}` | 🔒 | — |
| 59 | `PUT` | `/proto/enderecos-usuario/{uuid}` | 🔒 | — |
| 60 | `DELETE` | `/proto/enderecos-usuario/{uuid}` | 🔒 | — |
| 61 | `POST` | `/proto/favoritos/{loja_uuid}` | 🔒 | — |
| 62 | `DELETE` | `/proto/favoritos/{loja_uuid}` | 🔒 | — |
| 63 | `GET` | `/proto/favoritos/minhas` | 🔒 | — |
| 64 | `GET` | `/proto/favoritos/{loja_uuid}/verificar` | 🔒 | — |
| 65 | `POST` | `/proto/produtos/` | 🔒 | — |
| 66 | `GET` | `/proto/produtos/` | 🔒 | — |
| 67 | `GET` | `/proto/produtos/categoria/{categoria_uuid}` | 🔒 | — |
| 68 | `GET` | `/proto/produtos/{uuid}` | 🔒 | — |
| 69 | `PUT` | `/proto/produtos/{uuid}` | 🔒 | — |
| 70 | `DELETE` | `/proto/produtos/{uuid}` | 🔒 | — |
| 71 | `PUT` | `/proto/produtos/{loja_uuid}/{produto_uuid}/disponibilidade` | 🔒 | — |
| 72 | `POST` | `/proto/produtos/{uuid}/imagem` | 🔒 | — |
| 73 | `GET` | `/proto/ok` | — | — |
| 74 | `DELETE` | `/proto/wipe` ⚠️ | 🔒 + 👑 Owner | — |

**Total: 92 endpoints**

> **Legenda:** 🔒 = JWT required, 👑 Owner = apenas dono da plataforma (OWNER_EMAIL), 👑 Admin = administrador, (Self/Owner) = próprio usuário ou owner
