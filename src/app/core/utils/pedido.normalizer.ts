import { Pedido, StatusPedido, ItemPedido, AdicionalDeItemDePedido, ParteDeItemPedido } from '../models';

export class PedidoNormalizer {
  static normalizarPedido(pedido: any): Pedido {
    if (!pedido) return pedido;

    const normalizado: Pedido = {
      ...pedido,
      status: this.normalizarStatus(pedido.status),
      total: this.parseNumber(pedido.total),
      subtotal: this.parseNumber(pedido.subtotal),
      taxa_entrega: this.parseNumber(pedido.taxa_entrega || '0'),
      desconto: this.parseNumber(pedido.desconto || '0'),
      itens: this.normalizarItens(pedido.itens || []),
      partes: this.normalizarPartes(pedido.partes || []),
      endereco_entrega: pedido.endereco_entrega ? {
        ...pedido.endereco_entrega,
        latitude: this.parseNumber(pedido.endereco_entrega.latitude),
        longitude: this.parseNumber(pedido.endereco_entrega.longitude),
      } : null,
    };

    return normalizado;
  }

  static normalizarItens(itens: any[]): ItemPedido[] {
    return itens.map(item => ({
      ...item,
      adicionais: this.normalizarAdicionais(item.adicionais || []),
      partes: this.normalizarPartes(item.partes || []),
    }));
  }

  static normalizarAdicionais(adicionais: any[]): AdicionalDeItemDePedido[] {
    return adicionais.map(adicional => ({
      ...adicional,
      preco: this.parseNumber(adicional.preco),
    }));
  }

  static normalizarPartes(partes: any[]): ParteDeItemPedido[] {
    return partes.map(parte => ({
      ...parte,
      preco_unitario: this.parseNumber(parte.preco_unitario),
      adicionais: this.normalizarAdicionais(parte.adicionais || []),
    }));
  }

  static normalizarPedidos(pedidos: any[]): Pedido[] {
    return pedidos.map(pedido => this.normalizarPedido(pedido));
  }

  private static normalizarStatus(status: any): StatusPedido {
    return typeof status === 'string'
      ? status.toLowerCase() as StatusPedido
      : status;
  }

  private static parseNumber(value: any): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }
}
