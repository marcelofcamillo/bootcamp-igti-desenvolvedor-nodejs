import AnimalService from '../services/animal.service.js';

async function createAnimal(req, res, next) {
  try {
    let animal = req.body;

    if (!animal.nome || !animal.tipo || !animal.proprietario_id) {
      throw new Error('Nome, tipo e proprietario ID são obrigatórios.');
    }

    res.send(await AnimalService.createAnimal(animal));
    logger.info(`POST /animal - ${JSON.stringify(animal)}`);
  } catch (err) {
    next(err);
  }
}

async function getAnimais(req, res, next) {
  try {
    res.send(await AnimalService.getAnimais(req.query.proprietario_id));
    logger.info('GET /animal');
  } catch (err) {
    next(err);
  }
}

async function getAnimal(req, res, next) {
  try {
    res.send(await AnimalService.getAnimal(req.params.id));
    logger.info('GET /animal');
  } catch (err) {
    next(err);
  }
}

async function updateAnimal(req, res, next) {
  try {
    let animal = req.body;

    if (!animal.nome || !animal.tipo || !animal.proprietario_id) {
      throw new Error('Nome, tipo e proprietario ID são obrigatórios.');
    }

    res.send(await AnimalService.updateAnimal(animal));
    logger.info(`PUT /animal - ${JSON.stringify(animal)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAnimal(req, res, next) {
  try {
    await AnimalService.deleteAnimal(req.params.id);

    res.end();
    logger.info('DELETE /animal');
  } catch (err) {
    next(err);
  }
}

async function getAnimalProprietario(req, res, next) {
  try {
    res.send(await AnimalService.getAnimalProprietario(req.params.id));
    logger.info('GET /animal?:proprietario_id');
  } catch (err) {
    next(err);
  }
}

export default {
  createAnimal,
  getAnimais,
  getAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalProprietario,
};
