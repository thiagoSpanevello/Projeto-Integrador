import React, { useState } from "react";
import "./style.css";

function ListagemClientes() {
  const [filtro, setFiltro] = useState("todos");
  const [clientes, setClientes] = useState([
    { nome: "Cliente1", cnpj: "12.345.678/0001-95", endereco: "Rua A, 123", cep: "12345-678", cidade: "São Paulo", estado: "SP", telefone: "(11) 91234-5678" },
    { nome: "Cliente2", cnpj: "98.765.432/0001-10", endereco: "Rua B, 456", cep: "98765-432", cidade: "Rio de Janeiro", estado: "RJ", telefone: "(21) 99876-5432" },
    { nome: "Cliente3", cnpj: "11.222.333/0001-11", endereco: "Rua C, 789", cep: "45678-901", cidade: "Belo Horizonte", estado: "MG", telefone: "(31) 93456-7890" },
  ]);

  const getItensFiltrados = () => {
    if (filtro === "nome") {
      return clientes.filter((cliente) => cliente.nome === "Cliente1");
    } else if (filtro === "cnpj") {
      return clientes.filter((cliente) => cliente.cnpj === "12.345.678/0001-95");
    }
    return clientes;
  };

  const deletarCliente = (index) => {
    const novosClientes = [...clientes];
    novosClientes.splice(index, 1);
    setClientes(novosClientes);
  };

  const alterarCliente = (index) => {
    alert(`Alterar cliente: ${JSON.stringify(clientes[index])}`);
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
              <option value="nome">Nome do Cliente</option>
              <option value="cnpj">CNPJ</option>
            </select>
          </div>

          <div className="listagem">
            {getItensFiltrados().map((cliente, index) => (
              <div key={index} className="item">
                <span>
                  {cliente.nome} | {cliente.cnpj} | {cliente.endereco} | {cliente.cep} | {cliente.cidade} | {cliente.estado} | {cliente.telefone}
                </span>
                <div className="actions">
                  <button onClick={() => deletarCliente(index)}>Deletar</button>
                  <button onClick={() => alterarCliente(index)}>Alterar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListagemClientes;