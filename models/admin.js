'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    'admin',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: DataTypes.STRING
    },
    {}
  );
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};
