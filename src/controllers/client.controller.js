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
  getClients: async (req, res, next) => {
    try {
      const clients = await clientService.getClients();
      res.status(200).send(clients);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  postClient: async (req, res, next) => {
    try {
      await postSchema.validate(req.body);
      const client = await clientService.createClient(req.body);
      await userService.updateUser(client.userId, { role: role.CLIENT });
      res.status(201).send(client);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  patchClient: async (req, res, next) => {
    try {
      await updateSchema.validate(req.body);
      const client = await clientService.updateClient(req.params.id, req.body);
      res.status(200).send(client);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  deleteClient: async (req, res, next) => {
    try {
      await clientService.deleteClient(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  getClient: async (req, res, next) => {
    try {
      const client = await clientService.getClient(req.params.id);
      res.status(200).send(client);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  getClientProfile: async (req, res, next) => {
    try {
      const client = await clientService.getClient(req.client.id);
      res.status(200).send(client);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  updateClientProfile: async (req, res, next) => {
    try {
      await updateSchema.validate(req.body);
      const client = await clientService.updateClient(req.client.id, req.body);
      res.status(200).send(client);
    } catch (e) {
      errorHandler(e, next);
    }
  }
};
