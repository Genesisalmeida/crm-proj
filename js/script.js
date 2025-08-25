const headers = [
  "nome", "cpf", "telefone", "email", "cep",
  "cidade", "estado", "rua", "bairro", "numero"
];

// Apagar dados
const btnDelete = document.querySelector("#BtnDelete");
if (btnDelete) {
  btnDelete.addEventListener("click", () => {
    localStorage.removeItem("eleitores");
    location.reload();
  });
}

// Criar linha da tabela
const criarLinhaTabela = (dados) => {
  const novaLinha = document.createElement("tr");

  headers.forEach((campo) => {
    const td = document.createElement("td");
    td.textContent = dados[campo] || "Não informado";
    td.setAttribute("data-label", campo.charAt(0).toUpperCase() + campo.slice(1));
    novaLinha.appendChild(td);
  });
    // Cria TD da lixeira
    const tdLixeira = document.createElement("td");
    tdLixeira.setAttribute('class','tdLixeira');
 
    const icone = document.createElement("span"); // ou <img> se quiser imagem
    icone.textContent = "🗑️"; // emoji de lixeira
    icone.style.cursor = "pointer";
  
    // Evento para remover a linha
    icone.addEventListener("click", () => {
      novaLinha.remove();
      localStorage.removeItem("eleitores");
      location.reload();
    });
  
    tdLixeira.appendChild(icone);
    novaLinha.appendChild(tdLixeira);

  return novaLinha;
};

// Buscar CEP
const buscarCEP = () => {
 
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById("rua").value = data.logradouro || "";
          document.getElementById("bairro").value = data.bairro || "";
          document.getElementById("cidade").value = data.localidade || "";
          document.getElementById("estado").value = data.uf || ""; // CORRIGIDO AQUI
        } else {
          alert("CEP não encontrado!");
        }
      })
      .catch(() => alert("Erro ao buscar o CEP!"));
  } else {
    alert("CEP inválido!");
  }
};

// Validar campos obrigatórios
const validarInputs = (inputs) => {
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
};

// Salvar dados no localStorage
const salvarDadosLocal = (dados) => {
  const lista = JSON.parse(localStorage.getItem("eleitores")) || [];
  lista.push(dados);
  localStorage.setItem("eleitores", JSON.stringify(lista));
};

// Carregar dados no HTML da tabela
const carregarDadosLocal = () => {
  const listaEleitores = document.getElementById("listaEleitores");
  const lista = JSON.parse(localStorage.getItem("eleitores")) || [];

  lista.forEach(dados => {
    // Tabela (desktop)
    listaEleitores.appendChild(criarLinhaTabela(dados));
       
    // Cards (mobile)
    const card = document.createElement("div");
    card.className = "card";
  
    headers.forEach((campo) => {
      const div = document.createElement("div");
      div.innerHTML = `<span>${campo.charAt(0).toUpperCase() + campo.slice(1)}:</span> ${dados[campo] || "Não informado"}`;
      card.appendChild(div);
    });
  
    document.getElementById("cardsContainer").appendChild(card);
  });
  
};

// Cadastro de eleitor
const paginaCadastro = () => {
  const cadastroForm = document.getElementById("cadastroForm");
  const cepInput = document.getElementById("cep");
  cadastroForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = Array.from(e.target.querySelectorAll("input"));
    if (!validarInputs(inputs)) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    const dados = {};
    inputs.forEach(input => {
      if (input.id) {
        dados[input.id] = input.value.trim();
      }
    });

    salvarDadosLocal(dados);
    e.target.reset();
    alert("Eleitor cadastrado com sucesso!");
  });

  cepInput.addEventListener("blur", buscarCEP);
 
};

// Página de lista
const paginaLista = () => {
  carregarDadosLocal();
};

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  const pagina = window.location.pathname;

  if (pagina.includes("index.html") || pagina.endsWith("/")) {
    paginaCadastro();
  }

  if (pagina.includes("listaEleitores.html")) {
    paginaLista();
    isMobile()
    search()
  }
});

// input de pesquisa
function isMobile() {
  return window.innerWidth <= 768;
}

const search = ()=>{
      let timer;
      const searchInput = document.getElementById('search');
      searchInput.addEventListener('input', () => {
          clearTimeout(timer);
          const search = searchInput.value.toLowerCase();
          timer = setTimeout(() => {
            if(isMobile()){
              const cards =document.querySelectorAll('#cardsContainer .card');
              cards.forEach(card=>{
                const target = card.textContent.toLowerCase();
                card.style.display = target.includes(search)?'':'none';
              });
            }else{
                  const linhas = document.querySelectorAll('#listaEleitores tr');
              linhas.forEach(linha => {
                  const target = linha.textContent.toLowerCase();
                  linha.style.display = target.includes(search) ? '' : 'none';
              });
          }
        },300);
      });
}
  // Atualiza o ano automaticamente
  document.getElementById("ano").textContent = new Date().getFullYear();

