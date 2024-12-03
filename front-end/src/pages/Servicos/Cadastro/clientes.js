import React, { useState } from 'react';
import './style.css';
import axios from 'axios'; // Importando o axios para fazer requisições HTTP

function CadastroClientes() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [rua, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Função para cadastrar o cliente
  const cadastrarCliente = async () => {
    if (!nome || !cnpj || !rua || !cep || !cidade || !estado || !telefone) {
      setError('Por favor, preencha todos os campos.');
      setSuccess('');
      return;
    }

    try {
      // Obtendo o token (ajuste conforme necessário para o seu sistema de armazenamento)
      const token = localStorage.getItem('token'); // Certifique-se de que o token está armazenado no localStorage

      // Fazendo a requisição POST para o backend com o cabeçalho de autorização
      await axios.post(
        'http://localhost:3001/cadastro/clientes',
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
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        }
      );

      setSuccess('Cliente cadastrado com sucesso!');
      setError('');

      // Limpar os campos após o sucesso
      setNome('');
      setCnpj('');
      setEndereco('');
      setCep('');
      setCidade('');
      setEstado('');
      setTelefone('');
    } catch (error) {
      setError('Erro ao cadastrar cliente. Tente novamente.');
      setSuccess('');
    }
  };


  return (
    <div>
      <div className="container-clientes">
        <h2>Cadastro de Clientes</h2>
        <div id="form-cliente" className="forms">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
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
