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
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        }
      },
      content: DataTypes.STRING,
      score: DataTypes.INTEGER
    },
    {}
  );
  review.associate = function(models) {
    review.belongsTo(models.client);
    review.belongsTo(models.product);
  };
  return review;
};
