import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function ListagemClientes() {
  const [ordem, setOrdem] = useState("nome");
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get("http://localhost:3001/relatorio/clientes", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setClientes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const ordenarClientes = (clientes) => {
    return clientes.sort((a, b) => {
      if (ordem === "nome") {
        const nomeA = a.nomeempresa || '';
        const nomeB = b.nomeempresa || '';
        return nomeA.localeCompare(nomeB);
      } else if (ordem === "cnpj") {
        const cnpjA = a.cnpj || '';
        const cnpjB = b.cnpj || '';
        return cnpjA.localeCompare(cnpjB);
      }
      return 0;
    });
  };

  const deletarCliente = async (index) => {
    const cliente = clientes[index];
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:3001/funcionarios/${cliente.cnpj}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
            <div className="header">
              <span><strong>Nome da Empresa</strong></span>
              <span><strong>CNPJ</strong></span>
              <span><strong>Endereço</strong></span>
              <span><strong>CEP</strong></span>
              <span><strong>Cidade</strong></span>
              <span><strong>Estado</strong></span>
              <span><strong>Telefone</strong></span>
              <span><strong>Ações</strong></span>
            </div>
            {ordenarClientes(clientes).map((cliente, index) => (
              <div key={index} className="item">
                <span>{cliente.nomeempresa}</span>
                <span>{cliente.cnpj}</span>
                <span>{cliente.endereco}</span>
                <span>{cliente.cep}</span>
                <span>{cliente.cidade}</span>
                <span>{cliente.estado}</span>
                <span>{cliente.telefone}</span>
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