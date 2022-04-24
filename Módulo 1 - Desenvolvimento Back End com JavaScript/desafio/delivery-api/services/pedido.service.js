import PedidoRepository from '../repositories/pedido.repository.js';

async function createPedido(pedido) {
  return await PedidoRepository.createPedido(pedido);
}

async function updatePedido(pedido) {
  return await PedidoRepository.updatePedido(pedido);
}

async function updateStatusPedido(pedido) {
  return await PedidoRepository.updateStatusPedido(pedido);
}

async function deletePedido(id) {
  return await PedidoRepository.deletePedido(id);
}

async function getPedido(id) {
  return await PedidoRepository.getPedido(id);
}

async function getTotalCliente(nomeCliente) {
  const pedidos = await PedidoRepository.getPedidos();
  const total = pedidos
    .filter((p) => p.cliente === nomeCliente && p.entregue)
    .map((p) => p.valor)
    .reduce((prev, curr) => prev + curr, 0);

  return total;
}

async function getTotalProduto(nomeProduto) {
  const pedidos = await PedidoRepository.getPedidos();
  const total = pedidos
    .filter((p) => p.produto === nomeProduto && p.entregue)
    .map((p) => p.valor)
    .reduce((prev, curr) => prev + curr, 0);

  return total;
}

async function getMaisPedidos() {
  const pedidos = await PedidoRepository.getPedidos();
  const lista = [];

  pedidos
    .filter((p) => p.entregue)
    .forEach((p) => {
      const index = lista.findIndex((it) => it.produto === p.produto);
      if (index === -1) {
        lista.push({ produto: p.produto, quantidade: 1 });
      } else {
        lista[index].quantidade++;
      }
    });

  lista.sort((a, b) => b.quantidade - a.quantidade);

  return lista.map((it) => it.produto + ' - ' + it.quantidade);
}

export default {
  createPedido,
  updatePedido,
  updateStatusPedido,
  deletePedido,
  getPedido,
  getTotalCliente,
  getTotalProduto,
  getMaisPedidos,
};
