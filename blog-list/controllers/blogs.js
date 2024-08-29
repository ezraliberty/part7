const blogRoutes = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { userExtractor } = require("../utils/middleware");

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRoutes.get("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {username: 1}).populate("comments", {comment: 1});
  response.json(blog);
});

blogRoutes.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  // user.blogs = user.blogs.concat(savedBlog);
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRoutes.post("/:id/comments", userExtractor, async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    comment: body.comment,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment.id);
  await blog.save();

  response.status(201).json(savedComment);
});

blogRoutes.put("/:id", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  const findBlog = await Blog.findById(request.params.id);

  if (findBlog.user.toString() === user.id) {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };

    const updatePost = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatePost);
  } else {
    return response.status(400).json({ error: "Sign in to Update Post" });
  }
});

blogRoutes.put("/:id/likes", userExtractor, async (request, response) => {
  try {
    const updatePost = await Blog.findByIdAndUpdate(
      request.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    response.json(updatePost);
  } catch (error) {
    response.status(400).json({ error: "Error Incrementing Likes" });
  }
});

blogRoutes.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (!(blog.user.toString() === user.id)) {
    return response.status(400).json({ error: "Token Invalid" });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRoutes;
