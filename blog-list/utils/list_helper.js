const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const counter = 0;

  return blogs.length === 0 ? 0 : blogs.reduce((a, c) => a + c.likes, counter);
};

//defining this tests before push
const favoriteBlog = blogs => {
  const finder = blogs.reduce((a, c) => a.likes > c.likes ? a : c )
  return finder
}

const mostBlogs = blogs => {
  let blogCount = {};

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author;

    if (blogCount[author]) {
      blogCount[author]++;
    } else {
      blogCount[author] = 1;
    }
  }

  let maxAuthor = "";
  let maxBlogs = 0;

  for (let author in blogCount) {
    if (blogCount[author] > maxBlogs) {
      maxAuthor = author;
      maxBlogs = blogCount[author];
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs
  };
}

const mostLikes = blogs => {
  let likesCount = {};

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author
    let likes = blogs[i].likes;

    if (likesCount[author]) {
      likesCount[author] += likes;
    } else {
      likesCount[author] = likes;
    }
  }

  let maxAuthor = "";
  let maxlikes = 0;

  for (let author in likesCount) {
    if (likesCount[author] > maxlikes) {
      maxAuthor = author;
      maxlikes = likesCount[author];
    }
  }

  return {
    author: maxAuthor,
    blogs: maxlikes
  };
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
