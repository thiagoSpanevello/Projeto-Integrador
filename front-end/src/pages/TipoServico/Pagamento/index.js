import React, { useState } from "react";
import "./style.css";

const ListagemPagamentos = () => {
  const [filtro, setFiltro] = useState("todos");

  const pagamentos = [
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pago",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pago",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pago",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pago",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pago",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pago",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
    {
      diaPagamento: "04/12/2024",
      status: "pendente",
      valor: "R$ 400,00",
      cnpj: "123456789",
      desc: "afsfsafasfasfa",
      dataFechamento: "04/12/2024",
    },
  ];

  // Filtrar pagamentos com base no estado atual do filtro
  const pagamentosFiltrados =
    filtro === "todos"
      ? pagamentos
      : pagamentos.filter((pagamento) => pagamento.status === filtro);

  return (
    <div class="containerPagamento">
      <span class="title-pagamento">Pagamentos</span>

      {/* Filtro */}
      <div class="form-group-pagamento filtro">
        <label htmlFor="filtro-status">Filtro</label>
        <select
          id="filtro-status"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="pago">Pagos</option>
          <option value="pendente">Pendentes</option>
        </select>
      </div>

      {/* Tabela de pagamentos */}
      <div class="listagemPagamento">
        <div className="header">
          <span>Dia de Pagamento</span>
          <span>Valor</span>
          <span>CNPJ</span>
          <span>Descrição</span>
          <span>Data de Fechamento</span>
          <span>Status</span>
        </div>
        <div class="scroll">
          <div class="inside-container-pagamento">
            {pagamentosFiltrados.map((pagamento, index) => (
              <div key={index} className={`item ${pagamento.status}`}>
                <span>{pagamento.diaPagamento}</span>
                <span>{pagamento.valor}</span>
                <span>{pagamento.cnpj}</span>
                <span>{pagamento.desc}</span>
                <span>{pagamento.dataFechamento}</span>
                <span className={`status ${pagamento.status}`}>
                  {pagamento.status === "pago" ? "Pago" : "Pendente"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListagemPagamentos;
