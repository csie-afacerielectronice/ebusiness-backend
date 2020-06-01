"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  category.associate = function (models) {
    category.hasMany(models.product);
  };
  return category;
};
