const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");
const commodityRoute = require("./routes/commodity-route");
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("連接到MongoDB"),
      { useNewUrlParser: true, useUnifiedTopology: true };
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
app.use(
  "/api/commodity",
  passport.authenticate("jwt", { session: false }),
  commodityRoute
);

// 放在所有 API 路由之後
app.use(express.static(path.join(__dirname, "../../frontend/client/build")));

// 用命名通配，合法不會錯
app.get("/*path", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../../frontend/client/build/index.html")
  );
});

// 正確載入
const { pathToRegexp } = require("path-to-regexp");

const routes = [
  "/",
  "/api/user",
  "/api/commodity",
  "/api/commodity/:id",
  "/api/commodity/findByName/:name",
];

routes.forEach((route) => {
  try {
    // 用 pathToRegexp 這個函式來嘗試轉字串成正則
    pathToRegexp(route);
  } catch (e) {
    console.error("路由語法錯誤:", route, e.message);
  }
});

//port 3000是react預設port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`後端伺服器正在監聽 port ${PORT}`);
});
