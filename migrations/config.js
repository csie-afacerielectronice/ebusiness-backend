module.exports = {
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  migrationStorageTableName: 'migrations',
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage:
    process.env.DB_STORAGE ||
    `./db_${process.env.NODE_ENV.toLowerCase()}.sqlite`,
  logging: process.env.NODE_ENV === 'DEV' ? true : false
};
