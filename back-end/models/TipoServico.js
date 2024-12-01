import db from '../services/db.js';

const TipoServico = {
    add: async (nome, descricao) => {
        try {
            const resultado = await db.none(
                'INSERT INTO tipos_servicos(nome, descricao) VALUES($1, $2)',
                [nome, descricao]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro ao adicionar tipo de serviço: " + error.message);
        }
    },

    list: async () => {
        try {
            const resultado = await db.any('SELECT * FROM tipos_servicos');
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem de tipos de serviços: " + error.message);
        }
    },

    findById: async (id) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM tipos_servicos WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro ao buscar tipo de serviço por ID: " + error.message);
        }
    },

    update: async (id, nome, descricao) => {
        try {
            await db.none(
                'UPDATE tipos_servicos SET nome = $1, descricao = $2 WHERE id = $3',
                [nome, descricao, id]
            );
        } catch (error) {
            throw new Error("Erro ao atualizar tipo de serviço: " + error.message);
        }
    },

    delete: async (id) => {
        try {
            await db.none('DELETE FROM tipos_servicos WHERE id = $1', [id]);
        } catch (error) {
            throw new Error("Erro ao excluir tipo de serviço: " + error.message);
        }
    }
};

export default TipoServico;
