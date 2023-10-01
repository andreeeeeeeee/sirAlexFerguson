module.exports = (sequelize, DataTypes) => {
  let usuario = sequelize.define('usuario',
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

  usuario.associate = (models) => {
    usuario.hasMany(models.usuarioLivro, { foreignKey: "usuarioId" });
  };
  // usuario.sync ({force:true})

  return usuario;
}
