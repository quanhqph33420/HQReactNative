const express = require("express"),
  dotenv = require("dotenv").config(),
  mongoose = require("mongoose"),
  routerLogin = require("./router/loginRouter"),
  getEnv = require("./controller/getEnv"),
  routerProduct = require("./router/productRouter"),
  routerCart = require("./router/shoppingCart");

const app = express();
app.use(express.json());
const port = getEnv.getPort();
const db_name = getEnv.getDatabase();
const db_url = getEnv.getUrlDatabase();

mongoose
  .connect(db_url + db_name)
  .then(function () {
    console.log(`Connected ${db_name}...`);
  })
  .catch(function (err) {
    console.log(err);
  });

app.get("/", (req, res) => res.send(""));

app.use("/login", routerLogin);
app.use("/products", routerProduct);
app.use("/cart", routerCart);
app.listen(port, () => {
  console.log("Sever running in " + port + "...");
});
