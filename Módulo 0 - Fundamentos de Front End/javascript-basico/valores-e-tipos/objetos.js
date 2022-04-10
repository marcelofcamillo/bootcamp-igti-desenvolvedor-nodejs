// Objetos
var aluno1 = {
  matricula: 123456,
  nome: 'Marcelo Camillo',
  curso: 'Bootcamp Desenvolvedor Node.js',
  ativo: true,
};

console.log(aluno1.nome);

aluno1.dataNascimento = '05/07/1993';
console.log(aluno1.dataNascimento);

delete aluno1.dataNascimento;

// Undefined e null
var x;
var y = null;

// Arrays
var frutas = ['Banana', 'Laranja', 'Maçã'];
