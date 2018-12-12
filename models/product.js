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
      name: DataTypes.STRING,
      category_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
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
