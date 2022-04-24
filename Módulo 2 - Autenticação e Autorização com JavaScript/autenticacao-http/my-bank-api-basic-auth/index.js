import express from 'express';
import winston from 'winston';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { promises as fs } from 'fs';
import accountsRouter from './routes/account.routes.js';
import { swaggerDocument } from './doc.js';
import basicAuth from 'express-basic-auth';

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

function getRole(username) {
  if (username === 'admin') {
    return 'admin';
  } else if (username === 'marcelo') {
    return 'role1';
  }
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    if (req.auth.user) {
      const role = getRole(req.auth.user);

      if (isAllowed(role)) {
        next();
      } else {
        res.status(401).send('Role not allowed!');
      }
    } else {
      res.status(403).send('User not found!');
    }
  };
}

app.use(
  basicAuth({
    authorizer: (username, password) => {
      const userMatches = basicAuth.safeCompare(username, 'admin');
      const passMatches = basicAuth.safeCompare(password, 'admin');

      const use2rMatches = basicAuth.safeCompare(username, 'marcelo');
      const pass2Matches = basicAuth.safeCompare(password, '1234');

      return (userMatches && passMatches) || (use2rMatches && pass2Matches);
    },
  })
);
//app.use(basicAuth({ users: { admin: 'admin' } }));

app.use('/account', authorize('admin' /*, 'role1'*/), accountsRouter);
//app.use('/management', authorize('admin', 'role1', 'role2'), accountsRouter); // exemplo

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
