const addressService = require('../services/address.service');

module.exports = {
  getAddresses: async (req, res) => {
    try {
      const addresses = await addressService.getConversations({
        clientId: req.user.clientId
      });
      res.status(200).send(addresses);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
};
