import React from 'react'
import Sidebar from '../../components/Sidebar'
import Dashboard from '../../components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Pagamento from '../Servicos/Cadastro';
import ListagemServicos from '../Servicos/Listagem';
function Home() {
    return (
        <div>
            <Sidebar />
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path='CadastroServico' element={<Pagamento />} />
                <Route path='ListagemServico' element={<ListagemServicos />} />
            </Routes>
        </div>
    )
}

export default Home
