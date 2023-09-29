const { sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
  let usuarioLivros = sequelize.define('usuarioLivros',
    {
      id_usuario: {
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

  usuarioLivros.sync( { force: true } )

  return usuarioLivros
}
