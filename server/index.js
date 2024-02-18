const express = require("express"),
  dotenv = require("dotenv").config(),
  mongoose = require("mongoose"),
  routerLogin = require("./router/loginRouter"),
  getEnv = require("./controller/getEnv"),
  routerProduct = require("./router/productRouter"),
  routerCart = require("./router/shoppingCart"),
  routerFavorite = require("./router/favorite"),
  chatRouter = require("./router/chatRouter"),
  http = require("http"),
  socketIo = require("socket.io");

const app = express();
app.use(express.json());
const port = getEnv.getPort();
const db_name = getEnv.getDatabase();
const db_url = getEnv.getUrlDatabase();

const server = http.createServer(app);
const io = socketIo(server);

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
app.use("/favorite", routerFavorite);
app.use("/chat", chatRouter);

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("sendMessage", (message) => {
    io.sockets.emit("returnMessage", message);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log("Server running in " + port + "...");
});
