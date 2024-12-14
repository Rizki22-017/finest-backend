'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        { role: 'admin', createdAt:new Date(), updatedAt:new Date() },
        { role: 'fishfarm', createdAt:new Date(), updatedAt:new Date() },
        { role: 'investor', createdAt:new Date(), updatedAt:new Date() },
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
