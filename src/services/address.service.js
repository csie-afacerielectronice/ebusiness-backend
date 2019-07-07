const role = require('../utils/role');
const addressRepository = require('../repositories/address.repository');

module.exports = {
  async postAddress(address, user) {
    try {
      return await addressRepository.createAddress({
        ...address,
        userId: user.id
      });
    } catch (e) {
      throw e;
    }
  },
  async updateAddress(id, address) {
    try {
      return await addressRepository.updateAddress(id, {
        ...address
      });
    } catch (e) {
      throw e;
    }
  },
  async deleteAddress(id) {
    try {
      await addressRepository.deleteAddress(id);
    } catch (e) {
      throw e;
    }
  },
  async getAddresses(user) {
    try {
      if (user.role === role.CLIENT) {
        return await addressRepository.getAddressesByUserId(userId);
      }
      return await addressRepository.getAddresses();
    } catch (e) {
      throw e;
    }
  }
};
