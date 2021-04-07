'use strict';

const faker = require('faker')

const productos = [...Array(100)].map(producto => (

  producto = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    cuantity: faker.datatype.number({min:0, max:100}),
    price: faker.datatype.number({min: 100, max: 9999}),
    discount: faker.datatype.number({min:0, max:100}),
    sold:  faker.datatype.number({min:0, max:100}),
    expiration: faker.date.future(),
    finalPrice: faker.datatype.number({min: 100, max: 9999}),
    subCategoryId: faker.datatype.number({max:78, min:1}),
    labelId: faker.datatype.number({max:3, min:1}),
    createdAt: new Date,
    updatedAt: new Date
  }
  
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Products', productos, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Products', null, {});
     
  }
};
