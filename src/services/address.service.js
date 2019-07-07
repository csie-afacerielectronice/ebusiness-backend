const role = require('../utils/role');
const addressRepository = require('../repositories/address.repository');

module.exports = {
  async postAddress(address, user) {
    return await addressRepository.createAddress({
      ...address,
      userId: user.id
    });
  },
  async updateAddress(id, address) {
    return await addressRepository.updateAddress(id, {
      ...address
    });
  },
  async deleteAddress(id) {
    await addressRepository.deleteAddress(id);
  },
  async getAddress(id) {
    await addressRepository.getAddress(id);
  },
  async getAddresses(user) {
    if (user.role === role.CLIENT) {
      return await addressRepository.getAddressesByUserId(user.id);
    }
    return await addressRepository.getAddresses();
  }
};
