class UserModel {
  user(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  user(username, password) {
    this.username = username;
    this.password = password;
  }
}
module.exports = new UserModel();
