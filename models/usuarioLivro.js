module.exports = (sequelize, DataTypes) => {
  let usuarioLivro = sequelize.define('usuarioLivro',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      usuarioId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      livroId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      quantidade: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    { timestamps: false }
  )

  usuarioLivro.associate = (models) => {
    usuarioLivro.belongsTo(models.usuario, { foreignKey: 'usuarioId' });
    usuarioLivro.belongsTo(models.livro, { foreignKey: 'livroId' });
  };
  // usuarioLivro.sync({ force: true });

  return usuarioLivro;
}
