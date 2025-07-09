const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const commodityRoute = require("./routes").commodity;
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

// 提供靜態資源
app.use(express.static(path.join(__dirname, "../frontend/build")));

// 所有路由都返回 index.html（支援 React Router）
app.get("/*any", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//port 3000是react預設port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`後端伺服器正在監聽 port ${PORT}`);
});
