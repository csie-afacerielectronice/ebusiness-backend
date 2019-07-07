'use strict';
const bcrypt = require('bcryptjs');
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
        type: DataTypes.STRING,
        allowNull: false
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.address);
  };

  user.beforeCreate(async user => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  });

  user.prototype.isPasswordValid = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  user.prototype.toJSON = function() {
    const values = { ...this.get() };

    delete values.password;
    return values;
  };

  user.prototype.token = function() {
    const today = new Date();
    const exp = new Date(today);

    exp.setDate(today.getDate() + 60);
    const token = jwt.sign(
      {
        context: {
          id: this.id,
          email: this.email,
          role: this.role
        },
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
