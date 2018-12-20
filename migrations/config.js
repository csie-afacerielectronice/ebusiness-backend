require('dotenv').config();

module.exports = {
  [process.env.NODE_ENV]: {
    host: eval(`process.env.DB_HOST_${process.env.NODE_ENV}`) || 'localhost',
    port: eval(`process.env.DB_PORT_${process.env.NODE_ENV}`) || '',
    database: eval(`process.env.DB_NAME_${process.env.NODE_ENV}`) || '',
    username: eval(`process.env.DB_USER_${process.env.NODE_ENV}`) || 'root',
    password: eval(`process.env.DB_PASSWORD_${process.env.NODE_ENV}`) || '',
    migrationStorageTableName: 'migrations',
    dialect: eval(`process.env.DB_DIALECT_${process.env.NODE_ENV}`) || 'sqlite',
    storage:
      eval(`process.env.DB_STORAGE_${process.env.NODE_ENV}`) ||
      `./db_${process.env.NODE_ENV.toLowerCase()}.sqlite`
  }
};
