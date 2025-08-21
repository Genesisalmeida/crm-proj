// Gera os dados do eleitor
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const gerarEleitor = (i) => {
  const primeiraLetra = letras[Math.floor(Math.random() * letras.length)];
  return {
    nome: `${primeiraLetra}essoa ${i}`, // substitui a primeira letra por aleatória
    cpf: `000.000.000-${String(i).padStart(2,'0')}`,
    telefone: `1190000${String(i).padStart(4,'0')}`,
    email: `pessoa${i}@teste.com`,
    cep: `12345-00`,
    cidade: `Cidade ${i}`,
    estado: `SP`,
    rua: `Rua ${i}`,
    bairro: `Bairro ${i}`,
    numero: `${i}`,
  };
};
  // Função para popular localStorage e atualizar tabela/cards
  const automatizarCadastro = (quantidade = 1000) => {
    const lista = JSON.parse(localStorage.getItem("eleitores")) || [];
  
    for (let i = 1; i <= quantidade; i++) {
      const dados = gerarEleitor(i);
      lista.push(dados);
    }
  
    localStorage.setItem("eleitores", JSON.stringify(lista));
  
    // Limpa a tabela e cards antes de renderizar novamente
    const listaEleitores = document.getElementById("listaEleitores");
    const cardsContainer = document.getElementById("cardsContainer");
    if (listaEleitores) listaEleitores.innerHTML = "";
    if (cardsContainer) cardsContainer.innerHTML = "";
  
    // Atualiza tabela e cards com todos os registros
    carregarDadosLocal();
  
    alert(`${quantidade} eleitores cadastrados e exibidos na tabela!`);
  };
  automatizarCadastro(20);
