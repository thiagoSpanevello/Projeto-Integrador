import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import "./style.css";

function Pagamento() {
  const [tiposOptions, setTiposOptions] = useState([]);
  const [clientesOptions, setClienteOptions] = useState([]);

  const fetchOptions = useCallback(async () => {
    const token = localStorage.getItem("token");

    try {
      const tipos = await axios.get(
        "http://localhost:3001/listagem/tipoServico",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTiposOptions(
        tipos?.data?.map((c) => ({
          label: c.nome,
          value: c.id,
        }))
      );

      const clientes = await axios.get(
        "http://localhost:3001/relatorio/clientes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClienteOptions(
        clientes?.data?.map((c) => ({ label: c.nomeempresa, value: c.cnpj }))
      );

      document.getElementById("tipo-servico").value = "";
      document.getElementById("cliente").value = "";
    } catch {}
  }, []);

  useEffect(() => {
    // Elementos do DOM
    const tabServico = document.getElementById("tab-servico");
    const tabPagamento = document.getElementById("tab-pagamento");
    const formServico = document.getElementById("form-servico");
    const formPagamento = document.getElementById("form-pagamento");

    // Alternar abas
    tabServico.addEventListener("click", () => {
      tabServico.classList.add("active");
      tabPagamento.classList.remove("active");
      formServico.classList.remove("hidden");
      formPagamento.classList.add("hidden");
    });

    tabPagamento.addEventListener("click", () => {
      tabPagamento.classList.add("active");
      tabServico.classList.remove("active");
      formPagamento.classList.remove("hidden");
      formServico.classList.add("hidden");
    });

    fetchOptions();
    // Cadastro de serviço
  }, [fetchOptions]); // useEffect vazio, executa apenas na montagem

  const handleSubmit = useCallback(async () => {
    const descricao = document.getElementById("descricao").value;
    const tipoServico = document.getElementById("tipo-servico").value;
    const cliente = document.getElementById("cliente").value;
    const valorPagamento = document.getElementById("valor-pagamento").value;
    const dataPagamento = document.getElementById("data-pagamento").value;

    const token = localStorage.getItem("token");

    if (descricao && tipoServico && cliente) {
      try {
        await axios.post(
          "http://localhost:3001/cadastro/servico",
          {
            dataRealizacao: new Date(),
            descricao,
            // tipoServicoId: tipoServico,
            tipoServicoId: 3,
            // clienteCNPJ: cliente,
            clienteCNPJ: "12.345.678/0001-00",
            valor: valorPagamento,
            dataCadastro: new Date(dataPagamento),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          `Serviço cadastrado com sucesso!
          `
        );

        document.getElementById("descricao").value = "";
        document.getElementById("tipo-servico").value = "";
        document.getElementById("cliente").value = "";
        document.getElementById("valor-pagamento").value = "";
        document.getElementById("data-pagamento").value = "";
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="container-services">
        <div className="tabs">
          <div className="tab active" id="tab-servico">
            Serviço
          </div>
          <div className="tab" id="tab-pagamento">
            Pagamento
          </div>
        </div>

        <div id="form-servico" className="forms">
          <div className="form-group">
            <label htmlFor="descricao">Descrição do serviço</label>
            <textarea
              id="descricao"
              placeholder="Descreva o serviço realizado..."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tipo-servico">Tipo de Serviço</label>
            <select id="tipo-servico">
              {tiposOptions && tiposOptions?.length > 0 && (
                <option value="" disabled>
                  Selecione uma opção
                </option>
              )}
              {tiposOptions && tiposOptions?.length > 0 ? (
                tiposOptions?.map((item) => (
                  <option key={item?.value} value={item?.value}>
                    {item?.label}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhuma opção encontrada
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cliente">Cliente</label>
            <select id="cliente">
              {clientesOptions && clientesOptions?.length > 0 && (
                <option value="" disabled>
                  Selecione uma opção
                </option>
              )}
              {clientesOptions && clientesOptions?.length > 0 ? (
                clientesOptions?.map((item) => (
                  <option key={item?.value} value={item?.value}>
                    {item?.label}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhuma opção encontrada
                </option>
              )}
            </select>
          </div>
          <button id="btn-cadastrar-servico">Cadastrar</button>
        </div>

        <div id="form-pagamento" className="forms hidden">
          <div className="form-group">
            <label htmlFor="valor-pagamento">Valor do Pagamento</label>
            <input
              type="text"
              id="valor-pagamento"
              placeholder="R$ Valor do pagamento, sem parcela"
            />
          </div>
          <div className="form-group">
            <label htmlFor="data-pagamento">Data do Pagamento</label>
            <input type="date" id="data-pagamento" />
          </div>
          <button id="btn-cadastrar-pagamento">Cadastrar</button>
        </div>
      </div>
    </form>
  );
}

export default Pagamento;
