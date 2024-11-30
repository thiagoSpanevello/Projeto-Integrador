import React, { useState } from "react";
import "./style.css";

function ListagemFuncionarios() {
  const [filtro, setFiltro] = useState("todos");
  const [funcionarios, setFuncionarios] = useState([
    { cpf: "123.456.789-00", nome: "Funcionário 1", cargo: "Funcionário", endereco: "Rua A, 123" },
    { cpf: "987.654.321-00", nome: "Gerente 1", cargo: "Gerente", endereco: "Rua B, 456" },
    { cpf: "111.222.333-44", nome: "Funcionário 2", cargo: "Funcionário", endereco: "Rua C, 789" },
    { cpf: "444.555.666-77", nome: "Gerente 2", cargo: "Gerente", endereco: "Rua D, 101" },
  ]);

  const getItensFiltrados = () => {
    if (filtro === "funcionario") {
      return funcionarios.filter((funcionario) => funcionario.cargo === "Funcionário");
    } else if (filtro === "gerente") {
      return funcionarios.filter((funcionario) => funcionario.cargo === "Gerente");
    }
    return funcionarios;
  };

  const deletarFuncionario = (index) => {
    const novosFuncionarios = [...funcionarios];
    novosFuncionarios.splice(index, 1);
    setFuncionarios(novosFuncionarios);
  };

  const alterarFuncionario = (index) => {
    alert(`Alterar funcionário: ${JSON.stringify(funcionarios[index])}`);
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
              <option value="funcionario">Funcionários</option>
              <option value="gerente">Gerentes</option>
            </select>
          </div>

          <div className="listagem">
            {getItensFiltrados().map((funcionario, index) => (
              <div key={index} className="item">
                <span>
                  {funcionario.nome} | {funcionario.cpf} | {funcionario.cargo} | {funcionario.endereco}
                </span>
                <div className="actions">
                  <button onClick={() => deletarFuncionario(index)}>Deletar</button>
                  <button onClick={() => alterarFuncionario(index)}>Alterar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListagemFuncionarios;