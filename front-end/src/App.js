import React from 'react';
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home';
import Pagamento from './pages/Servicos/indexPagamento';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Signin />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
