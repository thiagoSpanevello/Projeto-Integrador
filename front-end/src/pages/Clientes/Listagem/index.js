import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import axios from "axios";
import "./style.css";

function ListagemClientes() {
  const [ordem, setOrdem] = useState("nome");
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nomeempresa, setNome] = useState("");
  const [rua, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3001/relatorio/clientes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
        const nomeA = a.nomeempresa || "";
        const nomeB = b.nomeempresa || "";
        return nomeA.localeCompare(nomeB);
      } else if (ordem === "cnpj") {
        const cnpjA = a.cnpj || "";
        const cnpjB = b.cnpj || "";
        return cnpjA.localeCompare(cnpjB);
      }
      return 0;
    });
  };

  const alteraCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setNome(cliente.nomeempresa);
    setEndereco(cliente.rua);
    setCep(cliente.cep);
    setCidade(cliente.cidade);
    setEstado(cliente.estado);
    setTelefone(cliente.telefone);
    setModalOpen(true);
  }

  const updateCliente = async (cnpj) => {
    const newCnpj = cnpj.replaceAll(/[^0-9]/g, "");
    console.log(newCnpj);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3001/update/clientes/${newCnpj}`, {
        nomeempresa,
        rua,
        cidade,
        estado,
        cep,
        telefone
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Cliente atualizado com sucesso!");
      modalOpen(false);
      fetchClientes();
    } catch (error) {
      console.error("Erro ao atualizar Cliente: " + error);
      toast.error("Erro ao atualizar Cliente.")
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="containerListagemClientes">
        <div className="inside-container-listagem-clientes">
          <div className="form-group-listagem-clientes">
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

          <div className="listagemClientes">
            <div className="header">
              <span>
                <strong>Nome</strong>
              </span>
              <span>
                <strong>CNPJ</strong>
              </span>
              <span>
                <strong>Endereço</strong>
              </span>
              <span>
                <strong>CEP</strong>
              </span>
              <span>
                <strong>Cidade</strong>
              </span>
              <span>
                <strong>Estado</strong>
              </span>
              <span>
                <strong>Telefone</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            <div class="scroll">
              {ordenarClientes(clientes).map((cliente, index) => (
                <div key={index} className="item">
                  <span>{cliente.nomeempresa}</span>
                  <span>{cliente.cnpj}</span>
                  <span>{cliente.rua}</span>
                  <span>{cliente.cep}</span>
                  <span>{cliente.cidade}</span>
                  <span>{cliente.estado}</span>
                  <span>{cliente.telefone}</span>
                  <button class="actions" onClick={() => alteraCliente(cliente)}>
                    Alterar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Alterar Funcionario"
        className="modal"
        overlayClassName="overlay">
        <h2>Alterar Cliente</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nome">
              Nome: <input id="nome" type="text" value={nomeempresa} onChange={(e) => setNome(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="endereco">
              Endereco: <input id="endereco" type="text" value={rua} onChange={(e) => setEndereco(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="cep">
              Cep: <input id="cep" type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="cidade">
              Cidade: <input id="cidade" type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="estado">
              Estado: <input id="estado" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="telefone">
              Telefone: <input id="telefone" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </label>
          </div>

          <button type="button" onClick={() => updateCliente(clienteSelecionado.cnpj)}>
            Atualizar Cliente
          </button>
        </form>
        <button className="close" onClick={() => setModalOpen(false)}>Fechar</button>
      </Modal>

    </div>
  );
}

export default ListagemClientes;
