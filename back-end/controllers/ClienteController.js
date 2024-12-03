import Cliente from "../models/Cliente.js";
import Atende from "../models/Atende.js";

export const addCliente = async (req, res) => {
    const { cnpj, nome, rua, cep, cidade, estado, telefone } = req.body;
    const cnpjEmpresa = req.user.cnpj; // Obtém o CNPJ da empresa do usuário autenticado

    if (!cnpj || !nome || !rua || !cep || !cidade || !estado || !telefone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        // Adiciona o cliente na tabela Cliente
        await Cliente.add(cnpj, nome, rua, cep, cidade, estado, telefone);

        // Associa o cliente à empresa na tabela "atende"
        await Atende.add(cnpj, cnpjEmpresa); // CNPJ da empresa e CNPJ do cliente

        return res.status(201).json({ message: "Cliente adicionado com sucesso!" });
    } catch (error) {
        console.error("Erro ao adicionar cliente: ", error);
        return res.status(500).json({ message: "Erro interno ao adicionar cliente." });
    }
};


// Controlador para listar os clientes relacionados à empresa logada
export const listClientes = async (req, res) => {
    try {
        console.log('LIST CLIENTES:', JSON.stringify(req.user, null, 2));
        const empresaCnpj = req.user.cnpj; // O CNPJ da empresa logada vindo do middleware de autenticação

        // Buscar os clientes relacionados ao CNPJ da empresa na tabela 'atende'
        const clientes = await Cliente.listByEmpresa(empresaCnpj);

        console.log("Clientes encontrados:", clientes);
        return res.status(200).json(clientes); // Retorna os clientes encontrados
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
};


export const getClienteByCNPJ = async (req, res) => {
    const { cnpj } = req.params;
    try {

        const cliente = await Cliente.listCNPJ(cnpj);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        return res.status(200).json(cliente);
    } catch (error) {
        console.error("Erro ao buscar cliente: ", error);
        return res.status(500).json({ message: "Erro interno ao buscar cliente." });
    }
};

export const updateCliente = async (req, res) => {
    const { cnpj } = req.params;
    const { nome, rua, cep, cidade, estado, telefone } = req.body;

    try {

        await Cliente.atualizar(cnpj, nome, rua, cep, cidade, estado, telefone);
        return res.status(200).json({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar cliente: ", error);
        return res.status(500).json({ message: "Erro interno ao atualizar cliente." });
    }
};

export const deleteCliente = async (req, res) => {
    const { cnpj } = req.params;
    try {

        await Cliente.delete(cnpj);
        return res.status(200).json({ message: "Cliente deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar cliente: ", error);
        return res.status(500).json({ message: "Erro interno ao deletar cliente." });
    }
};
