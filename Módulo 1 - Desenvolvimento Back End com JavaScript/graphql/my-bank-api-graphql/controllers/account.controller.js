import AccountService from '../services/account.service.js';

async function createAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('Name e balance são obrigatórios.');
    }

    res.status(200).send(await AccountService.createAccount(account));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
}

async function getAccounts(req, res, next) {
  try {
    res.status(200).send(await AccountService.getAccounts());
    logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
}

async function getAccount(req, res, next) {
  try {
    res.status(200).send(await AccountService.getAccount(req.params.id));
    logger.info(
      `${req.method} ${req.baseUrl}/:id - ${JSON.stringify(account)}`
    );
  } catch (error) {
    next(error);
  }
}

async function deleteAccount(req, res, next) {
  try {
    await AccountService.deleteAccount(req.params.id);
    res.status(200).end();
    logger.info(`${req.method} ${req.baseUrl}/:id - ${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function updateAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.id || !account.name || account.balance == null) {
      throw new Error('ID, name e balance são obrigatórios.');
    }

    res.status(200).send(await AccountService.updateAccount(account));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
}

async function updateBalance(req, res, next) {
  try {
    let account = req.body;

    if (!account.id || account.balance == null) {
      throw new Error('ID e balance são obrigatórios.');
    }

    res.status(200).send(await AccountService.updateBalance(account));
    logger.info(
      `${req.method} ${req.baseUrl}/updateBalance - ${JSON.stringify(account)}`
    );
  } catch (error) {
    next(error);
  }
}

export default {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  updateAccount,
  updateBalance,
};
