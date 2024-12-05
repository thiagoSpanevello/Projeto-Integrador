import React from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Pagamento from "../Servicos/Cadastro";
import ListagemServicos from "../Servicos/Listagem";
import CadastroClientes from "../Servicos/Cadastro/clientes";
import ListagemClientes from "../Servicos/Listagem/clientes";
import CadastroFuncionarios from "../Servicos/Cadastro/funcionarios";
import ListagemFuncionarios from "../Servicos/Listagem/funcionarios";
import CadastroTipoServico from "../TipoServico/Cadastro";
import ListagemTipoServico from "../TipoServico/Listagem";

function Home() {
  return (
    <div className="Home-container">
      <Sidebar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="CadastroServico" element={<Pagamento />} />
        <Route path="ListagemServico" element={<ListagemServicos />} />
        <Route path="CadastroClientes" element={<CadastroClientes />} />
        <Route path="ListagemClientes" element={<ListagemClientes />} />
        <Route path="CadastroFuncionarios" element={<CadastroFuncionarios />} />
        <Route path="ListagemFuncionarios" element={<ListagemFuncionarios />} />
        <Route path="CadastroTipoServico" element={<CadastroTipoServico />} />
        <Route path="ListagemTipoServico" element={<ListagemTipoServico />} />
      </Routes>
    </div>
  );
}

export default Home;
