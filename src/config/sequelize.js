module.exports = {
  development: {
    username: "ebusiness",
    password: "secret",
    database: "ebusiness",
    host: "database",
    dialect: "mysql",
    port: 3306,
  },
  test: {
    dialect: "sqlite",
    // the storage engine for sqlite
    // - default ':memory:'
    storage: ":memory:",
  },
  production: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
