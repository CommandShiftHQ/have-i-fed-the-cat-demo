const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");
const catRouter = require("./routes/cat");
const userRouter = require("./routes/user");
const feedRouter = require("./routes/feed");
const authRouter = require("./routes/auth");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.static("public"));

app.use("/cats", catRouter);

app.use("/feed", feedRouter);

app.use("/users", userRouter);

app.use("/auth", authRouter);

app.get("*", (_, res) => {
  res.redirect("/");
});

module.exports = app;
