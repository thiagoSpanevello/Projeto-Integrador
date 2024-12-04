import express from 'express';
import { addCliente, listClientes, getClienteByCNPJ, updateCliente, deleteCliente } from '../controllers/ClienteController.js';
import authN from '../middlewares/AuthN.js'; // Autenticação
import verifyPermissions from '../middlewares/Permissions.js'; // Verificação de permissões

const router = express.Router();

// Cadastro de cliente - Apenas Admin pode cadastrar
router.post('/cadastro/clientes', verifyPermissions(["empresa", "gerente"]), addCliente);

// Listagem de clientes - Retorna os clientes da empresa logada
router.get('/relatorio/clientes', listClientes);

// Buscar cliente por CNPJ
router.get('/clientes/:cnpj', getClienteByCNPJ);

// Atualizar cliente - Apenas Admin ou o próprio cliente pode atualizar
router.put('/clientes/:cnpj', verifyPermissions(["empresa", "gerente"]), updateCliente);

// Deletar cliente - Apenas Admin pode deletar
router.delete('/clientes/:cnpj', verifyPermissions(["empresa", "gerente"]), deleteCliente);

export default router;
