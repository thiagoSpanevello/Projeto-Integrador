import bodyParser from 'body-parser';
import express from 'express';
import authRoutes from './routes/authRoutes.js'
import ProtectedRoute from './routes/protectedRoutes.js';
import authN from './middlewares/AuthN.js'
import FuncionarioRoutes from './routes/funcionarioRoutes.js'
import tipoServicoRoutes from './routes/tipoServicoRoute.js'
import ClienteRoutes from './routes/clienteRoutes.js'


import cors from 'cors';
const app = express();
app.use(express.json());
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(authN)
app.use('/protected', ProtectedRoute);
app.use(FuncionarioRoutes);
app.use(ClienteRoutes);
app.use(tipoServicoRoutes);


// //Rotas de Tipos de Serviços

// app.post('/cadastro/tiposervicos', (req, res) => {
//     const nome = req.body.nome;
//     const descricao = req.body.descricao;
//     res.send({ "Descrição": descricao, "nome": nome, });
// });

// app.get('/relatorio/tiposervico', (req, res) => {
//     res.send("entrou na rota de listagem de tipos de serviços");
// })


// //Rotas de Serviços

// app.post('/cadastro/servicos', (req, res) => {
//     const nome = req.body.nome;
//     const CNPJ = req.body.CNPJ;
//     const data = new Date();
//     console.log(data);
//     res.send({ "Nome": nome, "CNPJ": CNPJ, "Data": data });
// });

// app.get('/relatorio/servico', (req, res) => {
//     res.send("entrou na rota de listagem de serviços");
// })


// //Rotas de Pagamentos

// app.post('/cadastro/pagamentos', (req, res) => {
//     const valor = req.body.valor;
//     const data = new Date();
//     console.log(data);
//     res.send({ "Valor": valor, "Data": data });
// });

// app.get('/relatorio/pagamentos', (req, res) => {
//     res.send("Relatório dos pagamentos cadastrados que ainda nao foram encerrados");
// })


// //Rotas de Dashboards

// app.get('/relatorio/dashboard', (req, res) => {
//     res.send(" Valor liquido mensal geral de 6 meses da empresa");
// })

// app.get('/relatorio/RedirecionaFuncionario', (req, res) => {
// res.send("Redirecionado diretamente para o relatório de pagamentos");
// })

app.listen(3001, () => console.log("Rodando porta 3001"));