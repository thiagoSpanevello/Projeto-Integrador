import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [showCadastros, setShowCadastros] = useState(false);
  const [showRelatorios, setShowRelatorios] = useState(false);
  const [showEmissoes, setShowEmissoes] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleToggleCadastros = () => {
    setShowCadastros(!showCadastros);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-header">
          <span className="user-icon">👤</span>
          <span className="user-info">
            {user ? user.conta : "Carregando..."}
          </span>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item" onClick={handleToggleCadastros}>
            <span>Cadastros</span>
            <span className="arrow-icon">▼</span>
          </div>
          <ul className={`submenu ${showCadastros ? "show" : ""}`}>
            {user && user.cargo !== "funcionario" && (
              <>
                <li>
                  <Link to="/Home/CadastroFuncionarios">Funcionarios</Link>
                </li>
                <li>
                  <Link to="/Home/CadastroClientes">Clientes</Link>
                </li>
                <li>
                  <Link to="/Home/CadastroTipoServico">Tipos de Serviço</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/Home/CadastroServico">Serviços</Link>
            </li>
          </ul>
          <div className="menu-item" onClick={handleToggleRelatorios}>
            <span>Relatórios</span>
            <span className="arrow-icon">▼</span>
          </div>
          <ul className={`submenu ${showRelatorios ? "show" : ""}`}>
            {user && user.cargo !== "funcionario" && (
              <>
                <li>
                  <Link to="/Home/ListagemFuncionarios">Funcionarios</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/Home/ListagemClientes">Clientes</Link>
            </li>
            <li>
              <Link to="/Home/ListagemTipoServico">Tipos de Serviço</Link>
            </li>
            <li>
              <Link to="/Home/ListagemServico">Serviços</Link>
            </li>
            <li>
              <a>Pagamentos</a>
            </li>
          </ul>
          <div className="menu-item" onClick={handleToggleEmissoes}>
            <span>Emissões</span>
            <span className="arrow-icon">▼</span>
          </div>
          <ul className={`submenu ${showEmissoes ? "show" : ""}`}>
            <li>
              <a>Boleto</a>
            </li>
            <li>
              <a>PNota Fiscal de Serviço</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default Sidebar;
