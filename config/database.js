const Sequelize = require('sequelize')

sequelize = new Sequelize('sirAlexFerguson', 'root', 'mysqluser', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}