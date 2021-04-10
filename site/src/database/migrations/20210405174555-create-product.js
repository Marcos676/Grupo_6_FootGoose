'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      cuantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(7,2)
      },
      discount: {
        type: Sequelize.INTEGER
      },
      sold: {
        type: Sequelize.INTEGER
      },
      expiration: {
        type: Sequelize.DATE
      },
      finalPrice: {
        type: Sequelize.DECIMAL(7,2)
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "SubCategories"
          },
          key: "id"
        }
      },
      labelId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Labels"
          },
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};