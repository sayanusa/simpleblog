'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedAccess = [
      {
        name: "ArticleStore",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    
    {
        name: "ArticleAdminUpdate",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    
    {
        name: "ArticleOwnerUpdate",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
     ];
    await queryInterface.bulkInsert('accesses', seedAccess, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accesses', null, {});
  }
};
