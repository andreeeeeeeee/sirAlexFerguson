const { sequelize, Sequelize } = require("../config/database");
const Usuario = require("../models/usuario")(sequelize, Sequelize);

const bcrypt = require("bcrypt");

exports.home = (req, res) => {
  res.render("cadastro", { layout: false });
};

exports.cadastro = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.render("cadastro", { errorMessage: "Eesse e-mail já possui cadastro." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const newUser = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
    });

    res.render("login", { user: newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.render("cadastro", { errorMessage: "Erro ao registrar usuário." });
  }
};
