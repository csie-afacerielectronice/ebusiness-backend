'use strict';
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define(
    'client',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      avatar: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  client.associate = function(models) {
    client.belongsTo(models.user, { onDelete: 'CASCADE' });
  };
  return client;
};
