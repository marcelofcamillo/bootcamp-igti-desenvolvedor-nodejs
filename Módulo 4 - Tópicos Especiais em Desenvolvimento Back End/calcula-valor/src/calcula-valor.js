function calcularMontante(capital, taxa, periodo) {
  // M = C(1 + i)^t
  let montante = capital * Math.pow(1 + taxa, periodo - 1);

  return montante;
}

module.exports = { calcularMontante };
