const { sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
  let livros = sequelize.define('livros',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      autores: {
        type: DataTypes.STRING
      },
      titulo: {
        type: DataTypes.STRING
      },
      ano: {
        type: DataTypes.SMALLINT(4)
      },
      editora: {
        type: DataTypes.STRING
      },
      disponivel: {
        type: DataTypes.INTEGER.UNSIGNED
      }
    },
    { timestamps: false }
  )

  livros.sync( { force: true } )

  return livros
}
