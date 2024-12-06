import db from '../services/db.js';
import Pagamento from './Pagamento.js';

const Servico = {
    add: async (datarealizacao, descricao, clientecnpj, tiposervicoid, datacadastro, valor) => {
        try {
            const resultado = await db.one(
                'INSERT INTO servico(datarealizacao, descricao, clientecnpj, tiposervicoid) VALUES($1, $2, $3, $4) returning id',
                [datarealizacao, descricao, clientecnpj, tiposervicoid]
            );
            console.log(resultado);
            if (datacadastro || valor) {
                Pagamento.add(datacadastro, valor, resultado.id);
            }
            return resultado;
        } catch (error) {
            throw new Error("Erro ao adicionar serviço: " + error.message);
        }
    },

    listByCliente: async (clientecnpj) => {
        try {
            const resultado = await db.any(`SELECT * FROM servico WHERE clientecnpj = ANY($1::text[])`,
                [clientecnpj]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem de serviços: " + error.message);
        }
    },

    listByEmpresa: async (empresacnpj) => {
        try {
            const resultado = await db.any(
                `SELECT s.datarealizacao, 
                        s.descricao, 
                        s.clientecnpj,
                        c.nomeempresa,
                        ts.nome AS tipo_nome 
                    FROM 
                        servico s
                    JOIN 
                        cliente c ON s.clientecnpj = c.cnpj
                    JOIN
                        atende a ON a.clientecnpj = c.cnpj
                    JOIN 
                        tiposervico ts ON s.tiposervicoid = ts.id
                    WHERE 
                        a.empresacnpj = $1 `,
                [empresacnpj]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro ao buscar serviço por empresa: " + error.message);
        }
    },

    findById: async (id) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM servico WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem de serviços: " + error.message);
        }
    },

    update: async (id, datarealizacao, descricao, preco, funcionario_id, tipo_servico_id) => {
        try {
            await db.none(
                'UPDATE servico SET nome = $1, descricao = $2, preco = $3, funcionario_id = $4, tipo_servico_id = $5 WHERE id = $6',
                [nome, descricao, preco, funcionario_id, tipo_servico_id, id]
            );
        } catch (error) {
            throw new Error("Erro ao atualizar serviço: " + error.message);
        }
    },

    delete: async (id) => {
        try {
            await db.none('DELETE FROM servico WHERE id = $1', [id]);
        } catch (error) {
            throw new Error("Erro ao excluir serviço: " + error.message);
        }
    }
};

export default Servico;
