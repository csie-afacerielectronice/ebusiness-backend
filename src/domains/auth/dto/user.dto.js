const gravatar = require("gravatar");

class UserDto {
  static fromDto(data) {
    return {
      email: data.email,
      password: data.password,
      avatar: data.avatar ? data.avatar : gravatar.url(data.email),
      role: data.role ? data.role : "client",
    };
  }

  static toJSON(model) {
    return {
      email: model.email,
      avatar: model.avatar,
      role: model.role,
    };
  }
}

module.exports = UserDto;
