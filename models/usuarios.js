const { sequelize } = require("../config/database");
const usuarioLivros = require("./usuarioLivros");
const livros = require("./livros");

module.exports = (sequelize, DataTypes) => {
  let usuarios = sequelize.define('usuarios',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      senha: {
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  )

  usuarios.hasMany(livros, { through: usuarioLivros })

  usuarios.sync( { force: true } )

  return usuarios
}
