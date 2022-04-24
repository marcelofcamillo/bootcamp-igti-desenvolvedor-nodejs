import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function getPedidos() {
  const data = JSON.parse(await readFile('pedidos.json'));

  return data.pedidos;
}

async function createPedido(pedido) {
  const data = JSON.parse(await readFile(global.fileName));

  pedido = {
    id: data.nextId++,
    cliente: pedido.cliente,
    produto: pedido.produto,
    valor: pedido.valor,
    entregue: false,
    timestamp: new Date().toISOString(),
  };

  data.pedidos.push(pedido);

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return pedido;
}

async function updatePedido(pedido) {
  const data = JSON.parse(await readFile(global.fileName));
  const index = data.pedidos.findIndex((o) => o.id === pedido.id);

  if (index === -1) throw new Error('Pedido não encontrado!');

  data.pedidos[index].cliente = pedido.cliente;
  data.pedidos[index].produto = pedido.produto;
  data.pedidos[index].valor = pedido.valor;
  data.pedidos[index].entregue = pedido.entregue;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return data.pedidos[index];
}

async function updateStatusPedido(pedido) {
  const data = JSON.parse(await readFile(global.fileName));
  const index = data.pedidos.findIndex((o) => o.id === pedido.id);

  if (index === -1) throw new Error('Pedido não encontrado!');

  data.pedidos[index].entregue = pedido.entregue;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return data.pedidos[index];
}

async function deletePedido(id) {
  const data = JSON.parse(await readFile(global.fileName));

  data.pedidos = data.pedidos.filter((pedido) => pedido.id !== parseInt(id));

  await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function getPedido(id) {
  const data = JSON.parse(await readFile(global.fileName));
  const pedido = data.pedidos.find((p) => p.id === parseInt(id));

  if (!pedido) throw new Error('Pedido não encontrado!');

  return pedido;
}

export default {
  getPedidos,
  createPedido,
  updatePedido,
  updateStatusPedido,
  deletePedido,
  getPedido,
};
