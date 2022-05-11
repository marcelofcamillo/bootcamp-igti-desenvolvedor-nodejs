const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/db');

describe('Testes de Integração', () => {
  beforeEach(async () => {
    await db.cliente.destroy({ where: {} });
    await db.consulta.destroy({ where: {} });
  });

  afterAll(async () => await db.sequelize.close());

  const clienteJoao = {
    Nome: 'João Silva',
    CPF: '000.000.000-00',
  };

  const resultadoEsperado = {
    montante: 106.9,
    juros: 0.025,
    parcelas: 3,
    primeiraPrestacao: 35.64,
    prestacoes: [35.64, 35.63, 35.63],
  };

  const payloadRequest = {
    nome: clienteJoao.Nome,
    CPF: clienteJoao.CPF,
    valor: 101.75,
    parcelas: 3,
  };

  test('Responder na raíz', () => {
    return request(app)
      .get('/')
      .then((res) => expect(res.status).toBe(200));
  });

  /* CENÁRIO 01: Dado um novo cliente, o cliente solicita uma 
  consulta. O resultado é corretamente calculado, armazenado 
  e enviado sem nenhuma mensagem de erro - HTTP 201 */
  test('CENÁRIO 01', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // resultado é obtido com sucesso
    expect(res.body.erro).toBeUndefined();
    expect(res.body.montante).toBe(106.9);
    expect(res.status).toBe(201);
    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.body).toMatchObject(resultadoEsperado);

    // cliente foi armazenado
    const cliente = await db.cliente.findOne({
      where: { CPF: clienteJoao.CPF },
    });
    expect(cliente.CPF).toBe(clienteJoao.CPF);

    const consulta = await db.consulta.findOne({
      where: { ClienteCPF: clienteJoao.CPF },
    });
    expect(consulta.Valor).toBe(101.75);
  });

  /* CENÁRIO 02: Dado um cliente que já realizou outras 
  consultas, o cliente solicita uma consulta após mais 
  de 30 dias. O resultado é corretamente calculado, armazenado 
  e enviado sem nenhuma mensagem  de erro - HTTP 201 */
  test('CENÁRIO 02', async () => {
    // premissas
    await db.cliente.create(clienteJoao);
    await db.consulta.create({
      Valor: 1,
      NumPrestacoes: 2,
      Juros: 0.5,
      Prestacoes: '1, 1',
      ClienteCPF: clienteJoao.CPF,
      Montante: 2,
      createdAt: '2016-06-22 19:10:25-07',
    });

    // teste
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);
    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.status).toBe(201);

    const count = await db.consulta.count({
      where: { ClienteCPF: clienteJoao.CPF },
    });
    expect(count).toBe(2);
  });

  /* CENÁRIO 03: Dado um cliente que já realizou outras 
  consultas, o cliente solicita uma consulta após menos 
  de 30 dias. O resultado contendo uma mensagem de erro 
  é retornada ao usuário - HTTP 405 */
  test('CENÁRIO 03', async () => {
    const res1 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);
    expect(res1.body).toMatchSnapshot(resultadoEsperado);

    const res2 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // resultado é obtido
    expect(res2.body.erro).toBeDefined();
    expect(res2.status).toBe(405);
  });

  /* CENÁRIO 04: Dada uma consulta com o payload mal formatado, a 
  resposta contendo uma requisição mal feita é retornada - HTTP 400 */
  test('CENÁRIO 04', async () => {
    const res = await request(app).post('/consulta-credito').send({});

    // resultado é obtido
    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(400);
  });
});
