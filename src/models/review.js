'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    'review',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      content: DataTypes.STRING,
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  review.associate = function(models) {
    review.belongsTo(models.client, { onDelete: 'CASCADE' });
    review.belongsTo(models.product, { onDelete: 'CASCADE' });
  };
  return review;
};
