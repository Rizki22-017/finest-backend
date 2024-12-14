'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });

      Order.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  Order.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    estimated_roi: DataTypes.DECIMAL,
    profil: DataTypes.DECIMAL,
    investment_status: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    profit_distribution: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};