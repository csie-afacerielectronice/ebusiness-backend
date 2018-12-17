'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING
    },
    {}
  );
  role.associate = function(models) {
    role.hasMany(models.user);
  };
  return role;
};
