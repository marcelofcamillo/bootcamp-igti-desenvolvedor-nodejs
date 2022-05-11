const app = require('./app');
const db = require('./db');

db.sequelize.sync().then(async () => {
  await console.log('Conectado ao banco de dados!');
});

app.listen(5678, () => {
  console.log(
    'Bootcamp Desenvolvedor Node.JS - Tópicos especiais. Aplicação de exemplo ouvindo na porta 5678!'
  );
});
