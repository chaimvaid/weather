'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

  // Getting DB configuration from microKit
const config={
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USERNAME,
  database: process.env.POSTGRES_DATABASE,
  host:     process.env.POSTGRES_HOST,
  dialect:  process.env.POSTGRES_DIALECT,
  port:     process.env.POSTGRES_PORT
}

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


