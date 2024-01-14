const express = require("express"),
  dotenv = require("dotenv").config(),
  mongoose = require("mongoose"),
  router = require("./router/loginRouter");

const app = express();
app.use(express.json());
const port = process.env.PORT;
const db_name = process.env.DATABASE;
const db_url = process.env.URL_DATABASE;

mongoose
  .connect(db_url + db_name)
  .then(function () {
    console.log(`Connected ${db_name}...`);
  })
  .catch(function (err) {
    console.log(err);
  });
  
app.get("/", (req, res) => {
  res.send("");
});

app.use("/login", router);
app.listen(port || 8000, () => {
  console.log(`Listening ${port}...`);
});
