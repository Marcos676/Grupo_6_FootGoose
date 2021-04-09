'use strict';

let animales = [
  {animal: 'Perro',
  img: 'iconoPerro.png'},
  {animal: 'Gato',
  img: 'iconoGato.png'},
  {animal: 'Pez',
  img: 'iconoPez.png'},
  {animal: 'Roedor',
  img: 'iconoRoedor.png'},
  {animal: 'Ave',
  img: 'iconoAve.png'},
  {animal: 'Reptil',
  img: 'iconoReptil.png'}]

  let animals = []

animales.forEach(animal => {
  let item = {
    ...animal,
    createdAt: new Date,
    updatedAt: new Date
  }
  animals.push(item)
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Animals', animals, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Animals', null, {});

  }
};
