const UserDto = require("../dto/user.dto");
const { User } = require("../../../db");

class CreateUserAction {
  static async execute(userData) {
    const userObj = await User.create(UserDto.fromRequest(userData));
    return UserDto.toJSON(userObj);
  }
}

module.exports = CreateUserAction;
