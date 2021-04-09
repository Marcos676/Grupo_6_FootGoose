'use strict';

let alimentos = [
  { subCategory: "Alimento balanceado" },
  { subCategory: "Alimento natural" },
  { subCategory: "Alimento medicado" }
]
let accesorios = [
  { subCategory: "Juguetes" },
  { subCategory: "Comederos y bebederos" },
  { subCategory: "Vivienda y comodidades" },
  { subCategory: "Accesorios varios" }
]
let higiene = [
  { subCategory: "Baño" },
  { subCategory: "Limpieza de habitat" },
  { subCategory: "Limpieza animal" },
  { subCategory: "Mantenimiento de habitat" }
]
let salud = [
  { subCategory: "Antiparasitarios y antibacterias" },
  { subCategory: "Vitaminas" },
]

let subCategorias = []

let c = 1

for (let i = 0; i < 6; i++) {

  
  alimentos.forEach(alimento => {
      let item = {
          ...alimento,
          categoryId: c,
          createdAt: new Date,
          updatedAt: new Date
      }
      subCategorias.push(item)
  });

  ++c

  accesorios.forEach(accesorio => {
      let item = {
          ...accesorio,
          categoryId: c,
          createdAt: new Date,
          updatedAt: new Date
      }
      subCategorias.push(item)
  });

  ++c
  
  higiene.forEach(element => {
      let item = {
          ...element,
          categoryId: c,
          createdAt: new Date,
          updatedAt: new Date
      }
      subCategorias.push(item)
  });

  ++c
  
  salud.forEach(element => {
      let item = {
          ...element,
          categoryId: c,
          createdAt: new Date,
          updatedAt: new Date
      }
      subCategorias.push(item)
  });

  ++c
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('SubCategories', subCategorias, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('SubCategories', null, {});
     
  }
};
