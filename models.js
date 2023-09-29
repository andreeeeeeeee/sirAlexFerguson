const { sequelize } = require("./config/database");

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

  const models = [ usuarios, livros, usuarioLivros ]

  livros.sync( { force: true } )  
  usuarioLivros.sync( { force: true } )
  usuarios.sync( { force: true } )

  usuarios.hasMany(livros, { through: usuarioLivros })
  livros.belongsTo(usuarios, { through: usuarioLivros })

  return models
}