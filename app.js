const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 5007;

// Middleware para processar dados de formulários
app.use(bodyParser.urlencoded({ extended: false }));

// Configura a conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // Substitua 'password' pela sua senha real
    database: 'bibliotecaBabel',
});

// Conecta ao banco de dados
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Rota para servir o arquivo index.html

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Atualize o caminho conforme a localização real
});


// Rota para cadastrar livros

app.post('/submit', (req, res) => {
    const { title, author, anoPub, desc } = req.body;

    console.log('Dados recebidos:', { title, author, anoPub, desc }); // Adicione para depuração

    const query = 'INSERT INTO livrosCadastro (titulo, autor, ano, sinopse) VALUES (?, ?, ?, ?)';
    db.query(query, [title, author, anoPub, desc], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar livro:', err);
            return res.status(500).send('Erro ao cadastrar livro.');
        }
        res.send('Dados inseridos com sucesso!');
    });
});


// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
