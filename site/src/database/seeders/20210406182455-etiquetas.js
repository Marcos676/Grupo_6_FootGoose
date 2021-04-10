'use strict';

let etiquetas = [
  {
    label: 'Sin etiqueta',
    img: null,
    createdAt: new Date,
    updatedAt: new Date
  },
  {
    label: 'Nuevo',
    img: 'labelNuevo.png',
    createdAt: new Date,
    updatedAt: new Date
  },
  {
    label: 'Descuento',
    img: 'labelDescuento.png',
    createdAt: new Date,
    updatedAt: new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Labels', etiquetas, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Labels', null, {});
     
  }
};
