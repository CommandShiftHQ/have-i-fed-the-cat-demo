const Sequelize = require('sequelize');
const CatModel = require('./cats');
const UserModel = require('./users');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false
  })

  const Cat = CatModel(connection, Sequelize);
  const User = UserModel(connection, Sequelize);

  Cat.belongsTo(User, { as: "owner" });

  connection.sync({alter: true});

  return {
    Cat,
    User
  };
};

module.exports = setUpDatabase();