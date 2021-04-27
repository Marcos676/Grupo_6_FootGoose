'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.SubCategory, {
        as: "subCategory",
        foreingKey: "subCategoryId"
    })
    Product.belongsTo(models.Label, {
        as: "label",
        foreingKey: "labelId"
    })
    Product.hasMany(models.ImageProduct, {
        as: "images",
        foreingKey: "productId"
    })
    Product.belongsToMany(models.User,{
        as: 'cartProduct',
        through: 'Carts',
        foreingKey: 'productId',
        otherKey: 'favoriteId'
    })
    Product.belongsToMany(models.User,{
        as: 'favoriteOfUser',
        through: 'Favorites',
        foreingKey: 'productId',
        otherKey: 'userId'
    })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cuantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    expiration: DataTypes.DATE,
    finalPrice: DataTypes.DECIMAL,
    subCategoryId: DataTypes.INTEGER,
    labelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};