import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const verifyToken = (req, res, next) => {
    // Obtém o token do cabeçalho Authorization
    let token = req.get('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Token inválido ou ausente' });
    }

    // Remove o prefixo 'Bearer ' do token
    token = token.replace('Bearer ', '');

    // Verifica o token usando a chave secreta do .env
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token inválido', error: err.message });
        }

        // Armazena os dados do usuário autenticado no `res.locals`
        res.locals.funcionario = decoded.funcionario;

        // Continua para a próxima etapa
        next();
    });
};

export default verifyToken;
