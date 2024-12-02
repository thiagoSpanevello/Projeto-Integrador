import React, { useEffect } from 'react';
import './style.css';

function CadastroFuncionarios() {
  useEffect(() => {
    // Elementos do DOM
    const tabFuncionario = document.getElementById('tab-funcionario');
    const tabGerente = document.getElementById('tab-gerente');
    const formFuncionario = document.getElementById('form-funcionario');
    const formGerente = document.getElementById('form-gerente');

    // Alternar abas
    tabFuncionario.addEventListener('click', () => {
      tabFuncionario.classList.add('active');
      tabGerente.classList.remove('active');
      formFuncionario.classList.remove('hidden');
      formGerente.classList.add('hidden');
    });

    tabGerente.addEventListener('click', () => {
      tabGerente.classList.add('active');
      tabFuncionario.classList.remove('active');
      formGerente.classList.remove('hidden');
      formFuncionario.classList.add('hidden');
    });

    // Cadastro de funcionário
    document.getElementById('btn-cadastrar-funcionario').addEventListener('click', () => {
      const cpf = document.getElementById('cpf-funcionario').value;
      const nome = document.getElementById('nome-funcionario').value;
      const senha = document.getElementById('senha-funcionario').value;

      if (cpf && nome && senha) {
        alert(`Funcionário cadastrado com sucesso!\nCPF: ${cpf}\nNome: ${nome}`);
        document.getElementById('cpf-funcionario').value = '';
        document.getElementById('nome-funcionario').value = '';
        document.getElementById('senha-funcionario').value = '';
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });

    // Cadastro de gerente
    document.getElementById('btn-cadastrar-gerente').addEventListener('click', () => {
      const cpf = document.getElementById('cpf-gerente').value;
      const nome = document.getElementById('nome-gerente').value;
      const senha = document.getElementById('senha-gerente').value;

      if (cpf && nome && senha) {
        alert(`Gerente cadastrado com sucesso!\nCPF: ${cpf}\nNome: ${nome}`);
        document.getElementById('cpf-gerente').value = '';
        document.getElementById('nome-gerente').value = '';
        document.getElementById('senha-gerente').value = '';
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });
  }, []); // useEffect vazio, executa apenas na montagem

  return (
    <div>
      <div className="container-employees">
        <div className="tabs">
          <div className="tab active" id="tab-funcionario">Funcionário</div>
          <div className="tab" id="tab-gerente">Gerente</div>
        </div>

        <div id="form-funcionario" className='forms'>
          <div className="form-group">
            <label htmlFor="cpf-funcionario">CPF</label>
            <input type="text" id="cpf-funcionario" placeholder="Digite o CPF" />
          </div>
          <div className="form-group">
            <label htmlFor="nome-funcionario">Nome</label>
            <input type="text" id="nome-funcionario" placeholder="Digite o nome" />
          </div>
          <div className="form-group">
            <label htmlFor="senha-funcionario">Senha</label>
            <input type="password" id="senha-funcionario" placeholder="Digite a senha" />
          </div>
          <button id="btn-cadastrar-funcionario">Cadastrar Funcionário</ button>
        </div>

        <div id="form-gerente" className="forms hidden">
          <div className="form-group">
            <label htmlFor="cpf-gerente">CPF</label>
            <input type="text" id="cpf-gerente" placeholder="Digite o CPF" />
          </div>
          <div className="form-group">
            <label htmlFor="nome-gerente">Nome</label>
            <input type="text" id="nome-gerente" placeholder="Digite o nome" />
          </div>
          <div className="form-group">
            <label htmlFor="senha-gerente">Senha</label>
            <input type="password" id="senha-gerente" placeholder="Digite a senha" />
          </div>
          <button id="btn-cadastrar-gerente">Cadastrar Gerente</button>
        </div>
      </div>
    </div>
  );
}

export default CadastroFuncionarios;