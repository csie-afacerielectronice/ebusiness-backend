'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        }
      },
      deliveryAddressId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      receiptAddressId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      status: DataTypes.STRING
    },
    {}
  );
  order.associate = function(models) {
    order.hasMany(models.address, { foreignKey: 'deliveryAddressId' });
    order.hasMany(models.address, { foreignKey: 'receiptAddressId' });
    order.hasMany(models.order_product);
  };
  return order;
};
