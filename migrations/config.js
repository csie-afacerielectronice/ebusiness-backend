require('dotenv').config();

module.exports = {
  [process.env.NODE_ENV]: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    migrationStorageTableName: 'migrations',
    dialect: process.env.DB_DIALECT || 'mysql'
  }
};
