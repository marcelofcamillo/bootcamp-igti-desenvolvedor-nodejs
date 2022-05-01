import ProprietarioService from '../services/proprietario.service.js';

async function createProprietario(req, res, next) {
  try {
    let proprietario = req.body;

    if (!proprietario.nome || !proprietario.telefone) {
      throw new Error('Nome e telefone são obrigatórios.');
    }

    res.send(await ProprietarioService.createProprietario(proprietario));
    logger.info(`POST /proprietario - ${JSON.stringify(proprietario)}`);
  } catch (err) {
    next(err);
  }
}

async function getProprietarios(req, res, next) {
  try {
    res.send(await ProprietarioService.getProprietarios());
    logger.info('GET /proprietario');
  } catch (err) {
    next(err);
  }
}

async function getProprietario(req, res, next) {
  try {
    res.send(await ProprietarioService.getProprietario(req.params.id));
    logger.info('GET /proprietario');
  } catch (err) {
    next(err);
  }
}

async function updateProprietario(req, res, next) {
  try {
    let proprietario = req.body;

    if (!proprietario.nome || !proprietario.telefone) {
      throw new Error('Nome e telefone são obrigatórios.');
    }

    res.send(await ProprietarioService.updateProprietario(proprietario));
    logger.info(`PUT /proprietario - ${JSON.stringify(proprietario)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteProprietario(req, res, next) {
  try {
    await ProprietarioService.deleteProprietario(req.params.id);

    res.end();
    logger.info('DELETE /proprietario');
  } catch (err) {
    next(err);
  }
}

export default {
  createProprietario,
  getProprietarios,
  getProprietario,
  updateProprietario,
  deleteProprietario,
};
