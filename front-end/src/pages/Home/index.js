import React from 'react'
import Sidebar from '../../components/Sidebar'
import Dashboard from '../../components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function Home() {
    return (
        <div>
            <Sidebar />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Dashboard />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Home
