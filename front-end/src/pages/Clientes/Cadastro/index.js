import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import "./style.css";
import axios from "axios";

function CadastroClientes() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [rua, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");



  const cadastrarCliente = useCallback(async () => {
    if (!nome || !cnpj || !rua || !cep || !cidade || !estado || !telefone) {
      toast.error("Favor preencha todos os campos!");
      return;
    }

    try {

      const token = localStorage.getItem("token");


      await axios.post(
        "http://localhost:3001/cadastro/clientes",
        {
          cnpj,
          nome,
          rua,
          cep,
          cidade,
          estado,
          telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNome("");
      setCnpj("");
      setEndereco("");
      setCep("");
      setCidade("");
      setEstado("");
      setTelefone("");
      toast.success("Cliente cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro no cadastro de cliente!");
      console.error("erro cadastro cliente: " + error);
    }
  }, [cep, cidade, cnpj, estado, nome, rua, telefone]);

  return (
    <div>
      <div className="container-services">
        <div id="form-cliente" className="forms">
          <div className="form-group">
            <label htmlFor="nome">Nome do Cliente</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ</label>
            <input
              type="text"
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="Digite o CNPJ do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              value={rua}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Digite o endereço do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Digite o CEP do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Digite a cidade do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="Digite o estado do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite o telefone do cliente"
            />
          </div>
          <button onClick={cadastrarCliente}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default CadastroClientes;
