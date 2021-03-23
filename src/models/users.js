module.exports = (sequelize, DataTypes) => {
  const schema = {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }

  return sequelize.define('User', schema)
}
