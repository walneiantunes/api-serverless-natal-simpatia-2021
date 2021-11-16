const mysql = require("mysql");
const SETTINGS = require("../../env");

const connection = mysql.createPool(
  SETTINGS.CONNECTION[process.env.NODE_ENV] || SETTINGS.CONNECTION.development
);

module.exports = connection;
