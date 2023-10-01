const { sequelize, Sequelize } = require("../config/database");
const livros = require("../models/livro")(sequelize, Sequelize);
const usuario = require("../models/usuario")(sequelize, Sequelize);
const { Op } = require('sequelize');

exports.home = (req, res) => {
  res.render("painel", { layout: false });
};

exports.adicionar = (req, res) => {
  res.render("adicionarLivro", { layout: false });
};

exports.painel = async (req, res) => {
  try {
    const usuarios = await usuario.findAll({
      where: {
        nome: {
          [Op.ne]: 'admin'
        }
      }
    });
    const livro = await livros.findAll();

    res.render("painel", { layout: false, usuarios, livro });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

exports.adicionarLivro = async (req, res) => {
  try {
    const { titulo, autores, ano, editora, disponivel } = req.body;
    await livros.create({
      titulo,
      autores,
      ano,
      editora,
      disponivel
    });

    res.render("adicionarLivro");
  } catch (error) {
    console.error(error);
    res.status(500);
  }

};

exports.editarLivro = async (req, res) => {
  try {
    const livroId = req.params.id;
    const livro = await livros.findOne({
      where: {
        id: livroId,
      },
    });
    res.render("editarLivro", { livro: livro });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

exports.editar = async (req, res) => {
  try {
    const { livroId, titulo, autores, ano, editora, disponivel } = req.body;

    const livroExistente = await livros.findOne({
      where: {
        id: livroId,
      },
    });

    livroExistente.titulo = titulo;
    livroExistente.autores = autores;
    livroExistente.ano = ano;
    livroExistente.editora = editora;
    livroExistente.disponivel = disponivel;

    await livroExistente.save();

    return res.redirect('/painel');
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

exports.excluirLivro = async (req, res) => {
  try {
    const id = req.params.id;
    await livros.destroy({
      where: {
        id: id
      }
    });
    return res.redirect('/painel');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.excluirUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    await usuario.destroy({
      where: {
        id: id
      }
    });
    return res.redirect('/painel');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};