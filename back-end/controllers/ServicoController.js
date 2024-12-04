import Servico from "../models/servico.js";

export const addServico = async (req, res) => {
    const { dataRealizacao, descricao, clienteCNPJ, tipoServicoNome, dataCadastro, valor } = req.body;

    if (!dataRealizacao || !descricao || !clienteCNPJ || !tipoServicoNome || !tipoServicoId) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        await Servico.add(dataRealizacao, descricao, clienteCNPJ, tipoServicoNome);
        return res.status(201).json({ message: "Serviço adicionado com sucesso!" });
    } catch (error) {
        console.error("Erro ao adicionar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao adicionar serviço." });
    }
};

export const listServicos = async (req, res) => {
    try {
        const servicos = await Servico.list();
        return res.status(200).json(servicos);
    } catch (error) {
        console.error("Erro ao listar serviços: ", error);
        return res.status(500).json({ message: "Erro interno ao listar serviços." });
    }
};

export const getServicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const servico = await Servico.findById(id);

        if (!servico) {
            return res.status(404).json({ message: "Serviço não encontrado." });
        }

        return res.status(200).json(servico);
    } catch (error) {
        console.error("Erro ao buscar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao buscar serviço." });
    }
};

export const updateServico = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, prestadorId, tipoServicoId } = req.body;

    try {
        await Servico.update(id, nome, descricao, preco, prestadorId, tipoServicoId);
        return res.status(200).json({ message: "Serviço atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao atualizar serviço." });
    }
};

export const deleteServico = async (req, res) => {
    const { id } = req.params;
    try {
        await Servico.delete(id);
        return res.status(200).json({ message: "Serviço deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao deletar serviço." });
    }
};
