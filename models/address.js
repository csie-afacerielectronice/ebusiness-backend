'use strict';
module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define(
    'address',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      isPrimary: DataTypes.BOOLEAN,
      city: DataTypes.STRING,
      county: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      clientId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  address.associate = function(models) {
    address.belongsTo(models.client);
    address.belongsTo(models.order, { foreignKey: 'deliveryAddressId' });
    address.belongsTo(models.order, { foreignKey: 'receiptAddressId' });
  };
  return address;
};
