import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express();

router.post('/', async (req, res) => {
  try {
    let account = req.body;
    const data = await JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.status(200).send(account);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
