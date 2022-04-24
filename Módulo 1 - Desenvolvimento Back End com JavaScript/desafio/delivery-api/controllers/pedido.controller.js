import PedidoService from '../services/pedido.service.js';

async function createPedido(req, res, next) {
  try {
    let pedido = req.body;

    if (!pedido.cliente || !pedido.produto || pedido.valor == null)
      throw new Error('Cliente, produto e valor são obrigatórios.');

    res.status(200).send(await PedidoService.createPedido(pedido));
  } catch (error) {
    next(error);
  }
}

async function updatePedido(req, res, next) {
  try {
    const pedido = req.body;

    // prettier-ignore
    if (!pedido.id || !pedido.cliente || !pedido.produto || pedido.valor == null)
      throw new Error('ID, cliente, produto, entregue e valor são obrigatórios.');

    res.status(200).send(await PedidoService.updatePedido(pedido));
  } catch (error) {
    next(error);
  }
}

async function updateStatusPedido(req, res, next) {
  try {
    let pedido = req.body;

    if (!pedido.id) throw new Error('ID é obrigatório!');

    res.status(200).send(await PedidoService.updateStatusPedido(pedido));
  } catch (error) {
    next(error);
  }
}

async function deletePedido(req, res, next) {
  try {
    await PedidoService.deletePedido(req.params.id);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
}

async function getPedido(req, res, next) {
  try {
    res.status(200).send(await PedidoService.getPedido(req.params.id));
  } catch (error) {
    next(error);
  }
}

async function totalCliente(req, res, next) {
  try {
    const nomeCliente = req.body.cliente;

    if (!nomeCliente) throw new Error('Cliente não informado.');

    res.send({
      totalCliente: await PedidoService.getTotalCliente(nomeCliente),
    });
  } catch (err) {
    next(err);
  }
}

async function totalProduto(req, res, next) {
  try {
    const nomeProduto = req.body.produto;

    if (!nomeProduto) throw new Error('Produto não informado.');

    res.send({
      totalProduto: await PedidoService.getTotalProduto(nomeProduto),
    });
  } catch (err) {
    next(err);
  }
}

async function maisPedidos(req, res, next) {
  try {
    res.send(await PedidoService.getMaisPedidos());
  } catch (err) {
    next(err);
  }
}

export default {
  createPedido,
  updatePedido,
  updateStatusPedido,
  deletePedido,
  getPedido,
  totalCliente,
  totalProduto,
  maisPedidos,
};
