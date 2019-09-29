const addressService = require('../services/address_service');

module.exports = {
  getAddresses: async (req, res, next) => {
    try {
      const addresses = await addressService.get(
        {
          userId: req.user.id
        },
        { limit: req.query.limit, offset: req.skip }
      );
      const itemCount = addresses.count;
      const pageCount = Math.ceil(addresses.count / req.query.limit);

      res.status(200).send({
        data: addresses.rows,
        meta: {
          pageCount,
          itemCount
        }
      });
    } catch (e) {
      next(e);
    }
  },
  postAddress: async (req, res, next) => {
    try {
      const address = await addressService.save({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).send({ data: address });
    } catch (e) {
      next(e);
    }
  },
  putAddress: async (req, res, next) => {
    try {
      const address = await addressService.update(req.params.id, req.body);
      res.status(200).send({ data: address });
    } catch (e) {
      next(e);
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
      await addressService.destroy(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  getAddress: async (req, res, next) => {
    try {
      const address = await addressService.find(req.params.id);
      res.status(200).send({ data: address });
    } catch (e) {
      next(e);
    }
  }
};
