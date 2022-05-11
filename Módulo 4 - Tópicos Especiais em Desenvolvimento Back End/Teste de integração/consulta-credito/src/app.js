const express = require('express');
const { check, validationResult } = require('express-validator');
const consultaCliente = require('./consulta-cliente');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!');
});

app.post(
  '/consulta-credito',

  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
  check('parcelas', 'O número de parcelas deve ser um número inteiro').notEmpty().isInt(), // prettier-ignore

  async (req, res) => {
    const { nome, CPF, valor, parcelas } = req.body;
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaCliente.consultar(nome, CPF, valor, parcelas); // prettier-ignore

      res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  }
);

module.exports = app;
