'use strict';

let img = 1

const imagenes = []

for (let i = 1; i <= 100; i++) {
  let imagen = {
    imgName: `${img}.jpg`,
    productId: i,
    createdAt: new Date,
    updatedAt: new Date
  }
    if (img === 20) {
        img = 0
      }

      ++img

  imagenes.push(imagen)

  imagen = {
    imgName: `${img}.jpg`,
    productId: i,
    createdAt: new Date,
    updatedAt: new Date
  }

  if (img === 20) {
    img = 0
  }

  ++img

  imagenes.push(imagen)
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('ImageProducts', imagenes, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('ImageProducts', null, {});
     
  }
};
