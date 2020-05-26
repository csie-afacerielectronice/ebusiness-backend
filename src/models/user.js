"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  user.associate = function (models) {
    user.hasMany(models.address);
  };

  user.beforeCreate(async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  });

  user.prototype.isPasswordValid = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  user.prototype.toJSON = function () {
    const values = { ...this.get() };

    delete values.password;
    return values;
  };

  return user;
};
