// models/Atende.js

import db from '../services/db.js'; // Importa a instância de conexão com o banco

const Atende = {
    // Adicionar uma associação entre empresa e cliente
    add: (cnpjCliente, cnpjEmpresa) => {
        return db.none(
            'INSERT INTO atende (clientecnpj, empresacnpj) VALUES($1, $2)',
            [cnpjCliente, cnpjEmpresa]
        );
    },

    // Listar todas as associações para um determinado CNPJ de empresa
    listByEmpresa: (cnpjEmpresa) => {
        return db.any(
            'SELECT * FROM atende WHERE empresacnpj = $1',
            [cnpjEmpresa]
        );
    },

    // Listar todas as associações para um determinado CNPJ de cliente
    listByCliente: (cnpjCliente) => {
        return db.any(
            'SELECT * FROM atende WHERE clientecnpj = $1',
            [cnpjCliente]
        );
    },

    // Deletar uma associação entre empresa e cliente
    delete: (cnpjEmpresa, cnpjCliente) => {
        return db.none(
            'DELETE FROM atende WHERE empresacnpj = $1 AND clientecnpj = $2',
            [cnpjEmpresa, cnpjCliente]
        );
    }
};

export default Atende;
