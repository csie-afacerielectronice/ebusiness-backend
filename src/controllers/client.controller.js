const yup = require('yup');
const role = require('../utils/role');
const clientService = require('../services/client.service');
const userService = require('../services/user.service');
const errorHandler = require('../utils/errorHandler');

const postSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  userId: yup.string().required()
});

const updateSchema = yup.object().shape({
  name: yup.string(),
  surname: yup.string()
});

module.exports = {
  getClients: async (req, res) => {
    try {
      const clients = await clientService.getClients();
      res.status(200).send(clients);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  postClient: async (req, res) => {
    try {
      await postSchema.validate(req.body);
      const client = await clientService.createClient(req.body);
      await userService.updateUser(client.userId, { role: role.CLIENT });
      res.status(201).send(client);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  patchClient: async (req, res) => {
    try {
      await updateSchema.validate(req.body);
      const client = await clientService.updateClient(req.params.id, req.body);
      if (client) res.status(200).send(client);
      else res.sendStatus(404);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  deleteClient: async (req, res) => {
    try {
      const client = await clientService.deleteClient(req.params.id);
      if (client) {
        res.sendStatus(204);
      } else res.sendStatus(404);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  getClient: async (req, res) => {
    try {
      const client = await clientService.getClient(req.params.id);
      if (client) {
        res.status(200).send(client);
      } else res.sendStatus(404);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  getClientProfile: async (req, res) => {
    try {
      const client = await clientService.getClient(req.client.id);
      if (client) {
        res.status(200).send(client);
      } else res.sendStatus(404);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  updateClientProfile: async (req, res) => {
    try {
      await updateSchema.validate(req.body);
      const client = await clientService.updateClient(req.client.id, req.body);
      if (client) res.status(200).send(client);
      else res.sendStatus(404);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
