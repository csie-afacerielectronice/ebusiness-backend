'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  user.associate = function(models) {
    user.hasOne(models.client);
    user.belongsTo(models.role);
    user.hasOne(models.admin);
  };

  user.beforeCreate(async user => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  });

  user.prototype.isPasswordValid = async function(password) {
    return await bcrypt.compare(this.password, password);
  };

  user.prototype.authJSON = function() {
    const today = new Date();
    const exp = new Date(today);

    exp.setDate(today.getDate() + 60);
    const token = jwt.sign(
      {
        id: this.id,
        exp: parseInt(exp.getTime() / 1000)
      },
      process.env.JWT_SECRET
    );

    return {
      email: this.email,
      token
    };
  };

  return user;
};
