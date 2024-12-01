import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        let token = req.get('Authorization');


        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).send({ message: 'Token inválido ou ausente.' });
        }


        token = token.replace('Bearer ', '');


        jwt.verify(token, process.env.SECRET_JWT, (err, authData) => {
            if (err) {
                return res.status(401).send({ message: 'Falha na autenticação do token.', error: err.message });
            }

            res.locals.funcionario = authData.funcionario;


            next();
        });
    } catch (error) {
        console.error("Erro na verificação do token: ", error);
        return res.status(500).send({ message: 'Erro interno ao verificar o token.' });
    }
};

export default verifyToken;
