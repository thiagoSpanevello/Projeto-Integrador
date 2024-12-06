import Cliente from "../models/Cliente.js";
import Empresa from "../models/Empresa.js";
import Servico from "../models/servico.js";
import Funcionario from "../models/Funcionario.js";
import TipoServico from "../models/TipoServico.js";

export const addServico = async (req, res) => {
    const { dataRealizacao, descricao, clienteCNPJ, tipoServicoId, dataCadastro, valor } = req.body;

    if (!dataRealizacao || !descricao || !clienteCNPJ || !tipoServicoId) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        await Servico.add(dataRealizacao, descricao, clienteCNPJ, tipoServicoId, dataCadastro, valor);
        return res.status(201).json({ message: "Serviço adicionado com sucesso!" });
    } catch (error) {
        console.error("Erro ao adicionar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao adicionar serviço." });
    }
};

export const listServicos = async (req, res) => {

    try {
        const conta = req.user.conta;
        let user = await Empresa.findByConta(conta);
        let cnpjEmpresa;
        if (user) {
            cnpjEmpresa = user.cnpj
        } else {
            user = await Funcionario.findByConta(conta);
            cnpjEmpresa = user.empresacnpj;
        }
        const clientes = await Cliente.listByEmpresa(cnpjEmpresa);
        const clientesCNPJ = clientes.map((cliente) => cliente.cnpj)
        const servicos = await Servico.listByCliente(clientesCNPJ);
        const tipoServicos = await TipoServico.list();
        const servicosComTipo = servicos.map(servico => {
            const tipo = tipoServicos.find(t => t.id === servico.tiposervicoid);
            const formatedDate = new Intl.DateTimeFormat('pt-BR').format(new Date(servico.datarealizacao))
            return {
                ...servico,
                tipo_nome: tipo.nome,
                datarealizacao: formatedDate
            }
        })
        return res.status(200).json(servicosComTipo);
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
