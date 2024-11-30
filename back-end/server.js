import bodyParser from 'body-parser';
import express from 'express';
import Cliente from './models/cliente.js';
// import cors from 'cors';
const app = express();
// app.use(express.json());
// app.use(cors())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
app.listen(3001, () => console.log("Rodando porta 3001"));

Cliente.add(
    '12.345.678/9999-90',
    'teste 2',
    'Rua teste',
    '12345-678',
    'Cidade Exemplo',
    'Estado Exemplo',
    '(11) 1234-5678'
)
    .then(() => {
        console.log('Cliente adicionado com sucesso!');

        return Cliente.list();
    })
    .then(clientes => {
        console.log('Clientes cadastrados:');
        console.log(clientes);
    })
    .catch(err => {
        console.log('Erro ao adicionar cliente: ', err);
    });


// // Rotas de Usuário
// app.post('/cadastro/admin', (req, res) => {
//     const CNPJ = req.body.CNPJ;
//     const nome = req.body.nome;
//     const conta = req.body.conta;
//     res.send({ "CNPJ": CNPJ, "nome": nome, "conta": conta });
// });

// app.post('/cadastro/funcionarios', (req, res) => {
//     const nome = req.body.nome;
//     const CPF = req.body.CPF;
//     const conta = req.body.conta;
//     const rules = req.body.rules;
//     res.send({ "CPF": CPF, "nome": nome, "conta": conta, "rules": rules });
// });

// app.get('/relatorio/funcionarios', (req, res) => {
//     res.send("entrou na rota de listagem de funcionários");
// })


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
//     res.send("Redirecionado diretamente para o relatório de pagamentos");
// })
