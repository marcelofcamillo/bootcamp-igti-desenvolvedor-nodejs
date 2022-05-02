import Sequelize from 'sequelize';
import Client from './client.model.js';
import Product from './product.model.js';
import db from '../repositories/db.js';

const Sale = db.define(
  'sales',
  {
    saleId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { underscored: true }
);

Sale.belongsTo(Client, { foreignKey: 'clientId' });
Sale.belongsTo(Product, { options: 'productId' });

export default Sale;
