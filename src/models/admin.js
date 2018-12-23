'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    'admin',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  admin.associate = function(models) {
    admin.belongsTo(models.user, { onDelete: 'CASCADE' });
  };
  return admin;
};
