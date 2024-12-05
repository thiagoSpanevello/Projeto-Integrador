import React, { useCallback } from "react";
import axios from "axios";
import "./style.css";


//Não fiz a parte de clicar, devo ter dor na bunda porque esqueci como fazer. Thiago veja por favor

document.body.innerHTML = `
  <div class="container">
    <h2>Pagamentos</h2>
    
    <!-- Filtro de status -->
    <div class="filtro">
      <label for="filtro-status">Filtrar por Status:</label>
      <select id="filtro-status" onchange="filtrarPagamentos()">
        <option value="todos">Todos</option>
        <option value="pago">Pagos</option>
        <option value="pendente">Pendentes</option>
      </select>
    </div>

    <table id="tabela-pagamentos">
      <thead>
        <tr>
          <th>Dia de Pagamento</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="pagamento pago">
          <td>01/12/2024</td>
          <td class="status pago">Pago</td>
        </tr>
        <tr class="pagamento pendente">
          <td>05/12/2024</td>
          <td class="status pendente">Pendente</td>
        </tr>
        <tr class="pagamento pago">
          <td>10/12/2024</td>
          <td class="status pago">Pago</td>
        </tr>
        <tr class="pagamento pendente">
          <td>15/12/2024</td>
          <td class="status pendente">Pendente</td>
        </tr>
      </tbody>
    </table>
  </div>
`;

// Função para filtrar os pagamentos
function filtrarPagamentos() {
  const filtro = document.getElementById('filtro-status').value;
  const pagamentos = document.querySelectorAll('.pagamento');
  
  pagamentos.forEach(pagamento => {
    const status = pagamento.querySelector('.status').classList.contains('pago') ? 'pago' : 'pendente';
    
    // Mostrar ou esconder com base no filtro
    if (filtro === 'todos' || status === filtro) {
      pagamento.style.display = '';
    } else {
      pagamento.style.display = 'none';
    }
  });
}
