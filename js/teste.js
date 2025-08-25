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
  // git add .
  // git commit -m "Mensagem do commit"
  // git push
  



//📊 forEach vs map no DOM
// Objetivo	Melhor escolha	Exemplo	Resultado
// Alterar algo nos elementos (ex: cor, texto, classe)	forEach	js const itens = document.querySelectorAll(".item"); itens.forEach(el => { el.style.color = "red"; });	Todos os .item ficam vermelhos. Nenhum array novo é criado.
// Executar uma ação sem precisar de retorno	forEach	js const botoes = document.querySelectorAll("button"); botoes.forEach(btn => btn.addEventListener("click", () => alert("Clicado!")));	Cada botão recebe um evento. Nada é retornado.
// Extrair dados dos elementos para um array novo	map	js const inputs = document.querySelectorAll(".campo"); const valores = Array.from(inputs).map(input => input.value);	Novo array: ["João", "joao@email.com", "12345"].
// Transformar elementos em outra forma de dado	map	js const itens = document.querySelectorAll(".item"); const textos = Array.from(itens).map(el => el.textContent.toUpperCase());	Novo array: ["PRODUTO A", "PRODUTO B", "PRODUTO C"].

// 👉 Regrinha final pra decorar:

// forEach → alterar (DOM, eventos, classes, estilos).

// map → transformar (elementos em dados novos, ou gerar outro array).