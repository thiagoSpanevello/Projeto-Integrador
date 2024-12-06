import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./style.css";

function ListagemServicos() {
  const [data, setData] = useState([
    { tipo: "Frete", cliente: "Cliente1", data: "10/11/2024" },
    { tipo: "Frete", cliente: "Cliente2", data: "15/11/2024" },
    { tipo: "Frete", cliente: "Cliente5", data: "20/11/2024" },
    { tipo: "Contabilidade", cliente: "Cliente12", data: "25/11/2024" },
  ]);

  console.log(data);

  const fetchTiposServicos = useCallback(() => {
    const token = localStorage.getItem("token");
    try {
      axios
        .get("http://localhost:3001/listagem/tipoServico", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        });
    } catch (e) {
      alert(e);
    }
  }, []);

  useEffect(() => {
    fetchTiposServicos();
  }, [fetchTiposServicos]);

  const deletarServico = (item) => {
    try {
      const token = localStorage.getItem("token");
      axios.delete(`http://localhost:3001/excluir/tipoServico/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const new_data = [...data];
      setData(new_data.filter((data) => data?.id !== item.id));
    } catch {}
  };

  const alterarServico = (index) => {
    alert(`Alterar serviço: ${JSON.stringify(data[index])}`);
  };

  return (
    <div class="maxListagem">
      <div className="containerListagem">
        <div class="inside-container-listagem">
          <div className="listagemListagem">
            <div className="header">
              <span>
                <strong>Nome</strong>
              </span>
              <span>
                <strong>Descrição</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            {data.map((servico, index) => (
              <div key={index} className="itemListagem">
                <span>{servico.nome}</span>
                <span>{servico.descricao}</span>
                <button
                  className="actions"
                  onClick={() => deletarServico(servico)}
                >
                  Deletar
                </button>
                <button
                  className="actions"
                  onClick={() => alterarServico(index)}
                >
                  Alterar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListagemServicos;
