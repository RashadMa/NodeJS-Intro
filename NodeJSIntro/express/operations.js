//#region Requires

const express = require("express");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const posts = require("../data/posts");
const comments = require("../data/comments");
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//#endregion

//#region Home Page

app.get("/", function (res) {
  res.send("Welcome");
});

//#endregion

//#region Get Posts By Id

app.get("/api/posts/:id", function (req, res) {
  let id = req.params.id;
  let post = posts.find((item) => item.id == id);
  if (post) res.json(post);
  else res.status(404).json({ message: "Not found" });
});

//#endregion

//#region Get Comments By Post Id

app.get("/api/posts/:id/comments", function (req, res) {
  let id = req.params.id;
  let comment = comments.filter((item) => item.postId == id);
  if (comment) res.json(comment);
  else res.status(404).json({ message: "Not found" });
});

//#endregion

//#region Get All Posts

app.get("/api/posts", function (res) {
  res.json(posts);
});

//#endregion

//#region Delete Post

app.delete("/api/posts/:id", function (req, res) {
  let id = req.params.id;
  posts = posts.filter((item) => item.id != id);
  res.send("Deleted");
});

//#endregion

//#region Create Post

app.post("/api/posts", function (req, res) {
  console.log("BODY", req.files);
  let title = req.body.title;
  let likeCount = req.body.likeCount;
  let newData = {
    id: Math.floor(Math.random() * 999999),
    title: title,
    likeCount: likeCount,
  };
  posts.push(newData);
  res.status(201).json(newData);
});

//#endregion

//#region Update Post

app.put("/api/posts/:id", function (req, res) {
  let id = req.params.id;
  let post = posts.find((q) => q.id == id);
  if (post) {
    post.title = req.body.title;
    post.likeCount = req.body.likeCount;
    res.json(post);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

//#endregion

app.get("api/comments?username=:username", (req, res) => {
  let username = req.params.username;
  let dataToReturn = comments.find((p) => p.username == username);
  if (dataToReturn) {
    res.json(dataToReturn);
  } else {
    res.status(404).json({ messagge: `Cannot find post with id ${id}` });
  }
});

app.listen(8080);
