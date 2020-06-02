const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.addresses = this.hasMany(models.Address);
    this.profile = this.hasOne(models.Profile);
  }

  isPasswordValid(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
