const faker = require("faker");

const { address } = require("../../src/models");

const data = (props = {}) => {
  const defaultProps = {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    county: faker.address.county(),
    postalCode: faker.address.zipCode(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
    isPrimary: faker.random.boolean(),
  };

  return { ...defaultProps, ...props };
};

module.exports = {
  data,
  factory: async (props = {}) => {
    return address.create(await data(props));
  },
};
