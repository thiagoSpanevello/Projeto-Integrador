import db from '../services/db.js';

const Pagamento = {
    add: async (valor, datacadastro, servicoid) => {
        try {

            const resultado = await db.none(
                'INSERT INTO pagamentos(valor, datacadastro, servicoid) VALUES($1, $2, $3)',
                [valor, datacadastro, servicoid]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro ao registrar pagamento: " + error.message);
        }
    },

    list: async () => {
        try {
            const resultado = await db.any('SELECT * FROM pagamentos');
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem de pagamentos: " + error.message);
        }
    },

    findById: async (id) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM pagamentos WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro ao buscar pagamento por ID: " + error.message);
        }
    },

    update: async (id, valor, data_pagamento, servico_id, funcionario_id, cliente_id) => {
        try {
            await db.none(
                'UPDATE pagamentos SET valor = $1, data_pagamento = $2, servico_id = $3, funcionario_id = $4, cliente_id = $5 WHERE id = $6',
                [valor, data_pagamento, servico_id, funcionario_id, cliente_id, id]
            );
        } catch (error) {
            throw new Error("Erro ao atualizar pagamento: " + error.message);
        }
    },

    delete: async (id) => {
        try {
            await db.none('DELETE FROM pagamentos WHERE id = $1', [id]);
        } catch (error) {
            throw new Error("Erro ao excluir pagamento: " + error.message);
        }
    }
};

export default Pagamento;
