module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    markings: DataTypes.STRING,
    lastFed: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
  }

  return sequelize.define('Cat', schema)
}

