import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function ListagemClientes() {
  const [ordem, setOrdem] = useState("nome"); // Usando "ordem" em vez de "filtro"
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar clientes do backend
  const fetchClientes = async () => {
    try {
      // Recupera o token armazenado no localStorage
      const token = localStorage.getItem('token');

      const response = await axios.get("http://localhost:3001/relatorio/clientes", {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        }
      });

      setClientes(response.data); // Assumindo que a resposta é um array de clientes
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []); // Carrega os clientes apenas uma vez, quando o componente for montado

  const ordenarClientes = (clientes) => {
    // Ordenar clientes com base na opção selecionada (nome ou cnpj)
    return clientes.sort((a, b) => {
      if (ordem === "nome") {
        return a.nome.localeCompare(b.nome); // Ordenação por nome
      } else if (ordem === "cnpj") {
        return a.cnpj.localeCompare(b.cnpj); // Ordenação por CNPJ
      }
      return 0;
    });
  };

  const deletarCliente = async (index) => {
    const cliente = clientes[index];
    try {
      // Recupera o token e envia com a requisição de exclusão
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:3001/funcionarios/${cliente.cnpj}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        }
      });

      setClientes(clientes.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const alterarCliente = (index) => {
    alert(`Alterar cliente: ${JSON.stringify(clientes[index])}`);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="inside-container">
          <div className="form-group">
            <label htmlFor="ordem">Ordenação</label>
            <select
              id="ordem"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
            >
              <option value="nome">Nome do Cliente</option>
              <option value="cnpj">CNPJ</option>
            </select>
          </div>

          <div className="listagem">
            {ordenarClientes(clientes).map((cliente, index) => (
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
