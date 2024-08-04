const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./blog_helper");
const app = require("../app");
const api = supertest(app);
const Blogs = require("../models/blog");
const Users = require("../models/user");

let token = null;
let userId = null;

beforeAll(async () => {
  await Blogs.deleteMany({});
  console.log("removed");

  await Users.deleteMany({});

  const blogObj = helper.initialBlogs.map((blog) => new Blogs(blog));
  const promiseArray = blogObj.map((blog) => blog.save());
  await Promise.all(promiseArray);

  const createUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'testpassword',
  };

  const userResponse = await api.post('/api/users').send(createUser).expect(201);
  userId = userResponse.body.id;

  helper.initialBlogs.forEach((blog) => {
    blog.user = userId;
  });

  const login = {
    username: createUser.username,
    password: createUser.password,
  };
  const authResponse = await api.post('/api/signin').send(login).expect(200);
  token = authResponse.body.token;
});

test("returns the correct amount of blog posts in the JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blog = await helper.blogsInDb();
  expect(blog).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await helper.blogsInDb();
  const idTest = response[0];

  expect(idTest.id).toBeDefined();
});

test("successfully creates a new blog post", async () => {
  const newPost = {
    title: "WIn Win WIN",
    author: "helo smith",
    url: "james007bond.com",
    likes: 20,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  helper.initialBlogs.push(newPost)
  const blog = await helper.blogsInDb();
  expect(blog).toHaveLength(helper.initialBlogs.length);

  const updatedBlog = blog.map((post) => post.title);
  expect(updatedBlog).toContain("WIn Win WIN");
});
//   const newost = {
//     author: "helo smith",
//     likes: 2,
//   };

//   await api.post("/api/blogs")
//     .send(newost)
//     .expect(400);

//   const allPosts = await helper.blogsInDb();
//   expect(allPosts).toHaveLength(helper.initialBlogs.length);
// });

test("if the likes property is missing from the request Default Value = 0", async () => {
  const newPost = {
    title: "WINter falls",
    author: "helo smith",
    url: "james007bond.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newPost)
    .expect(201);

  helper.initialBlogs.push(newPost)
  const blogs = await helper.blogsInDb();
  const updatedBlog = blogs.find((blog) => blog.title === newPost.title);
  expect(updatedBlog.likes).toBe(0);
});

test("title or url properties are missing from the request", async () => {
  const newPost = {
    author: "peter ddd",
    url: "jamend.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newPost)
    .expect(400);

  const blogResult = await helper.blogsInDb();
  expect(blogResult).toHaveLength(helper.initialBlogs.length);
});

test("Deleting a single blog post", async () => {
  const allPosts = await helper.blogsInDb();
  const postToDelete = allPosts[2].id;

  await api
    .delete(`/api/blogs/${postToDelete}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const updatedBlog = await helper.blogsInDb();
  expect(updatedBlog).toHaveLength(helper.initialBlogs.length - 1);

  const contents = updatedBlog.map((post) => post.title);
  expect(contents).not.toContain(postToDelete.title);
});

test("updating blog posts", async () => {
  const allPosts = await helper.blogsInDb();
  const updatePost = allPosts[2].id;

  const addPost = {
    title: "LINT",
    author: "helo smith",
    url: "james007bond.com",
    likes: 20,
  };

  await api
    .put(`/api/blogs/${updatePost}`)
    .set("Authorization", `Bearer ${token}`)
    .send(addPost)
    .expect(200);

  const blogs = await helper.blogsInDb();
  const updatedBlog = blogs.map((blog) => blog.title);
  expect(updatedBlog).toContain(addPost.title);
});

afterAll(async () => {
  await mongoose.connection.close();
});

module.exports = {
  userId,
};

