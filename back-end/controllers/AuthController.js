import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Funcionario from '../models/Funcionario.js'

export const login = async (req, res) => {
    const { conta, senha } = req.body;
    console.log(conta, senha);

    if (!conta || !senha) return res.status(401).send({ message: 'Informe email/senha' });

    try {
        const funcionario = await Funcionario.findByConta(conta);
        if (!funcionario) return res.status(401).send({ message: 'Usuário ou Senha inválidos!' });
        const senhaValida = bcrypt.compare(senha, funcionario.senha);
        if (!senhaValida) return res.status(401).send({ message: 'Usuário ou Senha inválidos!' });

        const token = jwt.sign(
            {
                funcionario: {
                    id: funcionario.id,
                    cargo: funcionario.cargo,
                },
            },
            process.env.SECRET_JWT, { expiresIn: '1d' }
        );

        res.status(200).send(
            {
                funcionario: {
                    id: funcionario.id,
                    nome: funcionario.nome,
                    conta: funcionario.conta,
                    cargo: funcionario.cargo,
                },
                token,
            }
        );
        console.log(conta, token);

    } catch (error) {
        console.error("Erro ao realizar login do funcionário: ", error);
        return res.status(500).send({ message: 'Erro interno ao realizar login.' });
    }

}