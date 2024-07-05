const express = require("express");
const cors = require("cors");
const app = express();
const posts = require("./posts");

app.use(cors());
app.use(express.json());

//middleware to add delay
app.use((_req, _res, next) => {
  setTimeout(next, 1000);
});

app.get("/posts", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const postsWithoutComments = posts.map(({ comments, ...post }) => {
    const words = post.description.split(" ");
    if (words.length > 10) {
      post.description = words.slice(0, 10).join(" ") + "...";
    }
    return post;
  });

  const paginatedPosts = postsWithoutComments.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  res.json(paginatedPosts);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id == id);

  res.json(post);
});

app.post("/posts", (req, res) => {
  const post = req.body;

  post.id = posts.length + 1;
  posts.push(post);

  res.json(post);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id == id);
  const comment = req.body;

  post.comments = [comment, ...post.comments];

  res.json(comment);
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id == id);

  post.title = req.body.title;
  post.content = req.body.content;

  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  posts = posts.filter((post) => post.id != id);

  res.json(posts);
});

app.put("/posts/:id/like", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id == id);

  post.likes++;

  res.json(post);
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3001");
});
