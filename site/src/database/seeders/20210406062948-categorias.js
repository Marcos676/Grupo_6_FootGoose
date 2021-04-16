'use strict';

let nameCategory = [
  {category: 'Alimento'},
  {category: 'Accesorio'},
  {category: 'Higiene'},
  {category: 'Salud'}
]
let namesCategories = []

for (let i = 0; i < 6; i++) {
  namesCategories.push(...nameCategory)
}

let i = 1
let c = 0

let categories = []

namesCategories.forEach(category => {

  let item = {
    ...category,
    animalId: i,
    createdAt: new Date,
    updatedAt: new Date
  }
  ++c
  if (c === 4) {
    ++i
    c = 0
  }
  categories.push(item)
});


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
