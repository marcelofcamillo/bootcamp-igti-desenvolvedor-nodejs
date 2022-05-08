const calculaValor = require('../src/calcula-valor');

test('Com uma prestação o montante é igual ao capital', () => {
  const montante = calculaValor.calcularMontante(100, 0.0175, 1); // operação

  expect(montante).toBe(100); // resultado ou comportamento esperado
});
