import { login } from '../controllers/AuthController.js';
import { addFuncionario } from '../controllers/FuncionarioController.js';
import express from 'express';
const router = express.Router();
router.post('/login', login);
router.post('/cadastro', addFuncionario);

export default router;