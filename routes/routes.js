const express = require('express');
const router = express.Router();

const myController = require("../controllers/mycontroller");
const login = require("../controllers/login");
const cadastro = require("../controllers/cadastro");
const admin = require("../controllers/admin");

router.get("/busca", myController.busca);

router.get("/", login.home);
router.get("/cadastro", cadastro.home);
router.get("/login", myController.exibirLivros);

router.get("/adicionarLivro", admin.adicionar);
router.get("/painel", admin.painel);

router.post("/login", login.login);
router.post("/cadastro", cadastro.cadastro);

router.post("/ordem", myController.ordem);
router.post("/buscar", myController.buscar);

router.post("/adicionarLivro", admin.adicionarLivro);
router.post('/alugarLivro/:id', myController.alugarLivro);

router.get('/editarLivro/:id', admin.editarLivro);
router.post('/editarLivro', admin.editar);

router.get('/excluirUsuario/:id', admin.excluirUsuario);
router.get('/excluirLivro/:id', admin.excluirLivro);


module.exports = router;