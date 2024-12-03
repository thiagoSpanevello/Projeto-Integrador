import Cliente from "../models/Cliente";

export const addCliente = async (req, res) => {
    const { cnpj, nome, rua, cep, cidade, estado, telefone } = req.body;


    if (!cnpj || !nome || !rua || !cep || !cidade || !estado || !telefone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {

        await Cliente.add(cnpj, nome, rua, cep, cidade, estado, telefone);
        return res.status(201).json({ message: "Cliente adicionado com sucesso!" });
    } catch (error) {
        console.error("Erro ao adicionar cliente: ", error);
        return res.status(500).json({ message: "Erro interno ao adicionar cliente." });
    }
};

export const listClientes = async (req, res) => {
    try {

        const clientes = await Cliente.list();
        return res.status(200).json(clientes);
    } catch (error) {
        console.error("Erro ao listar clientes: ", error);
        return res.status(500).json({ message: "Erro interno ao listar clientes." });
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
