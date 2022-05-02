import pg from 'pg';
import Sequelize from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});

export default sequelize;
