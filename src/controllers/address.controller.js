const yup = require('yup');
const addressService = require('../services/address.service');
const errorHandler = require('../utils/errorHandler');

const postSchema = yup.object().shape({
  name: yup.string().required(),
  isPrimary: yup.boolean().required(),
  city: yup.string().required(),
  county: yup.string().required(),
  postalCode: yup.string().required(),
  lat: yup.number().required(),
  lng: yup.number().required()
});

const updateSchema = yup.object().shape({
  name: yup.string(),
  isPrimary: yup.boolean(),
  city: yup.string(),
  county: yup.string(),
  postalCode: yup.string(),
  lat: yup.number(),
  lng: yup.number()
});

module.exports = {
  getAddresses: async (req, res, next) => {
    try {
      const addresses = await addressService.getAddresses(req.params.clientId);
      res.status(200).send(addresses);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  postAddress: async (req, res, next) => {
    try {
      await postSchema.validate(req.body);
      const address = await addressService.createAddress({
        ...req.body,
        clientId: req.params.clientId
      });
      res.status(201).send(address);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  patchAddress: async (req, res, next) => {
    try {
      await updateSchema.validate(req.body);
      const address = await addressService.updateAddress(
        req.params.id,
        req.body
      );
      res.status(200).send(address);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
      await addressService.deleteAddress(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  getAddress: async (req, res, next) => {
    try {
      const address = await addressService.getAddress(req.params.id);
      res.status(200).send(address);
    } catch (e) {
      errorHandler(e, next);
    }
  }
};
