'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product,{
        as: 'productCart',
        through: 'Cart',
        foreingKey: 'userId',
        otherKey: 'productId'
    })

    User.belongsToMany(models.Product,{
        as: 'favorite',
        through: 'Favorite',
        foreingKey: 'userId',
        otherKey: 'productId'
    })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    zone: DataTypes.STRING,
    locality: DataTypes.STRING,
    address: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    img: DataTypes.STRING,
    admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};