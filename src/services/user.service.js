const gravatar = require("gravatar");
const { user } = require("../models");

module.exports = {
  createUser: async (data) => {
    const userObj = await user.create({
      ...data,
      avatar: data.avatar ? data.avatar : gravatar.url(data.email),
    });

    return userObj;
  },
};
