import React, { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";

function Pagamento() {
  const [tiposOptions, setTiposOptions] = useState([]);
  const [clientesOptions, setClienteOptions] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [cliente, setCliente] = useState("");
  const [valorPagamento, setValorPagamento] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const [activeTab, setActiveTab] = useState("servico");

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
    } catch (e) {
      console.error("Erro ao buscar opções:", e);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const handleSubmit = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (descricao && tipoServico && cliente && valorPagamento) {
      try {
        await axios.post(
          "http://localhost:3001/cadastro/servico",
          {
            dataRealizacao: new Date(),
            descricao,
            tipoServicoId: tipoServico,
            clienteCNPJ: cliente,
            valor: valorPagamento,
            dataCadastro: dataPagamento
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Serviço cadastrado com sucesso!");

        setDescricao("");
        setTipoServico("");
        setCliente("");
        setValorPagamento("");
        setDataPagamento("");
      } catch (e) {
        console.error("Erro ao cadastrar serviço:", e);
        toast.error("Erro ao cadastrar serviço. Verifique os dados.");
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  }, [descricao, tipoServico, cliente, valorPagamento, dataPagamento]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
            className={`tab ${activeTab === "servico" ? "active" : ""}`}
            id="tab-servico"
            onClick={() => handleTabClick("servico")}
          >
            Serviço
          </div>
          <div
            className={`tab ${activeTab === "pagamento" ? "active" : ""}`}
            id="tab-pagamento"
            onClick={() => handleTabClick("pagamento")}
          >
            Pagamento
          </div>
        </div>

        <div
          id="form-servico"
          className={`forms ${activeTab === "servico" ? "" : "hidden"}`}
        >
          <div className="form-group">
            <label htmlFor="descricao">Descrição do serviço</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o serviço realizado..."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tipo-servico">Tipo de Serviço</label>
            <select
              id="tipo-servico"
              value={tipoServico}
              onChange={(e) => setTipoServico(e.target.value)}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {tiposOptions?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cliente">Cliente</label>
            <select
              id="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {clientesOptions?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Cadastrar Serviço</button>
        </div>

        <div
          id="form-pagamento"
          className={`forms ${activeTab === "pagamento" ? "" : "hidden"}`}
        >
          <div className="form-group">
            <label htmlFor="valor-pagamento">Valor do Pagamento</label>
            <input
              type="text"
              id="valor-pagamento"
              value={valorPagamento}
              onChange={(e) => setValorPagamento(e.target.value)}
              placeholder="R$ Valor do pagamento, sem parcela"
            />
          </div>
          <div className="form-group">
            <label htmlFor="data-pagamento">Data do Pagamento</label>
            <input
              type="date"
              id="data-pagamento"
              value={dataPagamento}
              onChange={(e) => setDataPagamento(e.target.value)}
            />
          </div>
          <button type="submit">Cadastrar Pagamento</button>
        </div>
      </div>
    </form>
  );
}

export default Pagamento;
