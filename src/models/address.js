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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      county: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  address.associate = function(models) {
    address.belongsTo(models.user, { onDelete: 'CASCADE' });
    address.belongsTo(models.order, { foreignKey: 'deliveryAddressId' });
    address.belongsTo(models.order, { foreignKey: 'receiptAddressId' });
  };
  return address;
};
