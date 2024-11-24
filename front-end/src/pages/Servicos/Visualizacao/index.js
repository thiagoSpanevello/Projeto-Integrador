import React from 'react'
import './style.css'

document.body.innerHTML = `
  <div class="container">
    <div class="form-group">
      <label for="filtro">Filtro</label>
      <select id="filtro">
        <option value="todos">Todos</option>
        <option value="tipo">Tipo de Serviço</option>
        <option value="cliente">Cliente</option>
        <option value="data">Data Realização</option>
      </select>
    </div>
    <div class="listagem" id="listagem">
      <!-- Itens serão renderizados aqui -->
    </div>
  </div>
`;

//Teste
let servicos = [
  { tipo: "Frete", cliente: "Cliente1", data: "10/11/2024" },
  { tipo: "Frete", cliente: "Cliente2", data: "15/11/2024" },
  { tipo: "Frete", cliente: "Cliente5", data: "20/11/2024" },
  { tipo: "Contabilidade", cliente: "Cliente12", data: "25/11/2024" },
];

function renderizarListagem(filtro = "todos") {
  const listagem = document.getElementById("listagem");
  listagem.innerHTML = "";

  let itensFiltrados = servicos;

  if (filtro === "tipo") {
    itensFiltrados = servicos.filter((servico) => servico.tipo === "Frete");
  } else if (filtro === "cliente") {
    itensFiltrados = servicos.filter((servico) => servico.cliente === "Cliente1");
  } else if (filtro === "data") {
    itensFiltrados = servicos.filter((servico) => servico.data === "10/11/2024");
  }

  itensFiltrados.forEach((servico, index) => {
    const item = document.createElement("div");
    item.className = "item";

    item.innerHTML = `
      <span>${servico.tipo} | ${servico.cliente} | ${servico.data}</span>
      <div class="actions">
        <button onclick="deletarServico(${index})">Deletar</button>
        <button onclick="alterarServico(${index})">Alterar</button>
      </div>
    `;

    listagem.appendChild(item);
  });
}

function deletarServico(index) {
  servicos.splice(index, 1);
  renderizarListagem();
}

function alterarServico(index) {
  alert(`Alterar serviço: ${JSON.stringify(servicos[index])}`);
}

document.getElementById("filtro").addEventListener("change", (event) => {
  renderizarListagem(event.target.value);
});

renderizarListagem();