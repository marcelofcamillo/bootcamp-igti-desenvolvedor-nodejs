import express from 'express';
import pedidosRouter from './routes/pedido.route.js';

global.fileName = 'pedidos.json';

const app = express();
app.use(express.json());
app.use('/pedido', pedidosRouter);

app.listen(3000, () => console.log('API started!'));
