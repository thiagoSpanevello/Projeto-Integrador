// models/Cliente.js

import db from '../services/db.js';

const Cliente = {
    add: (cnpj, nome, rua, cep, cidade, estado, telefone) => {
        return db.none(
            'INSERT INTO cliente(cnpj, nomeempresa, rua, cidade, cep, estado, telefone) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [cnpj, nome, rua, cidade, cep, estado, telefone]
        );
    },

    // Modificado para listar clientes do CNPJ da empresa logada
    listByEmpresa: (empresaCnpj) => {
        return db.any(
            `SELECT c.*
             FROM cliente c
             INNER JOIN atende a ON a.clientecnpj = c.cnpj
             WHERE a.empresacnpj = $1`,
            [empresaCnpj]
        );
    },

    listCNPJ: (cnpj) => {
        return db.oneOrNone('SELECT * FROM cliente WHERE cnpj = $1', [cnpj]);
    },

    atualizar: (cnpj, nome, rua, cep, cidade, estado, telefone) => {
        return db.none(
            'UPDATE cliente SET nome = $1, endereco_rua = $2, endereco_cep = $3, endereco_cidade = $4, endereco_estado = $5, telefone = $6 WHERE cnpj = $7',
            [nome, rua, cep, telefone, cidade, estado, cnpj]
        );
    },

    delete: (cnpj) => {
        return db.none('DELETE FROM cliente WHERE cnpj = $1', [cnpj]);
    }
};

export default Cliente;
