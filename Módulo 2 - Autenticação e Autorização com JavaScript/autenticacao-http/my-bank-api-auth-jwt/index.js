import express from 'express';
import winston from 'winston';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { promises as fs } from 'fs';
import accountsRouter from './routes/account.routes.js';
import usersRouter from './routes/user.routes.js';
import { swaggerDocument } from './doc.js';
import jwt from 'jsonwebtoken';

const { readFile, writeFile } = fs;

global.fileName = 'accounts.json';
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Access denied!' });
      return;
    }

    const token = authHeader.substring(7, authHeader.length);

    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Access denied!' });
        return;
      }

      if (isAllowed(decoded.role)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied!' });
      }
    });
  };
}

app.use('/user', usersRouter);
app.use('/account', authorize('admin'), accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info('API started!');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    writeFile(global.fileName, JSON.stringify(initialJson, null, 2))
      .then(() => logger.info('API started and file created!'))
      .catch((err) => logger.error(err));
  }
});
