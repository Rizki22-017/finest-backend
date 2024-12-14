'use strict';

const category = require('../models/category');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        { category: 'Tambak Udang', createdAt: new Date(), updatedAt: new Date() },
        { category: 'Ikan Air Tawar', createdAt: new Date(), updatedAt: new Date() },
        { category: 'Ikan Laut', createdAt: new Date(), updatedAt: new Date() },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
