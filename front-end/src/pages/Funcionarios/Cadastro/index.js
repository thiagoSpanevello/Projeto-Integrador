import React, { useState, useCallback } from "react";
import axios from "axios";
import "./style.css";

function CadastroFuncionarios() {
  const [isManager, toggleIsManager] = useState(false);

  const handleSubmit = useCallback(async () => {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    const token = localStorage.getItem("token");

    if (cpf && nome && senha) {
      try {
        await axios.post(
          "http://localhost:3001/cadastro/funcionarios",
          {
            cpf,
            nome,
            senha,
            cargo: isManager ? "gerente" : "funcionario",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(`Funcionário cadastrado com sucesso!`);
        document.getElementById("cpf").value = "";
        document.getElementById("nome").value = "";
        document.getElementById("senha").value = "";
        toggleIsManager(false);
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }, [isManager]); // useEffect vazio, executa apenas na montagem

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="container-services">
        <div className="tabs">
          <div
            className={"tab " + (!isManager ? "active" : "")}
            id="tab-funcionario"
            onClick={() => toggleIsManager(false)}
          >
            Funcionário
          </div>
          <div
            className={"tab " + (isManager ? "active" : "")}
            id="tab-gerente"
            onClick={() => toggleIsManager(true)}
          >
            Gerente
          </div>
        </div>

        <div id="form-funcionario" className="forms">
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" placeholder="Digite o CPF" />
          </div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" placeholder="Digite o nome" />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" placeholder="Digite a senha" />
          </div>
          <button id="btn-cadastrar">Cadastrar Funcionário</button>
        </div>
      </div>
    </form>
  );
}

export default CadastroFuncionarios;
