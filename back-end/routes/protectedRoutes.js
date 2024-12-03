import express from 'express';
import verifyToken from '../middlewares/AuthN.js'; // Middleware que já verifica o token

const router = express.Router();

// Endpoint de validação do token
router.get('/validate-token', verifyToken, (req, res) => {
    res.status(200).send({ message: 'Token válido', data: res.locals.funcionario });
});

// Outras rotas protegidas podem ser adicionadas aqui

export default router;
