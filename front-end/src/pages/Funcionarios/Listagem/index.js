import React, { useState, useEffect, useCallback } from "react";
import "./style.css";
import axios from "axios";

function ListagemFuncionarios() {
  const [filtro, setFiltro] = useState("todos");
  const [funcionarios, setFuncionarios] = useState([]);

  // Função para buscar funcionários da API
  const fetchFuncionarios = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.get("http://localhost:3001/relatorio/funcionarios",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setFuncionarios(response.data); // Atualiza o estado com os funcionários recebidos
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      alert("Erro ao carregar a lista de funcionários. Tente novamente.");
    }
  }, []);

  // useEffect para carregar os dados ao montar o componente
  useEffect(() => {
    fetchFuncionarios();
    console.log(funcionarios);
  }, [fetchFuncionarios]);

  // Filtrar itens com base no filtro selecionado
  const getItensFiltrados = () => {
    if (filtro === "funcionario") {
      return funcionarios.filter((funcionario) => funcionario.cargo === "funcionario");
    } else if (filtro === "gerente") {
      return funcionarios.filter((funcionario) => funcionario.cargo === "gerente");
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
    <div class="max">
      <div className="containerListagemFuncionario">
        <div className="inside-containerListagemFuncionario">
          <div className="form-group-listagem-funcionario">
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

          <div className="listagemFuncionario">
            <div className="header">
              <span>
                <strong>Nome</strong>
              </span>
              <span>
                <strong>CPF</strong>
              </span>
              <span>
                <strong>Cargo</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            <div class="scroll">
              {getItensFiltrados().map((funcionario, index) => (
                <div key={index} className="item">
                  <span>{funcionario.nome}</span>
                  <span>{funcionario.cpf}</span>
                  <span>{funcionario.cargo}</span>
                  <button
                    className="actions"
                    onClick={() => deletarFuncionario(index)}
                  >
                    Deletar
                  </button>
                  <button
                    className="actions"
                    onClick={() => alterarFuncionario(index)}
                  >
                    Alterar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListagemFuncionarios;
