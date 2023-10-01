const { sequelize, Sequelize } = require("../config/database");
const livros = require("../models/livro")(sequelize, Sequelize);
const UsuarioLivro = require("../models/usuarioLivro")(sequelize, Sequelize);
const usuario = require("../models/usuario")(sequelize, Sequelize);
const { Op } = require("sequelize");

exports.home = (req, res) => {
  const userId = req.session.userId;
  if (userId == 1) {
    res.render("home", { layout: false });
  } else {
    res.render("homeUser", { layout: false });
  }
};

exports.busca = (req, res) => {
  res.render("busca", { layout: false });
};

exports.exibirLivros = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).send("Usuário não autenticado");
    }

    const usuarioId = req.session.userId;
    let username = await usuario.findOne({
      where: {
        id: usuarioId,
      },
    });

    let livrosDoUsuario = await UsuarioLivro.findAll({
      where: {
        usuarioId: usuarioId,
      },
    });

    const nomesDosLivros = [];

    for (const livroDoUsuario of livrosDoUsuario) {
      const livrox = await livros.findOne({
        where: {
          id: livroDoUsuario.livroId,
        },
      });

      if (livrox) {
        nomesDosLivros.push({
          titulo: livrox.titulo,
          autores: livrox.autores,
          ano: livrox.ano,
          editora: livrox.editora,
        });
      }
    }

    return res.render("homeUser", { livro: nomesDosLivros, usern: username });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar os livros");
  }
};

exports.alugarLivro = async (req, res) => {
  const livroId = req.params.id;
  const usuarioId = req.session.userId;
  let username = await usuario.findOne({
    where: {
      id: usuarioId,
    },
  });
  let livrosDoUsuario = await UsuarioLivro.findAll({
    where: {
      usuarioId: usuarioId,
    },
  });

  const nomesDosLivros = [];

  for (const livroDoUsuario of livrosDoUsuario) {
    const livrox = await livros.findOne({
      where: {
        id: livroDoUsuario.livroId,
      },
    });

    if (livrox) {
      nomesDosLivros.push({
        titulo: livrox.titulo,
        autores: livrox.autores,
        ano: livrox.ano,
        editora: livrox.editora,
      });
    }
  }
  const mensagem = encodeURIComponent("livroAlugado");
  const erro = encodeURIComponent("erro");

  try {
    const livro = await livros.findByPk(livroId);

    if (!livro) {
      return res.status(404).send("Livro não encontrado");
    }

    if (livro.disponivel > 0) {
      const usuarioLivro = await UsuarioLivro.findOne({
        where: {
          usuarioId: usuarioId,
          livroId: livroId,
        },
      });

      if (usuarioLivro) {
        livro.disponivel -= 1;
        await livro.save();

        usuarioLivro.quantidade += 1;
        await usuarioLivro.save();
      } else {
        livro.disponivel -= 1;
        await livro.save();

        await UsuarioLivro.create({
          usuarioId: usuarioId,
          livroId: livroId,
          quantidade: 1,
        });
      }

      return res.redirect("/login");
    } else {

      return res.render("homeUser", { livro: nomesDosLivros, erro: erro, usern: username });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao alugar o livro");
  }
};

exports.buscar = async (req, res) => {
  try {
    const titulo = req.body.titulo.toLowerCase();
    const buscaLivros = await livros.findAll({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("titulo")),
        "LIKE",
        `%${titulo}%`
      ),
    });
    res.render("busca", { buscaLivros: buscaLivros });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar por título");
  }
};

exports.ordem = async (req, res) => {
  try {
    const ordemAno = await livros.findAll({
      order: [["ano", "ASC"]],
    });
    res.render("busca", { ordemAno: ordemAno });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar por ano");
  }
};
