'use strict';

let user = 
  {
    password: '$2b$12$fIKitNiiiDRgKK7AEe91vONvms66S9CaWqI.iN/ABUZy.wuPzGaEq',
    admin: 0,
    createdAt: new Date,
    updatedAt: new Date
  }

let admin = 
  {
    password: '$2b$12$fIKitNiiiDRgKK7AEe91vONvms66S9CaWqI.iN/ABUZy.wuPzGaEq',
    admin: 1,
    createdAt: new Date,
    updatedAt: new Date
  }

let usuarios = [
  {
    firstName: 'Sofia',
    lastName: 'Andrada',
    email: 'sofi@ss.com',
    ...user
},
{
  firstName: 'Gabriel',
  lastName: 'Patiño',
  email: 'gaby@gg.com',
  ...user
},
{
  firstName: 'Macarena',
  lastName: 'Grille',
  email: 'maca@mm.com',
  ...user
},
{
  firstName: 'Kenny',
  lastName: 'Loggins',
  email: 'user@kl.com',
  ...user
},
{
  firstName: 'Marcos',
  lastName: 'Garbini',
  email: 'marcos@mg.com',
  ...admin
},
{
  firstName: 'Mark',
  lastName: 'Facebook',
  email: 'mark@fb.com',
  ...admin
},
{
  firstName: 'Ada',
  lastName: 'Love',
  email: 'ada@love.com',
  ...admin
},
{
  firstName: 'Kenny',
  lastName: 'Loggins',
  email: 'admin@kl.com',
  ...admin
},
{
  firstName: 'Nacho',
  lastName: 'Vuotto',
  email: 'nacho@dh.com',
  ...admin
}
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users', usuarios, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Users', null, {});
     
  }
};
