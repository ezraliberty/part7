const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const BlogRoutes = require("./controllers/blogs");
const usersRoutes = require("./controllers/users");
const loginRoutes = require("./controllers/signIn");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.DATABASE)
  .then(logger.info("Connected via", config.DATABASE));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", BlogRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/signin", loginRoutes);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
