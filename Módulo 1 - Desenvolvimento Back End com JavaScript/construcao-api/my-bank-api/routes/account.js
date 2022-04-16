import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('Name e balance são obrigatórios.');
    }

    const data = await JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.status(200).send(account);
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
});

router.get('/', cors(), async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;

    res.status(200).send(data);
    logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );

    res.status(200).send(account);
    logger.info(
      `${req.method} ${req.baseUrl}/:id - ${JSON.stringify(account)}`
    );
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.status(200).end();
    logger.info(`${req.method} ${req.baseUrl}/:id - ${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.id || !account.name || account.balance == null) {
      throw new Error('ID, name e balance são obrigatórios.');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.status(200).send(account);
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.id || account.balance == null) {
      throw new Error('ID e balance são obrigatórios.');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.status(200).send(data.accounts[index]);
    logger.info(
      `${req.method} ${req.baseUrl}/updateBalance - ${JSON.stringify(account)}`
    );
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
