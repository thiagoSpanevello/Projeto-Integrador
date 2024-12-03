import express from 'express';
import verifyPermissions from '../middlewares/Permissions.js';
import {
    addFuncionario,
    listFuncionarios,
    getFuncionarioByCpf,
    updateFuncionario,
    deleteFuncionario
} from '../controllers/FuncionarioController.js';

const router = express.Router();

// Cadastro de funcionário
router.post('/cadastro/funcionarios', verifyPermissions(["empresa", "gerente"]), addFuncionario);

// Relatório/Listagem de funcionários
router.get('/relatorio/funcionarios', verifyPermissions(["empresa", "gerente"]), listFuncionarios);

// Buscar funcionário pelo CPF
router.get('/funcionarios/:cpf', getFuncionarioByCpf);

// Atualizar funcionário
router.put('/funcionarios/:cpf', updateFuncionario);

// Deletar funcionário
router.delete('/funcionarios/:cpf', deleteFuncionario);

export default router;
