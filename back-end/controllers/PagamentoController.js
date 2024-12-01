import Pagamento from "../models/pagamento";

export const addPagamento = async (req, res) => {
    const { valor, dataPagamento, servicoId, funcionarioId, clienteId } = req.body;

    if (!valor || !dataPagamento || !servicoId || !funcionarioId || !clienteId) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        await Pagamento.add(valor, dataPagamento, servicoId, funcionarioId, clienteId);
        return res.status(201).json({ message: "Pagamento registrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao registrar pagamento: ", error);
        return res.status(500).json({ message: "Erro interno ao registrar pagamento." });
    }
};

export const listPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.list();
        return res.status(200).json(pagamentos);
    } catch (error) {
        console.error("Erro ao listar pagamentos: ", error);
        return res.status(500).json({ message: "Erro interno ao listar pagamentos." });
    }
};

export const getPagamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pagamento = await Pagamento.findById(id);

        if (!pagamento) {
            return res.status(404).json({ message: "Pagamento não encontrado." });
        }

        return res.status(200).json(pagamento);
    } catch (error) {
        console.error("Erro ao buscar pagamento: ", error);
        return res.status(500).json({ message: "Erro interno ao buscar pagamento." });
    }
};

export const updatePagamento = async (req, res) => {
    const { id } = req.params;
    const { valor, dataPagamento, servicoId, funcionarioId, clienteId } = req.body;

    try {
        await Pagamento.update(id, valor, dataPagamento, servicoId, funcionarioId, clienteId);
        return res.status(200).json({ message: "Pagamento atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar pagamento: ", error);
        return res.status(500).json({ message: "Erro interno ao atualizar pagamento." });
    }
};

export const deletePagamento = async (req, res) => {
    const { id } = req.params;
    try {
        await Pagamento.delete(id);
        return res.status(200).json({ message: "Pagamento deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar pagamento: ", error);
        return res.status(500).json({ message: "Erro interno ao deletar pagamento." });
    }
};
