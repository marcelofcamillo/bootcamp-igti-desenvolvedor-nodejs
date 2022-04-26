import express from 'express';
import winston from 'winston';
import cors from 'cors';

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

app.listen(3000, () => logger.info('API started!'));
