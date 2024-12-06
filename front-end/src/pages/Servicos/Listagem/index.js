import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function ListagemServicos() {
  const [filtro, setFiltro] = useState("todos");
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar serviços do backend
  const fetchServicos = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera o token armazenado
      const response = await axios.get(
        "http://localhost:3001/listagem/servico",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        }
      );

      setServicos(response.data); // Atualiza o estado com os dados recebidos
      setLoading(false); // Finaliza o carregamento
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      setLoading(false); // Finaliza o carregamento em caso de erro
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const getItensOrdenados = () => {
    const servicosOrdenados = [...servicos];
    if (filtro === "tipo") {
      return servicosOrdenados.sort((a, b) => a.tipo_nome.localeCompare(b.tipo_nome));
    } else if (filtro === "cliente") {
      return servicosOrdenados.sort((a, b) => a.clientecnpj.localeCompare(b.clientecnpj));
    } else if (filtro === "data") {
      return servicosOrdenados.sort((a, b) => new Date(a.datarealizacao) - new Date(b.datarealizacao));
    }
    return servicosOrdenados;
  };
  const deletarServico = async (index) => {
    const servico = servicos[index];
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/servico/${servico.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Atualiza a lista removendo o serviço deletado
      setServicos(servicos.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
    }
  };

  const alterarServico = (index) => {
    alert(`Alterar serviço: ${JSON.stringify(servicos[index])}`);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div class="maxService">
      <div className="containerService">
        <div className="inside-container-service">
          <div className="form-group-service">
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

          <div className="listagemService">
            <div className="header">
              <span>
                <strong>Tipo de Serviço</strong>
              </span>
              <span>
                <strong>Cliente</strong>
              </span>
              <span>
                <strong>Data de Realização</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            <div class="scroll">
              {getItensOrdenados().map((servico, index) => (
                <div key={index} className="item">
                  <span>{servico.tipo_nome}</span>
                  <span>{servico.clientecnpj}</span>
                  <span>{servico.datarealizacao}</span>

                  <button class="actions" onClick={() => deletarServico(index)}>
                    Deletar
                  </button>
                  <button class="actions" onClick={() => alterarServico(index)}>
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

export default ListagemServicos;
