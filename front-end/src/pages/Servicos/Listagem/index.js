import React, { useState } from "react";
import "./style.css";

function ListagemServicos() {
  const [filtro, setFiltro] = useState("todos");
  const [servicos, setServicos] = useState([
    { tipo: "Frete", cliente: "Cliente1", data: "10/11/2024" },
    { tipo: "Frete", cliente: "Cliente2", data: "15/11/2024" },
    { tipo: "Frete", cliente: "Cliente5", data: "20/11/2024" },
    { tipo: "Contabilidade", cliente: "Cliente12", data: "25/11/2024" },
  ]);

  const getItensFiltrados = () => {
    if (filtro === "tipo") {
      return servicos.filter((servico) => servico.tipo === "Frete");
    } else if (filtro === "cliente") {
      return servicos.filter((servico) => servico.cliente === "Cliente1");
    } else if (filtro === "data") {
      return servicos.filter((servico) => servico.data === "10/11/2024");
    }
    return servicos;
  };

  const deletarServico = (index) => {
    const novosServicos = [...servicos];
    novosServicos.splice(index, 1);
    setServicos(novosServicos);
  };

  const alterarServico = (index) => {
    alert(`Alterar serviço: ${JSON.stringify(servicos[index])}`);
  };

  return (
    <div>
      <div className="container">
        <div className="inside-container">
          <div className="form-group">
            <label htmlFor="filtro">Filtro</label>
            <select
              id="filtro"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="tipo">Tipo de Serviço</option>
              <option value="cliente">Cliente</option>
              <option value="data">Data Realização</option>
            </select>
          </div>

          <div className="listagem">
            <div className="header">
              <span><strong>Tipo de Serviço</strong></span>
              <span><strong>Cliente</strong></span>
              <span><strong>Data de Realização</strong></span>
              <span><strong>Ações</strong></span>
            </div>
            {getItensFiltrados().map((servico, index) => (
              <div key={index} className="item">
                <span>{servico.tipo}</span>
                <span>{servico.cliente}</span>
                <span>{servico.data}</span>
                <div className="actions">
                  <button onClick={() => deletarServico(index)}>Deletar</button>
                  <button onClick={() => alterarServico(index)}>Alterar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListagemServicos;