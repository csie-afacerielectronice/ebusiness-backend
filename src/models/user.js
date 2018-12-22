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
        primaryKey: true
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
      role: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  user.associate = function(models) {
    user.hasOne(models.client);
    user.hasOne(models.admin);
  };

  user.beforeCreate(async user => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  });

  user.prototype.isPasswordValid = function(password) {
    return bcrypt.compareSync(password, this.password);
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
      token
    };
  };

  return user;
};
