const faker = require('faker');

const { user } = require('../../src/models');
const role = require('../../src/utils/role');

const data = async (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.random.objectElement(role),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    telephone: faker.phone.phoneNumber()
  };

  return { ...defaultProps, ...props };
};

module.exports = {
  data,
  factory: async (props = {}) => {
    return user.create(await data(props));
  }
};
