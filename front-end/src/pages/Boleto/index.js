import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function ListagemEmissoesBoleto() {
  const [emissoes, setEmissoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroData, setFiltroData] = useState("todos");

  const dadosFicticios = [
    {
      datacadastro: "2023-10-08T10:00:00Z",
      valor: 1500.00,
      descricao: "Serviço de Consultoria",
      cnpjCliente: "12.345.678/0001-90",
    },
    {
      datacadastro: "2023-10-05T12:30:00Z",
      valor: 2500.00,
      descricao: "Desenvolvimento de Software",
      cnpjCliente: "98.765.432/0001-01",
    },
    {
      datacadastro: "2023-10-30T15:45:00Z",
      valor: 300.00,
      descricao: "Manutenção de Equipamentos",
      cnpjCliente: "11.222.333/0001-11",
    },
    {
      datacadastro: "2023-10-01T10:00:00Z",
      valor: 1500.00,
      descricao: "Serviço de Consultoria",
      cnpjCliente: "12.345.678/0001-90",
    },
    {
      datacadastro: "2023-10-10T15:45:00Z",
      valor: 300.00,
      descricao: "Manutenção de Equipamentos",
      cnpjCliente: "11.222.333/0001-11",
    },
  ];

  const fetchEmissoes = async () => {
    try {
      const token = localStorage.getItem("token");

      // Simulando a resposta da API com dados fictícios
      // const response = await axios.get(
      //   "http://localhost:3001/relatorio/emissoes",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // Usando dados fictícios em vez da chamada real
      setEmissoes(dadosFicticios);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar emissões:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmissoes();
  }, []);

  const gerarDocumentos = (index) => {
    const emissao = emissoes[index];
    alert(`Gerar documentos para: ${JSON.stringify(emissao)}`);
    // Aqui você pode implementar a lógica para gerar os documentos
  };

   // Filtrar emissões com base no estado atual do filtro
   const emissõesFiltradas =
   filtroData === "todos"
     ? emissoes
     : filtroData === "maisAntigo"
     ? [...emissoes].sort((a, b) => new Date(a.datacadastro) - new Date(b.datacadastro))
     : [...emissoes].sort((a, b) => new Date(b.datacadastro) - new Date(a.datacadastro));

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="containerListagemEmissoesBoleto">
        <span class="title-emissoes-boleto">Boletos</span>

         {/* Filtro de Data */}
        <div className="form-group-listagem-boleto filtro">
          <label htmlFor="filtro-data">Filtro</label>
          <select
            id="filtro-data"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="maisAntigo">Mais Antigo</option>
            <option value="maisRecente">Mais Recente</option>
          </select>
        </div>
         
        <div className="inside-container-listagem-emissoes-boleto">
          <div className="listagemEmissoesBoleto">
            <div className="header">
              <span>
                <strong>Data Cadastro</strong>
              </span>
              <span>
                <strong>Valor</strong>
              </span>
              <span>
                <strong>Descrição do Serviço</strong>
              </span>
              <span>
                <strong>CNPJ do Cliente</strong>
              </span>
              <span>
                <strong>Situação</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            <div className="scroll">
               {emissõesFiltradas.map((emissao, index) => (
                <div key={index} className="item">
                  <span>{new Date(emissao.datacadastro).toLocaleDateString()}</span>
                  <span>{emissao.valor.toFixed(2)}</span>
                  <span>{emissao.descricao}</span>
                  <span>{emissao.cnpjCliente}</span>
                  <span>Pagamento em aberto</span>
                  <button className="actions" onClick={() => gerarDocumentos(index)}>
                    Gerar Documentos
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

export default ListagemEmissoesBoleto;