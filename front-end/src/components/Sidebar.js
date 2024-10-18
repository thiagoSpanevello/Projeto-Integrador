import React, { useState } from 'react';
import './Sidebar.css'; 

function Sidebar() {
  const [showCadastros, setShowCadastros] = useState(false);
  const [showRelatorios, setShowRelatorios] = useState(false);
  const [showEmissoes, setShowEmissoes] = useState(false);

  const handleToggleCadastros = () => {
    setShowCadastros(!showCadastros);
  };

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
        <span className="user-info">admin@empresa</span>
      </div>
      <div className="sidebar-menu">
        <div className="menu-item" onClick={handleToggleCadastros}>
          <span>Cadastros</span>
          <span className="arrow-icon">▼</span>
        </div>
        <ul className={`submenu ${showCadastros ? 'show' : ''}`}>
          <li>Funcionários</li>
          <li>Clientes</li>
          <li>Tipos de Serviço</li>
          <li>Serviços</li>
        </ul>
        <div className="menu-item" onClick={handleToggleRelatorios}>
          <span>Relatórios</span>
          <span className="arrow-icon">▼</span>
        </div>
        <ul className={`submenu ${showRelatorios ? 'show' : ''}`}>
          <li>Funcionários</li>
          <li>Clientes</li>
          <li>Tipos de Serviço</li>
          <li>Serviços</li>
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