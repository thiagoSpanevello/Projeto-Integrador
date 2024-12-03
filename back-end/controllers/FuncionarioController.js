import Funcionario from "../models/Funcionario.js";
import bcrypt from 'bcrypt'

export const addFuncionario = async (req, res) => {
    try {
        console.log(req.body);
        const { cpf, nome, conta, senha, cargo, empresacnpj } = req.body;

        if (!cpf || !nome || !conta || !senha || !cargo || !empresacnpj) {
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
        }
        const hashSenha = await bcrypt.hash(senha, 10);

        await Funcionario.add(cpf, nome, conta, senha, cargo, empresacnpj);

        return res.status(201).json({ message: "Funcionário adicionado com sucesso!" });

    } catch (error) {
        console.error("Erro ao adicionar funcionário: ", error);
        return res.status(500).json({ message: "Erro interno no servidor, tente novamente mais tarde." });
    }
};

export const listFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.list();
        return res.status(200).json(funcionarios);
    } catch (error) {
        console.error("Erro ao listar funcionários: ", error);
        return res.status(500).json({ message: "Erro interno ao listar funcionários." });
    }
};

export const getFuncionarioByCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const funcionario = await Funcionario.findById(cpf);

        if (!funcionario) {
            return res.status(404).json({ message: "Funcionário não encontrado." });
        }

        return res.status(200).json(funcionario);
    } catch (error) {
        console.error("Erro ao buscar funcionário: ", error);
        return res.status(500).json({ message: "Erro interno ao buscar funcionário." });
    }
};

export const getFuncionarioByConta = async (req, res) => {
    const { conta } = req.params;
    try {
        const funcionario = await Funcionario.findByConta(conta);

        if (!funcionario) {
            return res.status(404).json({ message: "Funcionário não encontrado." });
        }

        return res.status(200).json(funcionario);
    } catch (error) {
        console.error("Erro ao buscar funcionário: ", error);
        return res.status(500).json({ message: "Erro interno ao buscar funcionário." });
    }
};


export const updateFuncionario = async (req, res) => {
    const { id } = req.params;
    const { nome, conta, senha, cargo, cnpj, rua, cep, cidade, estado, cpf } = req.body;

    try {

        let hashSenha = senha;
        if (senha) {
            hashSenha = await bcrypt.hash(senha, 10);
        }

        await Funcionario.update(id, nome, conta, hashSenha, cargo, cnpj, rua, cep, cidade, estado, cpf);

        return res.status(200).json({ message: "Funcionário atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar funcionário: ", error);
        return res.status(500).json({ message: "Erro interno ao atualizar funcionário." });
    }
};


export const deleteFuncionario = async (req, res) => {
    const { id } = req.params;
    try {
        await Funcionario.delete(id);
        return res.status(200).json({ message: "Funcionário deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar funcionário: ", error);
        return res.status(500).json({ message: "Erro interno ao deletar funcionário." });
    }
};
