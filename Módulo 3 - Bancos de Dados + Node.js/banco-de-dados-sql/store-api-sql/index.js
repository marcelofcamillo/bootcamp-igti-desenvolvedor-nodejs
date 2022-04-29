import express from 'express';
import winston from 'winston';
import cors from 'cors';
import clientsRouter from './routes/client.route.js';
import suppliersRouter from './routes/supplier.route.js';
import productsRouter from './routes/product.route.js';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'store-api-sql.log' }),
  ],
  format: combine(label({ label: 'store-api-sql' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use('/client', clientsRouter);
app.use('/supplier', suppliersRouter);
app.use('/product', productsRouter);

app.use((error, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
  res.status(400).send({ error: error.message });
});

app.listen(3000, () => logger.info('API started!'));
