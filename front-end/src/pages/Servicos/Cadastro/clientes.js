import React, { useEffect } from 'react';
import './style.css';

function CadastroClientes() {
  useEffect(() => {
    // Cadastro de cliente
    document.getElementById('btn-cadastrar-cliente').addEventListener('click', () => {
      const nome = document.getElementById('nome').value;
      const cnpj = document.getElementById('cnpj').value;
      const endereco = document.getElementById('endereco').value;
      const cep = document.getElementById('cep').value;
      const cidade = document.getElementById('cidade').value;
      const estado = document.getElementById('estado').value;
      const telefone = document.getElementById('telefone').value;

      if (nome && cnpj && endereco && cep && cidade && estado && telefone) {
        alert(`Cliente cadastrado com sucesso!\nNome: ${nome}\nCNPJ: ${cnpj}\nEndereço: ${endereco}\nCEP: ${cep}\nCidade: ${cidade}\nEstado: ${estado}\nTelefone: ${telefone}`);
        document.getElementById('nome').value = '';
        document.getElementById('cnpj').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('cep').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
        document.getElementById('telefone').value = '';
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });
  }, []); // useEffect vazio, executa apenas na montagem

  return (
    <div>
      <div className="container-clientes">
        <h2>Cadastro de Clientes</h2>
        <div id="form-cliente" className='forms'>
          <div className="form-group">
            <label htmlFor="nome">Nome do Cliente</label>
            <input type="text" id="nome" placeholder="Digite o nome do cliente" />
          </div>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ</label>
            <input type="text" id="cnpj" placeholder="Digite o CNPJ do cliente" />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input type="text" id="endereco" placeholder="Digite o endereço do cliente" />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" placeholder="Digite o CEP do cliente" />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" placeholder="Digite a cidade do cliente" />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input type="text" id="estado" placeholder="Digite o estado do cliente" />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="text" id="telefone" placeholder="Digite o telefone do cliente" />
          </div>
          <button id="btn-cadastrar-cliente">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default CadastroClientes;