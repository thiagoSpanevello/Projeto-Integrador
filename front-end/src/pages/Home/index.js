import React from 'react'
import Sidebar from '../../components/Sidebar'
import Dashboard from '../../components/Dashboard';
function Home() {
    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            <div>
                <Dashboard/>
            </div>
            
        </div>
    )
}

export default Home
