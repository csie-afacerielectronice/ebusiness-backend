'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    'review',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      product_id: DataTypes.UUID,
      user_id: DataTypes.UUID,
      content: DataTypes.STRING,
      score: DataTypes.INTEGER
    },
    {}
  );
  review.associate = function(models) {
    // associations can be defined here
  };
  return review;
};
