const Blogs = require("../models/blog");
const { userId } = require("./blogs.test");

const initialBlogs = [
  {
    title: "A GOOD DAY TO DIE",
    author: "BOND",
    url: "007bond.com",
    likes: 25,
    user: userId,
  },
  {
    title: "A BAD DAY TO DIE",
    author: "JAMES",
    url: "james007bond.com",
    likes: 50,
    user: userId,
  },
];

const blogsInDb = async () => {
  const blog = await Blogs.find({});
  return blog.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
