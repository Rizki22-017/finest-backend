'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      ponds_wide: {
        type: Sequelize.INTEGER
      },
      production_capacity: {
        type: Sequelize.FLOAT
      },
      feed_cost: {
        type: Sequelize.FLOAT
      },
      worker_cost: {
        type: Sequelize.FLOAT
      },
      maintenance_cost: {
        type: Sequelize.FLOAT
      },
      selling_price: {
        type: Sequelize.FLOAT
      },
      estimated_income: {
        type: Sequelize.FLOAT
      },
      funds_managed: {
        type: Sequelize.FLOAT
      },
      margin: {
        type: Sequelize.FLOAT
      },
      product_pict: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};