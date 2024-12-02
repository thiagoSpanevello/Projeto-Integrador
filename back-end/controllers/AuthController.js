import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Funcionario from '../models/Funcionario.js';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { conta, senha } = req.body;
    console.log(conta, senha);
    console.log(process.env.SECRET_JWT);
    if (!conta || !senha) return res.status(401).send({ message: 'Informe email/senha' });

    try {
        const funcionario = await Funcionario.findByConta(conta);
        if (!funcionario) return res.status(401).send({ message: 'Usuário ou Senha inválidos!' });

        // Verifica se a senha fornecida é válida
        const senhaValida = await bcrypt.compare(senha, funcionario.senha);
        if (!senhaValida) return res.status(401).send({ message: 'Usuário ou Senha inválidos!' });

        // Gera o token JWT com a chave secreta do .env
        const token = jwt.sign(
            {
                funcionario: {
                    id: funcionario.id,
                    cargo: funcionario.cargo,
                },
            },
            process.env.SECRET_JWT, { expiresIn: '1d' }
        );

        res.status(200).send({
            funcionario: {
                id: funcionario.id,
                nome: funcionario.nome,
                conta: funcionario.conta,
                cargo: funcionario.cargo,
            },
            token,
        });

        console.log(conta, token);
    } catch (error) {
        console.error("Erro ao realizar login do funcionário: ", error);
        return res.status(500).send({ message: 'Erro interno ao realizar login.' });
    }
};
