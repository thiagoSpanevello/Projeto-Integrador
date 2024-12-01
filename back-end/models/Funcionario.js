import db from '../services/db.js';
const Funcionario = {
    add: async (nome, conta, senha, cargo, cnpj, rua, cep, cidade, estado, cpf) => {
        try {
            const resultado = await db.none(
                'INSERT INTO funcionarios(nome, conta, senha, cargo, cnpj, endereco_rua, endereco_cep, endereco_cidade, endereco_estado, cpf) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                [nome, conta, senha, cargo, cnpj, rua, cep, cidade, estado, cpf]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro na criação de funcionário: " + error.mesage);

        }


    },

    list: async () => {
        try {
            const resultado = db.any('SELECT * FROM funcionarios');
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem: " + error.mesage);
        }
    },

    findById: async (id) => {
        try {
            const resultado = db.oneOrNone('SELECT * FROM funcionarios WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na busca por id: " + error.mesage);

        }
    },

    findByConta: async (conta) => {
        try {
            const resultado = db.oneOrNone('SELECT * FROM funcionarios WHERE conta = $1', [conta]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na busca por conta: " + error.mesage);
        }
    },

    update: (id, nome, conta, senha, cargo, cnpj, rua, cep, cidade, estado) => {
        return db.none(
            'UPDATE funcionarios SET nome = $1, conta = $2, senha = $3, cargo = $4, cnpj = $5, endereco_rua = $6, endereco_cep = $7, endereco_cidade = $8, endereco_estado = $9, cpf = $10 WHERE id = $10',
            [nome, conta, senha, cargo, cnpj, rua, cep, cidade, estado, cpf, id]
        );
    },

    delete: (id) => {
        return db.none('DELETE FROM funcionarios WHERE id = $1', [id]);
    }
};

export default Funcionario;


