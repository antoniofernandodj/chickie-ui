// ─── Enums ───────────────────────────────────────────────────────────────────

export type ClasseUsuario =
  | 'cliente'
  | 'administrador'
  | 'funcionario'
  | 'entregador'
  | 'owner';

export type StatusPedido =
  | 'criado'
  | 'aguardando_confirmacao_de_loja'
  | 'confirmado_pela_loja'
  | 'em_preparo'
  | 'pronto_para_retirada'
  | 'saiu_para_entrega'
  | 'entregue';

export type TipoDesconto = 'percentual' | 'fixo';

export type TipoEscopo = 'loja' | 'produto' | 'categoria';

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface SignupRequest {
  nome: string;
  username: string;
  senha: string;
  email: string;
  telefone: string;
  auth_method: string;
  classe?: ClasseUsuario;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'Bearer';
}

// ─── Usuario ─────────────────────────────────────────────────────────────────

export interface Usuario {
  uuid: string;
  nome: string;
  username: string;
  email: string;
  telefone: string;
  auth_method: string;
  classe: ClasseUsuario;
  criado_em?: string;
  atualizado_em?: string;
}

// ─── Loja ─────────────────────────────────────────────────────────────────────

export interface Loja {
  uuid: string;
  nome: string;
  slug: string;
  email_contato: string;
  descricao: string | null;
  telefone: string | null;
  hora_abertura: string | null;
  hora_fechamento: string | null;
  dias_funcionamento: string | null;
  tempo_medio: number;
  nota_media: number;
  taxa_entrega_base: number;
  pedido_minimo: number;
  max_partes: number;
  criado_em?: string;
  atualizado_em?: string;
}

export interface CreateLojaRequest {
  nome: string;
  slug: string;
  email_contato: string;
  descricao?: string | null;
  telefone?: string | null;
  hora_abertura?: string | null;
  hora_fechamento?: string | null;
  dias_funcionamento?: string | null;
  tempo_medio: number;
  nota_media: number;
  taxa_entrega_base: number;
  pedido_minimo: number;
  max_partes: number;
}

// ─── Funcionario ─────────────────────────────────────────────────────────────

export interface Funcionario {
  uuid: string;
  loja_uuid: string;
  usuario_uuid: string;
  nome: string;
  username: string;
  email: string;
  celular: string;
  cargo: string | null;
  salario: number;
  data_admissao: string;
}

export interface CreateFuncionarioRequest {
  nome: string;
  username: string;
  email: string;
  senha: string;
  celular: string;
  cargo?: string | null;
  salario: number;
  data_admissao: string;
}

// ─── Entregador ───────────────────────────────────────────────────────────────

export interface Entregador {
  uuid: string;
  loja_uuid: string;
  usuario_uuid: string;
  nome: string;
  username: string;
  email: string;
  celular: string;
  veiculo: string | null;
  placa: string | null;
}

export interface CreateEntregadorRequest {
  nome: string;
  username: string;
  email: string;
  senha: string;
  celular: string;
  veiculo?: string | null;
  placa?: string | null;
}

// ─── Cliente ──────────────────────────────────────────────────────────────────

export interface Cliente {
  uuid: string;
  loja_uuid: string;
  usuario_uuid: string;
  nome: string;
  username: string;
  email: string;
  celular: string;
}

export interface CreateClienteRequest {
  nome: string;
  username: string;
  email: string;
  senha: string;
  celular: string;
}

// ─── Produto ─────────────────────────────────────────────────────────────────

export interface Produto {
  uuid: string;
  categoria_uuid: string;
  nome: string;
  descricao: string | null;
  preco: number;
  imagem_url: string | null;
  disponivel: boolean;
  tempo_preparo_min: number;
  destaque: boolean;
  criado_em: string;
  atualizado_em: string;
}

export interface CreateProdutoRequest {
  uuid?: string;
  categoria_uuid: string;
  nome: string;
  descricao?: string | null;
  preco: number;
  imagem_url?: string | null;
  disponivel: boolean;
  tempo_preparo_min: number;
  destaque: boolean;
  criado_em?: string;
  atualizado_em?: string;
}

export interface UpdateProdutoRequest {
  nome: string;
  descricao?: string | null;
  preco: number;
  categoria_uuid: string;
  tempo_preparo_min: number;
}

// ─── Adicional ────────────────────────────────────────────────────────────────

export interface Adicional {
  uuid: string;
  loja_uuid: string;
  nome: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
}

export interface CreateAdicionalRequest {
  nome: string;
  descricao: string;
  preco: number;
}

// ─── Categoria ────────────────────────────────────────────────────────────────

export interface CategoriaProdutos {
  uuid: string;
  loja_uuid: string;
  nome: string;
  descricao: string | null;
  ordem: number;
}

export interface CreateCategoriaRequest {
  nome: string;
  descricao?: string | null;
  ordem: number;
}

// ─── Pedido ──────────────────────────────────────────────────────────────────

export interface AdicionalDeItemDePedido {
  uuid: string;
  nome: string;
  descricao: string;
  preco: number;
}

export interface ParteDeItemPedido {
  produto_uuid: string;
  posicao: number;
  produto_nome?: string;
  preco_unitario?: number;
  adicionais?: AdicionalDeItemDePedido[];
}

export interface ItemPedido {
  uuid?: string;
  quantidade: number;
  observacoes?: string | null;
  partes: ParteDeItemPedido[];
}

export interface EnderecoEntregaInput {
  cep?: string | null;
  logradouro: string;
  numero: string;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface CreatePedidoRequest {
  loja_uuid?: string;
  taxa_entrega: number;
  forma_pagamento: string;
  observacoes?: string | null;
  codigo_cupom?: string | null;
  itens: ItemPedido[];
  endereco_entrega: EnderecoEntregaInput;
}

export interface Pedido {
  uuid: string;
  loja_uuid?: string;
  usuario_uuid?: string;
  status: StatusPedido;
  total?: number;
  taxa_entrega: number;
  forma_pagamento: string;
  observacoes: string | null;
  itens?: ItemPedido[];
  criado_em?: string;
  atualizado_em?: string;
}

export interface StatusPedidoResponse {
  uuid: string;
  status: StatusPedido;
  transicoes_permitidas: StatusPedido[];
}

export interface PedidoComEntrega {
  pedido: Pedido;
  endereco_entrega: EnderecoEntrega | null;
}

export interface UpdateStatusPedidoRequest {
  novo_status: StatusPedido;
}

// ─── Endereço de Entrega ──────────────────────────────────────────────────────

export interface EnderecoEntrega {
  uuid: string;
  pedido_uuid: string;
  loja_uuid?: string;
  cep: string | null;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
}

// ─── Endereço de Usuário ──────────────────────────────────────────────────────

export interface EnderecoUsuario {
  uuid: string;
  usuario_uuid: string;
  cep: string | null;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface EnderecoUsuarioRequest {
  cep?: string | null;
  logradouro: string;
  numero: string;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  estado: string;
}

// ─── Cupom ────────────────────────────────────────────────────────────────────

export interface Cupom {
  uuid: string;
  loja_uuid?: string;
  codigo: string;
  descricao: string;
  tipo_desconto: TipoDesconto;
  valor_desconto: number;
  valor_minimo: number;
  data_validade: string;
  limite_uso: number;
}

export interface CreateCupomRequest {
  codigo: string;
  descricao: string;
  tipo_desconto: TipoDesconto;
  valor_desconto: number;
  valor_minimo: number;
  data_validade: string;
  limite_uso: number;
}

// ─── Avaliação ────────────────────────────────────────────────────────────────

export interface AvaliacaoDeLoja {
  uuid: string;
  loja_uuid: string;
  usuario_uuid: string;
  nota: number;
  comentario: string | null;
  criado_em?: string;
}

export interface AvaliarLojaRequest {
  nota: number;
  comentario?: string | null;
}

export interface AvaliacaoDeProduto {
  uuid: string;
  loja_uuid: string;
  produto_uuid: string;
  usuario_uuid: string;
  nota: number;
  descricao: string;
  comentario: string | null;
  criado_em?: string;
}

export interface AvaliarProdutoRequest {
  produto_uuid: string;
  nota: number;
  descricao: string;
  comentario?: string | null;
}

// ─── Promoção ─────────────────────────────────────────────────────────────────

export interface Promocao {
  uuid: string;
  loja_uuid: string;
  nome: string;
  descricao: string;
  tipo_desconto: TipoDesconto;
  valor_desconto: number;
  valor_minimo: number | null;
  data_inicio: string;
  data_fim: string;
  dias_semana_validos: number[];
  tipo_escopo: TipoEscopo;
  produto_uuid: string | null;
  categoria_uuid: string | null;
  prioridade: number;
}

export interface CreatePromocaoRequest {
  nome: string;
  descricao: string;
  tipo_desconto: TipoDesconto;
  valor_desconto: number;
  valor_minimo?: number | null;
  data_inicio: string;
  data_fim: string;
  dias_semana_validos: number[];
  tipo_escopo: TipoEscopo;
  produto_uuid?: string | null;
  categoria_uuid?: string | null;
  prioridade: number;
}

// ─── Favoritos ────────────────────────────────────────────────────────────────

export interface LojaFavorita {
  uuid: string;
  usuario_uuid: string;
  loja_uuid: string;
}

// ─── Respostas genéricas ──────────────────────────────────────────────────────

export interface ApiError {
  error: string;
}

export interface MessageResponse {
  message: string;
}

export interface FavoritaResponse {
  favorita: boolean;
}

export interface CreatePedidoResponse {
  uuid: string;
}
