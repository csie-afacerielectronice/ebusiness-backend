'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
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
  role.associate = function(models) {
    // associations can be defined here
  };
  return role;
};
