'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
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
    // associations can be defined here
  };
  return product;
};
