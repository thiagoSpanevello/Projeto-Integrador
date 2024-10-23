import bodyParser from 'body-parser';
import express from 'express';
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.listen(3001, () => console.log("Rodando porta 3001"));

// Rotas de Usuário
app.post('/cadastro/admin', (req, res) => {
    console.log("entrou na rota de cadastro de admin");
    const CNPJ = req.body.CNPJ;
    const nome = req.body.nome;
    const conta = req.body.conta;
    const senha = req.body.senha;
    res.send({ "CNPJ": CNPJ, "nome": nome, "conta": conta });

});

app.post('/cadastro/funcionarios', (req, res) => {
    console.log("entrou na rota de cadastro de funcionários");
    const nome = req.body.nome;
    const CPF = req.body.CPF;
    const conta = req.body.conta;
    const senha = req.body.senha;
    const rules = req.body.rules;
    res.send({ "CPF": CPF, "nome": nome, "conta": conta, "rules": rules });
});

app.get('/relatorio/funcionarios', (req, res) => {
    console.log("entrou na rota de listagem de funcionários");
    res.send("teste pra saber se retornou certinho");
})



