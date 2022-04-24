import express from 'express';
import PedidoController from '../controllers/pedido.controller.js';

const router = express.Router();

router.post('/', PedidoController.createPedido);
router.put('/', PedidoController.updatePedido);
router.patch('/updateStatusPedido', PedidoController.updateStatusPedido);
router.delete('/:id', PedidoController.deletePedido);
router.get('/:id', PedidoController.getPedido);
router.post('/totalCliente', PedidoController.totalCliente);
router.post('/totalProduto', PedidoController.totalProduto);
router.get('/maisPedidos', PedidoController.maisPedidos);

router.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

export default router;
