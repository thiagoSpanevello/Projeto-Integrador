import db from '../services/db.js';

const Cliente = {
    add: (cnpj, nome, rua, cep, cidade, estado, telefone) => {
        return db.none(
            'INSERT INTO cliente(cnpj, nome, endereco_rua, endereco_cep, endereco_cidade, endereco_estado, telefone) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [cnpj, nome, rua, cep, cidade, estado, telefone]
        );
    },


    list: () => {
        return db.any('SELECT * FROM cliente');
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
