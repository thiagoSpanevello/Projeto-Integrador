import db from '../services/db.js';

const Servico = {
    add: async (nome, descricao, preco, funcionario_id, tipo_servico_id) => {
        try {
            const resultado = await db.none(
                'INSERT INTO servicos(nome, descricao, preco, funcionario_id, tipo_servico_id) VALUES($1, $2, $3, $4, $5)',
                [nome, descricao, preco, funcionario_id, tipo_servico_id]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro ao adicionar serviço: " + error.message);
        }
    },

    list: async () => {
        try {
            const resultado = await db.any('SELECT * FROM servicos');
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem de serviços: " + error.message);
        }
    },

    findById: async (id) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM servicos WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro ao buscar serviço por ID: " + error.message);
        }
    },

    update: async (id, nome, descricao, preco, funcionario_id, tipo_servico_id) => {
        try {
            await db.none(
                'UPDATE servicos SET nome = $1, descricao = $2, preco = $3, funcionario_id = $4, tipo_servico_id = $5 WHERE id = $6',
                [nome, descricao, preco, funcionario_id, tipo_servico_id, id]
            );
        } catch (error) {
            throw new Error("Erro ao atualizar serviço: " + error.message);
        }
    },

    delete: async (id) => {
        try {
            await db.none('DELETE FROM servicos WHERE id = $1', [id]);
        } catch (error) {
            throw new Error("Erro ao excluir serviço: " + error.message);
        }
    }
};

export default Servico;
