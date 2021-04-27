'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategory.hasMany(models.Product, {
        as: "products",
        foreingKey: "subCategoryId"
    })
    SubCategory.belongsTo(models.Category, {
        as: "category",
        foreingKey: 'categoryId'
    })
    }
  };
  SubCategory.init({
    subCategory: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};