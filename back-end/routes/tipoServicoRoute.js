import express from 'express';
import { addTipoServico, listTipoServicos, updateTipoServico, deleteTipoServico } from '../controllers/TipoServicoController.js'
import verifyPermissions from '../middlewares/Permissions.js';
const router = express.Router();

router.post('/cadastro/tipoServico', verifyPermissions(["empresa", "gerente"]), addTipoServico);

export default router;