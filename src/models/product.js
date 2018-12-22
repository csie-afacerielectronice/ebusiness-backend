'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'product',
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
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      image: DataTypes.STRING
    },
    {}
  );
  product.associate = function(models) {
    product.belongsTo(models.category);
    product.hasMany(models.review);
    product.hasMany(models.order_product);
  };
  return product;
};
