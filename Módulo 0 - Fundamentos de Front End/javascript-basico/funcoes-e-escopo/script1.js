var m = 'Olá ';
imprimeOla();

function imprimeOla() {
  var nome = 'Marcelo';
  console.log(m);
  console.log(nome);
  imprimeOla2();

  function imprimeOla2() {
    console.log(m);
    console.log(nome);
  }
}
