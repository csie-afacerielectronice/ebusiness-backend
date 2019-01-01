const role = require('../utils/role');
const clientService = require('../services/client.service');
const userService = require('../services/user.service');

module.exports = {
  getClients: async (req, res, next) => {
    try {
      const clients = await clientService.getClients();
      res.status(200).send(clients);
    } catch (e) {
      next(e);
    }
  },
  postClient: async (req, res, next) => {
    try {
      const client = await clientService.createClient(req.body);
      await userService.updateUser(client.userId, { role: role.CLIENT });
      res.status(201).send(client);
    } catch (e) {
      next(e);
    }
  },
  patchClient: async (req, res, next) => {
    try {
      const client = await clientService.updateClient(req.params.id, req.body);
      res.status(200).send(client);
    } catch (e) {
      next(e);
    }
  },
  deleteClient: async (req, res, next) => {
    try {
      await clientService.deleteClient(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  getClient: async (req, res, next) => {
    try {
      const client = await clientService.getClient(req.params.id);
      res.status(200).send(client);
    } catch (e) {
      next(e);
    }
  },
  getClientProfile: async (req, res, next) => {
    try {
      const client = await clientService.getClient(req.client.id);
      res.status(200).send(client);
    } catch (e) {
      next(e);
    }
  },
  updateClientProfile: async (req, res, next) => {
    try {
      const client = await clientService.updateClient(req.client.id, req.body);
      res.status(200).send(client);
    } catch (e) {
      next(e);
    }
  }
};
