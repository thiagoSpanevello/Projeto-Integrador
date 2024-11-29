import React, { useEffect } from 'react';
import './style.css';

function Pagamento() {
  useEffect(() => {
    // Elementos do DOM
    const tabServico = document.getElementById('tab-servico');
    const tabPagamento = document.getElementById('tab-pagamento');
    const formServico = document.getElementById('form-servico');
    const formPagamento = document.getElementById('form-pagamento');

    // Alternar abas
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

    // Cadastro de serviço
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

    // Cadastro de pagamento
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
  }, []); // useEffect vazio, executa apenas na montagem

  return (
    <div>
      <div className="container-services">
        <div className="tabs">
          <div className="tab active" id="tab-servico">Serviço</div>
          <div className="tab" id="tab-pagamento">Pagamento</div>
        </div>

        <div id="form-servico" className='forms'>
          <div className="form-group">
            <label htmlFor="descricao">Descrição do serviço</label>
            <textarea id="descricao" placeholder="Descreva o serviço realizado..."></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tipo-servico">Tipo de Serviço</label>
            <select id="tipo-servico">
              <option value="frete">Frete</option>
              <option value="contabilidade">Contabilidade</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cliente">Cliente</label>
            <select id="cliente">
              <option value="cliente1">Cliente1</option>
              <option value="cliente2">Cliente2</option>
              <option value="cliente3">Cliente3</option>
            </select>
          </div>
          <button id="btn-cadastrar-servico">Cadastrar</button>
        </div>

        <div id="form-pagamento" className="forms hidden">
          <div className="form-group">
            <label htmlFor="valor-pagamento">Valor do Pagamento</label>
            <input type="text" id="valor-pagamento" placeholder="R$ Valor do pagamento, sem parcela" />
          </div>
          <div className="form-group">
            <label htmlFor="data-pagamento">Data do Pagamento</label>
            <input type="date" id="data-pagamento" />
          </div>
          <button id="btn-cadastrar-pagamento">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default Pagamento;
