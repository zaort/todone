const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
// what is JAWSDB_URL?
if (process.env.JAWSDB_URL) {
 sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
 sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
   host: 'https://todonev1-e2046c4cf383.herokuapp.com/',
   dialect: 'mysql',
   port: 3306,
  }
 );
}

//why is it not green?
module.exports = sequelize;
