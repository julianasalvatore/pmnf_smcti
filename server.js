const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./interns.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação da tabela de usuários (caso não exista)
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    dataNascimento TEXT,
    telefone TEXT,
    email TEXT UNIQUE,
    password TEXT,
    instituicao TEXT,
    curso TEXT,
    periodo TEXT,
    local1 TEXT,
    local2 TEXT,
    local3 TEXT
)`);

const secretKey = 'your_jwt_secret';

// Configuração do diretório estático
app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.json());

// Rotas para as páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/painel_suporte.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'painel_suporte.html'));
});

app.get('/grafico.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'grafico.html'));
});

app.get('/visao_geral.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'visao_geral.html'));
});

app.get('/cadastro_candidato.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastro_candidato.html'));
});

app.get('/perfil_candidato.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'perfil_candidato.html'));
});

app.get('/setupData.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'setupData.js'));
});

// Endpoint de registro
app.post('/api/register', async (req, res) => {
    const {
        nome,
        dataNascimento,
        telefone,
        email,
        senha,
        instituicao,
        curso,
        periodo,
        local1,
        local2,
        local3
    } = req.body;

    try {
        // Verifica se o e-mail já está registrado
        db.get('SELECT email FROM users WHERE email = ?', [email], async (err, row) => {
            if (row) {
                return res.status(400).json({ success: false, message: 'E-mail já registrado.' });
            } else {
                // Hash da senha
                const hashedPassword = await bcrypt.hash(senha, 10);

                // Insere o novo estagiário no banco de dados
                db.run(
                    `INSERT INTO users (nome, dataNascimento, telefone, email, password, instituicao, curso, periodo, local1, local2, local3) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [nome, dataNascimento, telefone, email, hashedPassword, instituicao, curso, periodo, local1, local2, local3],
                    function (err) {
                        if (err) {
                            return res.status(500).json({ success: false, message: 'Erro ao salvar o usuário.' });
                        }
                        res.json({ success: true, message: 'Usuário cadastrado com sucesso!' });
                    }
                );
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

// Endpoint de login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email }, secretKey);
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    });
});

// Endpoint para obter dados do perfil
app.get('/api/profile', (req, res) => {
    // Exemplo de dados simulados para o perfil do usuário
    const profileData = {
        name: "João da Silva",
        id: "2021001234",
        course: "Engenharia de Software",
        status: "Em análise",
        statusPercentage: 40,
        queuePosition: 3,
        documents: [
            { name: "Termo de Compromisso", status: "Pendente" },
            { name: "Plano de Atividades", status: "Aprovado" },
            { name: "Relatório Final", status: "Não iniciado" }
        ]
    };
    res.json(profileData);
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
