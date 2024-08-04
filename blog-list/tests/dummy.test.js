const listHelper = require("../utils/list_helper");

const blog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Peter Park",
    url: "http://www.u.arizona.edu/",
    likes: 15,
    __v: 0,
  },
  {
    _id: "5a422aa71b54af8",
    title: "Go To Statement Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson",
    likes: 25,
    __v: 0,
  },
  {
    _id: "5a422aa716234d17f8",
    title: " Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu.html",
    likes: 35,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("Total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(blog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(80);
  });
});

describe("Test for Higest Likes", () => {
  test("Higest Likes object", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[3]);
  });
});

describe("Test for Most Blogs", () => {
  test("Higest Blogs object", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result.author).toBe('Edsger W. Dijkstra');
  });
});

describe("Test for Most Likes", () => {
  test("Higest likes for author", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result.author).toBe('Edsger W. Dijkstra');
  });
});
