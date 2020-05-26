const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroSequelize = require("admin-bro-sequelizejs");

const db = require("../models");

AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
  databases: [db],
  rootPath: '/admin',
});
module.exports = {
  router: AdminBroExpress.buildRouter(adminBro),
  adminBro
};
