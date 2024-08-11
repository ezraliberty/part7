const bcrypt = require("bcrypt");
const usersRoutes = require("express").Router();
const User = require("../models/user");


usersRoutes.get("/userDetails", async (request, response) => {
  const users = await User.find({}).populate("username", {username: 1});
  response.json(users);
});


usersRoutes.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 4 || password === undefined) {
    return response
      .status(400)
      .json({ error: "password is required with a length greater than 3" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRoutes.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  console.log(users);
  response.json(users);
});

module.exports = usersRoutes;
