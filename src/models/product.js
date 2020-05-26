"use strict";
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image: DataTypes.STRING,
    },
    {}
  );
  product.associate = function (models) {
    product.belongsTo(models.category, { onDelete: "CASCADE" });
    product.hasMany(models.review);
    product.belongsToMany(models.order, {
      through: {
        model: models.order_product,
        as: "orders",
      },
    });
  };
  return product;
};
