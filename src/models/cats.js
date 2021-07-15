module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty',
        },
      },
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'breed cannot be empty',
        },
      },
    },
    markings: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'markings cannot be empty',
        },
      },
    },
    lastFed: DataTypes.DATE,
  };

  return sequelize.define('Cat', schema);
};
