const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('C:/Users/julia/Documents/GitHub/pmnf_smcti/interns.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Configuração do diretório estático
app.use(express.static(path.join(__dirname, '')));


// Rotas para as páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/painel_suporte.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'painel_suporte.html'));
});

app.get('/grafico.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'graficos.html'));
});

app.get('/visao_geral.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'visao_geral.html'));
});

app.get('/cadastro_candidato.html', (req, res) => {
    res.sendFile(path.join(__dirname,'cadastro_candidato.html'));
});

app.get('/cadastro_candidato.html', (req, res) => {
    res.sendFile(path.join(__dirname,'login.html'));
});





// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
