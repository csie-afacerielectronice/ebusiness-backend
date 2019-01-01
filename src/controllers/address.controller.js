const addressService = require('../services/address.service');

module.exports = {
  getAddresses: async (req, res, next) => {
    try {
      const addresses = await addressService.getAddresses(req.params.clientId);
      res.status(200).send(addresses);
    } catch (e) {
      next(e);
    }
  },
  postAddress: async (req, res, next) => {
    try {
      const address = await addressService.createAddress({
        ...req.body,
        clientId: req.params.clientId
      });
      res.status(201).send(address);
    } catch (e) {
      next(e);
    }
  },
  patchAddress: async (req, res, next) => {
    try {
      const address = await addressService.updateAddress(
        req.params.id,
        req.body
      );
      res.status(200).send(address);
    } catch (e) {
      next(e);
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
      await addressService.deleteAddress(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  getAddress: async (req, res, next) => {
    try {
      const address = await addressService.getAddress(req.params.id);
      res.status(200).send(address);
    } catch (e) {
      next(e);
    }
  }
};
