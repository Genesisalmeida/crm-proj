const cadastroForm = document.getElementById("cadastroForm");
const listaEleitores = document.getElementById("listaEleitores");

const headers = ["Nome", "CPF", "Telefone", "E-mail", "Endereço"];

function criarLinhaTabela(dados) {
  const novaLinha = document.createElement("tr");
  dados.forEach((dado, index) => {
    const td = document.createElement("td");
    td.textContent = dado;
    td.setAttribute("data-label", headers[index]);
    novaLinha.appendChild(td);
  });
  return novaLinha;
}

function validarInputs(inputs) {
  let valido = true;
  inputs.forEach(input => {
    if (input.hasAttribute("required") && input.value.trim() === "") {
      input.style.border = "2px solid red";
      valido = false;
    } else {
      input.style.border = "1px solid #ccc";
    }
  });
  return valido;
}

function salvarDadosLocal(dados) {
  const lista = JSON.parse(localStorage.getItem("eleitores")) || [];
  lista.push(dados);
  localStorage.setItem("eleitores", JSON.stringify(lista));
}

function carregarDadosLocal() {
  const lista = JSON.parse(localStorage.getItem("eleitores")) || [];
  lista.forEach(dados => {
    listaEleitores.appendChild(criarLinhaTabela(dados));
  });
}

cadastroForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const inputs = Array.from(e.target.querySelectorAll("input"));
  if (!validarInputs(inputs)) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const dados = inputs.map(input => input.value.trim());
  salvarDadosLocal(dados);
  listaEleitores.appendChild(criarLinhaTabela(dados));

  e.target.reset();
});

document.addEventListener("DOMContentLoaded", carregarDadosLocal);


//“Copilot, vamos continuar o projeto CRM Político. Paramos na parte do front-end com localStorage e validação.”