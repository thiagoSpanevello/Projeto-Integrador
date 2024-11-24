import React from 'react'
import './style.css'

document.body.innerHTML = `
  <div class="container">
    <div class="tabs">
      <div class="tab active" id="tab-servico">Serviço</div>
      <div class="tab" id="tab-pagamento">Pagamento</div>
    </div>

    <!-- Aba Serviço -->
    <div id="form-servico">
      <div class="form-group">
        <label for="descricao">Descrição do serviço</label>
        <textarea id="descricao" placeholder="Descreva o serviço realizado..."></textarea>
      </div>
      <div class="form-group">
        <label for="tipo-servico">Tipo de Serviço</label>
        <select id="tipo-servico">
          <option value="frete">Frete</option>
          <option value="contabilidade">Contabilidade</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cliente">Cliente</label>
        <select id="cliente">
          <option value="cliente1">Cliente1</option>
          <option value="cliente2">Cliente2</option>
          <option value="cliente3">Cliente3</option>
        </select>
      </div>
      <button id="btn-cadastrar-servico">Cadastrar</button>
    </div>

    <!-- Aba Pagamento -->
    <div id="form-pagamento" class="hidden">
      <div class="form-group">
        <label for="valor-pagamento">Valor do Pagamento</label>
        <input type="text" id="valor-pagamento" placeholder="R$ Valor do pagamento, sem parcela">
      </div>
      <div class="form-group">
        <label for="data-pagamento">Data do Pagamento</label>
        <input type="date" id="data-pagamento">
      </div>
      <button id="btn-cadastrar-pagamento">Cadastrar</button>
    </div>
  </div>
`;

// Lógica de navegação entre abas
const tabServico = document.getElementById('tab-servico');
const tabPagamento = document.getElementById('tab-pagamento');
const formServico = document.getElementById('form-servico');
const formPagamento = document.getElementById('form-pagamento');

tabServico.addEventListener('click', () => {
  tabServico.classList.add('active');
  tabPagamento.classList.remove('active');
  formServico.classList.remove('hidden');
  formPagamento.classList.add('hidden');
});

tabPagamento.addEventListener('click', () => {
  tabPagamento.classList.add('active');
  tabServico.classList.remove('active');
  formPagamento.classList.remove('hidden');
  formServico.classList.add('hidden');
});

//Cadastro
document.getElementById('btn-cadastrar-servico').addEventListener('click', () => {
  const descricao = document.getElementById('descricao').value;
  const tipoServico = document.getElementById('tipo-servico').value;
  const cliente = document.getElementById('cliente').value;

  if (descricao && tipoServico && cliente) {
    alert(`Serviço cadastrado com sucesso!\nDescrição: ${descricao}\nTipo: ${tipoServico}\nCliente: ${cliente}`);
    document.getElementById('descricao').value = '';
    document.getElementById('tipo-servico').value = 'frete';
    document.getElementById('cliente').value = 'cliente1';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

//Cadastro de pagamento
document.getElementById('btn-cadastrar-pagamento').addEventListener('click', () => {
  const valorPagamento = document.getElementById('valor-pagamento').value;
  const dataPagamento = document.getElementById('data-pagamento').value;

  if (valorPagamento && dataPagamento) {
    alert(`Pagamento cadastrado com sucesso!\nValor: ${valorPagamento}\nData: ${dataPagamento}`);
    document.getElementById('valor-pagamento').value = '';
    document.getElementById('data-pagamento').value = '';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});