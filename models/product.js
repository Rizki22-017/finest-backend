'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
      });
      Product.hasMany(models.Order, {
        foreignKey: 'product_id'
      });
    }
  }

  Product.init({
    category_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    location: DataTypes.STRING,
    ponds_wide: DataTypes.FLOAT,
    production_capacity: DataTypes.FLOAT,
    feed_cost: DataTypes.FLOAT,
    worker_cost: DataTypes.FLOAT,
    maintenance_cost: DataTypes.FLOAT,
    selling_price: DataTypes.FLOAT,
    estimated_income: DataTypes.FLOAT,
    funds_managed: DataTypes.FLOAT,
    margin: DataTypes.FLOAT,
    product_pict: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });

  // Fungsi untuk menghitung estimasi
  const calculateEstimates = (product) => {
    // Estimasi Pendapatan
    const estimatedIncome = product.production_capacity * product.selling_price;

    // Estimasi Biaya yang Dikelola
    const managedFunds = product.feed_cost + product.worker_cost + product.maintenance_cost;

    // Proyeksi Margin Kotor
    const grossMargin = ((estimatedIncome - managedFunds) / estimatedIncome) * 100;

    return {
      estimatedIncome,
      managedFunds,
      grossMargin
    };
  };

  // Hook sebelum create
  Product.addHook('beforeCreate', (product, options) => {
    const { estimatedIncome, managedFunds, grossMargin } = calculateEstimates(product);

    // Set nilai estimasi ke dalam kolom yang sesuai
    product.estimated_income = estimatedIncome;
    product.funds_managed = managedFunds;
    product.margin = grossMargin;
  });

  // Hook sebelum update
  Product.addHook('beforeUpdate', (product, options) => {
    const { estimatedIncome, managedFunds, grossMargin } = calculateEstimates(product);

    // Set nilai estimasi ke dalam kolom yang sesuai
    product.estimated_income = estimatedIncome;
    product.funds_managed = managedFunds;
    product.margin = grossMargin;
  });

  return Product;
};
