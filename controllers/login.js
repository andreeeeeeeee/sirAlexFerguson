const { sequelize, Sequelize } = require("../config/database");
const usuario = require("../models/usuario")(sequelize, Sequelize);
const livros = require("../models/livro")(sequelize, Sequelize);
const usuarioLivro = require("../models/usuarioLivro")(sequelize, Sequelize);

const bcrypt = require("bcrypt");

exports.home = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await usuario.findOne({ where: { email } });

    req.session.userId = user.id;

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.render("login", { errorMessage: "Credenciais inválidas." });
    }

    if (user.nome == "admin") {
      res.redirect("/painel");
    } else {
      const usuarioId = req.session.userId;
      let username = await usuario.findOne({
        where: {
          id: usuarioId,
        },
      });

      let livrosDoUsuario = await usuarioLivro.findAll({
        where: {
          usuarioId: usuarioId,
        },
      });

      const nomesDosLivros = [];

      for (const livroDoUsuario of livrosDoUsuario) {
        let livrox = await livros.findOne({
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

    }
  } catch (error) {
    console.error("Erro ao processar o login:", error);
    res.render("login", { errorMessage: "Erro ao processar o login." });
  }
};
