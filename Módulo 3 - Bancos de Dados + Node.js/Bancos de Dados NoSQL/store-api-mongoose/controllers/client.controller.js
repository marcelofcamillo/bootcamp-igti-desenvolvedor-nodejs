import ClientService from '../services/client.service.js';

async function createClient(req, res, next) {
  try {
    let client = req.body;

    // prettier-ignore
    if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
      throw new Error('name, cpf, phone, email e address são obrigatórios.');
    }

    res.send(await ClientService.createClient(client));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

async function getClients(req, res, next) {
  try {
    res.send(await ClientService.getClients());
    logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
}

async function getClient(req, res, next) {
  try {
    res.send(await ClientService.getClient(req.params.id));
    logger.info(`${req.method} ${req.baseUrl} - id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function deleteClient(req, res, next) {
  try {
    await ClientService.deleteClient(req.params.id);

    res.end();
    logger.info(`${req.method} ${req.baseUrl} - id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function updateClient(req, res, next) {
  try {
    let client = req.body;

    // prettier-ignore
    if (!client.clientId || !client.name || !client.cpf || !client.phone || !client.email || !client.address) {
      throw new Error('clientId, name, cpf, phone, email e address são obrigatórios.');
    }

    res.send(await ClientService.updateClient(client));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
