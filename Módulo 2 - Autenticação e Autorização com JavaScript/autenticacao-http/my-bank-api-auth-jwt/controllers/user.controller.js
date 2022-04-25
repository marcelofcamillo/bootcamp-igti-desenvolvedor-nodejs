import UserService from '../services/user.service.js';

async function getUsers(req, res, next) {
  try {
    res.status(200).send(await UserService.getUsers());
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const user = req.body;

    if (!user.username || !user.password || !user.role) {
      throw new Error('Username, password e role são obrigatórios.');
    }

    await UserService.createUser(user);

    res.status(201).send({ message: `User ${user.username} created!` });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = req.body;

    if (!user.username || !user.password) {
      throw new Error('Username e password são obrigatórios.');
    }

    res.status(200).send(await UserService.login(user));
  } catch (error) {
    next(error);
  }
}

export default { getUsers, createUser, login };
