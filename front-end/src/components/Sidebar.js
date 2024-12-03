import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [showCadastros, setShowCadastros] = useState(false);
  const [showRelatorios, setShowRelatorios] = useState(false);
  const [showEmissoes, setShowEmissoes] = useState(false);
  const [user, setUser] = useState(null);
  const handleToggleCadastros = () => {
    setShowCadastros(!showCadastros);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Salva o funcionário no estado
    }
  }, []);

  const handleToggleRelatorios = () => {
    setShowRelatorios(!showRelatorios);
  };

  const handleToggleEmissoes = () => {
    setShowEmissoes(!showEmissoes);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="user-icon">👤</span>
        <span className="user-info">{user ? user.conta : 'Carregando...'}</span>
      </div>
      <div className="sidebar-menu">
        <div className="menu-item" onClick={handleToggleCadastros}>
          <span>Cadastros</span>
          <span className="arrow-icon">▼</span>
        </div>
        <ul className={`submenu ${showCadastros ? 'show' : ''}`}>
          {user && user.cargo !== 'funcionario' && (
            <div>
              <li><Link to="/Home/CadastroFuncionarios">Funcionarios</Link></li>
              <li><Link to="/Home/CadastroClientes">Clientes</Link></li>
              <li>Tipos de Serviço</li>
            </div>
          )}
          <li><Link to="/Home/CadastroServico">Serviços</Link></li>
        </ul>
        <div className="menu-item" onClick={handleToggleRelatorios}>
          <span>Relatórios</span>
          <span className="arrow-icon">▼</span>
        </div>
        <ul className={`submenu ${showRelatorios ? 'show' : ''}`}>
          {user && user.cargo !== 'funcionario' && (
            <>
              <li><Link to="/Home/ListagemFuncionarios">Funcionarios</Link></li>
            </>
          )}
          <li><Link to="/Home/ListagemClientes">Clientes</Link></li>
          <li>Tipos de Serviço</li>
          <li><Link to="/Home/ListagemServico">Serviços</Link></li>
          <li>Pagamentos</li>
        </ul>
        <div className="menu-item" onClick={handleToggleEmissoes}>
          <span>Emissões</span>
          <span className="arrow-icon">▼</span>
        </div>
        <ul className={`submenu ${showEmissoes ? 'show' : ''}`}>
          <li>Boleto</li>
          <li>Nota Fiscal de Serviço</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;