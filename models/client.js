'use strict';
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define(
    'client',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      avatar: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  client.associate = function(models) {
    client.hasMany(models.address);
    client.hasMany(models.review);
    client.belongsTo(models.user);
  };
  return client;
};
