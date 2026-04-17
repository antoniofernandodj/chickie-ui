# Pendências — Chickie UI (Frontend)

> Lista completa de funcionalidades que a API oferece mas ainda não foram implementadas no frontend Angular.
> Marcadas como `PENDENTE` por padrão. Peça para marcar como `OK` quando testar/implementar.

---

## 🔐 Autenticação

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 1 | Cadastrar usuário (cliente/admin) | `POST /proto/auth/signup` | ✅ OK |
| 2 | Login | `POST /proto/auth/login` | ✅ OK |
| 3 | Listar usuários (admin) | `GET /proto/usuarios/` | ⏳ PENDENTE |

---

## 🏪 Lojas Públicas

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 4 | Listar todas as lojas | `GET /proto/lojas/` | ✅ OK |
| 5 | Pesquisar lojas por termo | `GET /proto/lojas/pesquisar?termo=` | ✅ OK |
| 6 | Buscar loja por UUID | `GET /proto/lojas/{uuid}` | ✅ OK |
| 7 | Buscar loja por slug | `GET /proto/lojas/slug/{slug}` | ✅ OK |

---

## 👑 Administração — Lojas

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 8 | Criar loja | `POST /proto/admin/lojas` | ✅ OK |
| 9 | Listar todas as lojas (admin) | `GET /proto/admin/lojas/listar` | ⏳ PENDENTE |
| 10 | Listar minhas lojas (admin) | `GET /proto/admin/minhas-lojas` | ✅ OK |
| 11 | Adicionar funcionário | `POST /proto/admin/lojas/{uuid}/funcionarios` | ✅ OK |
| 12 | Adicionar entregador | `POST /proto/admin/lojas/{uuid}/entregadores` | ✅ OK |
| 13 | Adicionar cliente | `POST /proto/admin/lojas/{uuid}/clientes` | ⏳ PENDENTE |

---

## 👑 Administração — Equipe

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 14 | Atualizar funcionário | `PUT /proto/funcionarios/{loja_uuid}/{uuid}` | ⏳ PENDENTE |
| 15 | Trocar email/senha de funcionário | `PUT /proto/funcionarios/{loja_uuid}/usuarios/{usuario_uuid}/credenciais` | ⏳ PENDENTE |
| 16 | Atualizar entregador | `PUT /proto/entregadores/{loja_uuid}/{uuid}` | ⏳ PENDENTE |
| 17 | Trocar email/senha de entregador | `PUT /proto/entregadores/{loja_uuid}/usuarios/{usuario_uuid}/credenciais` | ⏳ PENDENTE |

---

## 📦 Produtos

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 18 | Listar produtos | `GET /proto/produtos/` | ✅ OK |
| 19 | Criar produto | `POST /proto/produtos/` | ⏳ PENDENTE |
| 20 | Atualizar produto | `PUT /proto/produtos/{uuid}` | ⏳ PENDENTE |

---

## 📂 Catálogo (Categorias e Adicionais)

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 21 | Criar categoria | `POST /proto/catalogo/{loja_uuid}/categorias` | ⏳ PENDENTE |
| 22 | Criar adicional | `POST /proto/catalogo/{loja_uuid}/adicionais` | ⏳ PENDENTE |
| 23 | Listar todos os adicionais | `GET /proto/catalogo/{loja_uuid}/adicionais` | ⏳ PENDENTE |
| 24 | Listar adicionais disponíveis | `GET /proto/catalogo/{loja_uuid}/adicionais/disponiveis` | ⏳ PENDENTE |
| 25 | Marcar adicional como indisponível | `PUT /proto/catalogo/{loja_uuid}/adicionais/{uuid}/indisponivel` | ⏳ PENDENTE |

---

## 🛒 Pedidos — Cliente

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 26 | Criar pedido (checkout) | `POST /proto/pedidos/criar` | ⏳ PENDENTE |
| 27 | Listar meus pedidos | `GET /proto/pedidos/` | ✅ OK |
| 28 | Buscar pedido por UUID | `GET /proto/pedidos/{uuid}` | ✅ OK |
| 29 | Buscar pedido com endereço de entrega | `GET /proto/pedidos/{uuid}/com-entrega` | ⏳ PENDENTE |

---

## 🏪 Pedidos — Gestão da Loja

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 30 | Listar pedidos por loja | `GET /proto/pedidos/por-loja/{loja_uuid}` | ⏳ PENDENTE |
| 31 | Atualizar status do pedido | `PUT /proto/pedidos/{uuid}/status` | ⏳ PENDENTE |

---

## 🎫 Cupons

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 32 | Criar cupom | `POST /proto/marketing/{loja_uuid}/cupons` | ⏳ PENDENTE |
| 33 | Listar cupons da loja | `GET /proto/marketing/cupons` | ⏳ PENDENTE |
| 34 | Validar cupom | `GET /proto/marketing/cupons/{codigo}` | ⏳ PENDENTE |
| 35 | Atualizar cupom | `PUT /proto/cupons/admin/{loja_uuid}/{uuid}` | ⏳ PENDENTE |
| 36 | Deletar cupom | `DELETE /proto/cupons/admin/{loja_uuid}/{uuid}` | ⏳ PENDENTE |

---

## ⭐ Avaliações

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 37 | Avaliar loja | `POST /proto/marketing/{loja_uuid}/avaliar-loja` | ⏳ PENDENTE |
| 38 | Avaliar produto | `POST /proto/marketing/{loja_uuid}/avaliar-produto` | ⏳ PENDENTE |

---

## 🏷️ Promoções

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 39 | Criar promoção | `POST /proto/marketing/{loja_uuid}/promocoes` | ⏳ PENDENTE |
| 40 | Listar promoções | `GET /proto/marketing/{loja_uuid}/promocoes` | ⏳ PENDENTE |
| 41 | Atualizar promoção | `PUT /proto/marketing/{loja_uuid}/promocoes/{uuid}` | ⏳ PENDENTE |
| 42 | Deletar promoção | `DELETE /proto/marketing/{loja_uuid}/promocoes/{uuid}` | ⏳ PENDENTE |

---

## 🛵 Endereços de Entrega (por pedido)

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 43 | Criar endereço para pedido | `POST /proto/enderecos-entrega/{pedido_uuid}/{loja_uuid}` | ⏳ PENDENTE |
| 44 | Buscar endereço do pedido | `GET /proto/enderecos-entrega/{pedido_uuid}` | ⏳ PENDENTE |

---

## 📍 Endereços de Usuário

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 45 | Criar endereço | `POST /proto/enderecos-usuario/` | ✅ OK |
| 46 | Listar endereços | `GET /proto/enderecos-usuario/` | ✅ OK |
| 47 | Buscar endereço | `GET /proto/enderecos-usuario/{uuid}` | ✅ OK |
| 48 | Atualizar endereço | `PUT /proto/enderecos-usuario/{uuid}` | ✅ OK |
| 49 | Deletar endereço | `DELETE /proto/enderecos-usuario/{uuid}` | ✅ OK |

---

## ❤️ Lojas Favoritas

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 50 | Adicionar aos favoritos | `POST /proto/favoritos/{loja_uuid}` | ✅ OK |
| 51 | Remover dos favoritos | `DELETE /proto/favoritos/{loja_uuid}` | ✅ OK |
| 52 | Listar minhas favoritas | `GET /proto/favoritos/minhas` | ✅ OK |
| 53 | Verificar se loja é favorita | `GET /proto/favoritos/{loja_uuid}/verificar` | ✅ OK |

---

## ⏰ Horários de Funcionamento

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 54 | Listar horários | `GET /proto/horarios/{loja_uuid}` | ⏳ PENDENTE |
| 55 | Criar ou atualizar horário | `POST /proto/horarios/{loja_uuid}` | ⏳ PENDENTE |
| 56 | Ativar/desativar dia | `PUT /proto/horarios/{loja_uuid}/dia/{dia_semana}/ativo` | ⏳ PENDENTE |
| 57 | Deletar horário do dia | `DELETE /proto/horarios/{loja_uuid}/dia/{dia_semana}` | ⏳ PENDENTE |

---

## ⚙️ Configurações de Pedido da Loja

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 58 | Buscar configuração | `GET /proto/config-pedido/{loja_uuid}` | ⏳ PENDENTE |
| 59 | Salvar configuração | `PUT /proto/config-pedido/{loja_uuid}` | ⏳ PENDENTE |

---

## 🥬 Ingredientes

| # | Funcionalidade | Endpoint API | Status |
|---|---------------|-------------|--------|
| 60 | Criar ingrediente | `POST /proto/ingredientes/{loja_uuid}` | ⏳ PENDENTE |
| 61 | Listar ingredientes | `GET /proto/ingredientes/{loja_uuid}` | ⏳ PENDENTE |
| 62 | Atualizar ingrediente | `PUT /proto/ingredientes/{loja_uuid}/{uuid}` | ⏳ PENDENTE |
| 63 | Deletar ingrediente | `DELETE /proto/ingredientes/{loja_uuid}/{uuid}` | ⏳ PENDENTE |

---

## 🛒 Fluxo de Checkout (Inteiro)

| # | Funcionalidade | Descrição | Status |
|---|---------------|-----------|--------|
| 64 | Carrinho de compras | Componente de carrinho (adicionar/remover itens, quantidades, adicionais) | ⏳ PENDENTE |
| 65 | Selecionar produto na loja | Modal de produto com opções de partes e adicionais | ⏳ PENDENTE |
| 66 | Montar pedido com partes | Ex: pizza meio-a-meio com diferentes sabores por fatia | ⏳ PENDENTE |
| 67 | Aplicar cupom de desconto | Validar e aplicar cupom no checkout | ⏳ PENDENTE |
| 68 | Selecionar forma de pagamento | PIX, cartão, dinheiro | ⏳ PENDENTE |
| 69 | Selecionar endereço de entrega | Usar endereço salvo ou criar novo | ⏳ PENDENTE |
| 70 | Confirmar pedido | Finalizar e redirecionar para detalhe | ⏳ PENDENTE |

---

## 📊 Dashboard / Gestão da Loja

| # | Funcionalidade | Descrição | Status |
|---|---------------|-----------|--------|
| 71 | Gerenciar produtos | CRUD de produtos no admin | ⏳ PENDENTE |
| 72 | Gerenciar categorias | CRUD de categorias no admin | ⏳ PENDENTE |
| 73 | Gerenciar adicionais | CRUD de adicionais no admin | ⏳ PENDENTE |
| 74 | Gerenciar ingredientes | CRUD de ingredientes no admin | ⏳ PENDENTE |
| 75 | Gerenciar cupons | CRUD de cupons no admin | ⏳ PENDENTE |
| 76 | Gerenciar promoções | CRUD de promoções no admin | ⏳ PENDENTE |
| 77 | Gerenciar pedidos recebidos | Lista de pedidos da loja + mudança de status | ⏳ PENDENTE |
| 78 | Gerenciar horários | Configurar horários de funcionamento | ⏳ PENDENTE |
| 79 | Gerenciar configurações de pedido | Max partes, tipo de cálculo | ⏳ PENDENTE |
| 80 | Gerenciar funcionários | Listar, atualizar, trocar credenciais | ⏳ PENDENTE |
| 81 | Gerenciar entregadores | Listar, atualizar, trocar credenciais | ⏳ PENDENTE |

---

## 🎨 Melhorias de UX/UI

| # | Funcionalidade | Descrição | Status |
|---|---------------|-----------|--------|
| 82 | Feedback ao remover favorito | Usar re-fetch otimista ao invés de `location.reload()` | ⏳ PENDENTE |
| 83 | Feedback ao adicionar/remover favorito | Toast/notificação visual | ⏳ PENDENTE |
| 84 | Avaliar loja após entrega | UI para avaliar loja e produtos pós-entrega | ⏳ PENDENTE |
| 85 | Exibir avaliações na página da loja | Mostrar notas e comentários | ⏳ PENDENTE |
| 86 | Skeleton loading em mais páginas | Melhorar percepção de performance | ⏳ PENDENTE |
| 87 | Tratamento de erros visual | Exibir mensagens amigáveis ao usuário em caso de erro | ⏳ PENDENTE |

---

## Resumo

| Categoria | Total | OK | Pendentes |
|-----------|-------|----|-----------|
| Autenticação | 3 | 2 | 1 |
| Lojas Públicas | 4 | 4 | 0 |
| Administração — Lojas | 6 | 3 | 3 |
| Administração — Equipe | 4 | 0 | 4 |
| Produtos | 3 | 1 | 2 |
| Catálogo | 5 | 0 | 5 |
| Pedidos — Cliente | 4 | 3 | 1 |
| Pedidos — Gestão | 2 | 0 | 2 |
| Cupons | 5 | 0 | 5 |
| Avaliações | 2 | 0 | 2 |
| Promoções | 4 | 0 | 4 |
| Endereços de Entrega | 2 | 0 | 2 |
| Endereços de Usuário | 5 | 5 | 0 |
| Lojas Favoritas | 4 | 4 | 0 |
| Horários | 4 | 0 | 4 |
| Configurações de Pedido | 2 | 0 | 2 |
| Ingredientes | 4 | 0 | 4 |
| Fluxo de Checkout | 7 | 0 | 7 |
| Dashboard / Gestão | 11 | 0 | 11 |
| Melhorias de UX/UI | 6 | 0 | 6 |
| **TOTAL** | **87** | **22** | **65** |

---

> Para atualizar o status, diga algo como: "marca o item 64 como OK" ou "o checkout está pronto, marca como OK".
