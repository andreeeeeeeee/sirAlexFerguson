module.exports = (sequelize, DataTypes) => {
  let livro = sequelize.define('livro',
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

  livro.associate = (models) => {
    livro.hasMany(models.usuarioLivro, { foreignKey: "livroId" });
  };
  // livro.sync({ force: true })

  return livro;
}
