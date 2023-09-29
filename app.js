const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { sequelize, Sequelize } = require('./config/database');
// const { usuarios } = require('./models/usuarios')(sequelize, Sequelize);
// const { livros } = require('./models/livros')(sequelize, Sequelize);
const { usuarios, livros } = require('./models')(sequelize, Sequelize);

const app = express();
const port = process.env.PORT || 3000;

// Configuração do middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'sua_chave_secreta', resave: false, saveUninitialized: false }));
app.use(flash());

// Rotas

// Rota de cadastro de usuário
app.post('/signup', [
  check('nome').notEmpty().withMessage('O campo Nome é obrigatório'),
  check('email').notEmpty().withMessage('O campo Email é obrigatório').isEmail().withMessage('Email inválido'),
  check('senha').notEmpty().withMessage('O campo Senha é obrigatório').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
], async (req, res) => {
  // Validação dos campos

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/signup');
  }

  // Criação do usuário
  const { nome, email, senha } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await usuarios.create({ nome, email, senha: hashedPassword });
    req.flash('success', 'Usuário cadastrado com sucesso');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Ocorreu um erro ao cadastrar o usuário');
    res.redirect('/signup');
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuarios = await usuarios.findOne({ where: { email } });

    if (!usuarios) {
      req.flash('error', 'Usuário não encontrado');
      return res.redirect('/login');
    }

    const isPasswordValid = await bcrypt.compare(senha, usuarios.senha);

    if (!isPasswordValid) {
      req.flash('error', 'Senha incorreta');
      return res.redirect('/login');
    }

    req.session.usuarios = usuarios;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Ocorreu um erro ao fazer login');
    res.redirect('/login');
  }
});

// Rota de logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à Biblioteca');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
