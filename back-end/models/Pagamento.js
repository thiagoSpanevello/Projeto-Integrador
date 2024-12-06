import db from '../services/db.js';

const Pagamento = {
    add: async (datacadastro, valor, servicoid) => {
        try {

            const resultado = await db.none(
                'INSERT INTO pagamento(valor, datacadastro, servicoid) VALUES($1, $2, $3)',
                [valor, datacadastro, servicoid]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro ao registrar pagamento: " + error.message);
        }
    },

    listPagamentoByEmpresa: async (empresaCnpj) => {
        try {
            const result = await db.any(
                `SELECT p.datacadastro,
                 p.valor,
                 p.datafechado,
                 s.descricao,
                 a.clientecnpj
                 FROM pagamento p
                 INNER JOIN servico s ON s.id = p.servicoid
                 INNER JOIN atende a ON a.clientecnpj = s.clientecnpj
                 WHERE a.empresacnpj = $1`,
                [empresaCnpj]
            );
            return result;
        } catch (error) {
            throw new Error("Erro ao listar pagamentos por empresa: " + error.message);
        }
    },

    listPagamentoByEmpresaAndDataFechadoNull: async (empresaCnpj) => {
        try {
            const result = await db.any(
                `SELECT p.*
                 FROM pagamento p
                 INNER JOIN servico s ON s.id = p.servicoid
                 INNER JOIN atende a ON a.clientecnpj = s.clientecnpj
                 WHERE a.empresacnpj = $1
                 AND p.datafechado IS NULL`,
                [empresaCnpj]
            );
            return result;
        } catch (error) {
            throw new Error("Erro ao listar pagamentos por empresa e com datafechado null: " + error.message);
        }
    },

    findById: async (id) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM pagamento WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro ao buscar pagamento por ID: " + error.message);
        }
    },

    update: async (id, valor, data_pagamento, servico_id, funcionario_id, cliente_id) => {
        try {
            await db.none(
                'UPDATE pagamento SET valor = $1, data_pagamento = $2, servico_id = $3, funcionario_id = $4, cliente_id = $5 WHERE id = $6',
                [valor, data_pagamento, servico_id, funcionario_id, cliente_id, id]
            );
        } catch (error) {
            throw new Error("Erro ao atualizar pagamento: " + error.message);
        }
    },

    delete: async (id) => {
        try {
            await db.none('DELETE FROM pagamento WHERE id = $1', [id]);
        } catch (error) {
            throw new Error("Erro ao excluir pagamento: " + error.message);
        }
    }
};

export default Pagamento;
