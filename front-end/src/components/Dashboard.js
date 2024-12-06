import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const ganhos = [1200, 1500, 800, 2000, 1700, 1900, 2200, 2500, 3000, 2700, 3100, 4000];
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 
        'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 
        'Novembro', 'Dezembro'
    ];

    return (
        <div className="dashboard">
            <h1>Ganhos Mensais</h1>
            <div className="grafico">
                {ganhos.map((ganho, index) => (
                    <div key={index} className="barra" style={{ height: `${ganho / 40}px` }}>
                        <span className="valor">R$ {ganho}</span>
                    </div>
                ))}
            </div>
            <div className="meses">
                {meses.map((mes, index) => (
                    <span key={index} className="mes">{mes}</span>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;