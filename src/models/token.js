'use strict';
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define(
    'token',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        default: 'refresh'
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {}
  );
  token.associate = function(models) {
    token.belongsTo(models.user);
  };
  return token;
};
