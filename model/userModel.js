class UserModel {
  user(username, email, fullname, phone, password) {
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.phone = phone;
    this.password = password;
  }
  user(username, password) {
    this.username = username;
    this.password = password;
  }
  user() {}
}
module.exports = new UserModel();
