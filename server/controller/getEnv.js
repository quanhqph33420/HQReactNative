class getEnv {
  dotenv = require("dotenv").config();
  getDatabase() {
    return process.env.DATABASE;
  }
  getUrlDatabase() {
    return process.env.URL_DATABASE;
  }
  getPort() {
    return process.env.PORT;
  }
  getCollectionUser() {
    return process.env.COLLECTION_USER;
  }
}
module.exports = new getEnv();
