const faker = require('faker');

const { token } = require('../../src/models');

const data = (props = {}) => {
  const defaultProps = {
    token: 'test',
    expiresAt: faker.date.future(1, new Date()),
    userId: '',
    type: 'refresh'
  };

  return { ...defaultProps, ...props };
};

module.exports = {
  data,
  factory: async (props = {}) => {
    return token.create(await data(props));
  }
};
