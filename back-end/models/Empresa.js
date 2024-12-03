import db from '../services/db.js'

const Empresa = {
    // Adicionar nova empresa
    add: async (cnpj, nome, conta, senha, cargo = 'empresa') => {
        console.log(cnpj, nome, conta, senha, cargo);
        try {
            const resultado = await db.none(
                'INSERT INTO empresa (cnpj, nomeempresa, conta, senha, cargo) VALUES ($1, $2, $3, $4, $5)',
                [cnpj, nome, conta, senha, cargo]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro na criação da empresa: " + error.message);
        }
    },

    // Listar todas as empresa
    list: async () => {
        try {
            const resultado = await db.any('SELECT * FROM empresa');
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem de empresa: " + error.message);
        }
    },

    // Buscar empresa pelo CNPJ
    findByCnpj: async (cnpj) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM empresa WHERE cnpj = $1', [cnpj]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na busca por CNPJ: " + error.message);
        }
    },

    // Buscar empresa pela conta
    findByConta: async (conta) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM empresa WHERE conta = $1', [conta]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na busca por conta: " + error.message);
        }
    },

    // Atualizar dados da empresa
    update: async (cnpj, nome, conta, senha) => {
        try {
            const resultado = await db.none(
                'UPDATE empresa SET nome = $1, conta = $2, senha = $3 WHERE cnpj = $4',
                [nome, conta, senha, cnpj]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro na atualização da empresa: " + error.message);
        }
    },

    // Deletar empresa
    delete: async (cnpj) => {
        try {
            const resultado = await db.none('DELETE FROM empresa WHERE cnpj = $1', [cnpj]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na exclusão da empresa: " + error.message);
        }
    },
};

export default Empresa;
