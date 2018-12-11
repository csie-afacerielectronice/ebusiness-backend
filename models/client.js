'use strict';
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define(
    'client',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      addressId: DataTypes.UUID,
      isPrimary: DataTypes.BOOLEAN,
      city: DataTypes.STRING,
      county: DataTypes.STRING,
      postalCode: DataTypes.STRING
    },
    {}
  );
  client.associate = function(models) {
    // associations can be defined here
  };
  return client;
};
