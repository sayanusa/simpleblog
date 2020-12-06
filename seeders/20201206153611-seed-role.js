'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedRole = [
      {
        name: "administrator",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    
    {
        name: "account",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
     ];
    await queryInterface.bulkInsert('roles', seedRole, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
