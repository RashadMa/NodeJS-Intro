const express = require("express");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const products = require("./data/products");
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.send("WEB API HOME PAGE!!");
});
app.get("/api/products", function (req, res) {
  res.json(products);
});
app.get("/api/products/:id", function (req, res) {
  let id = req.params.id;

  let product = products.find((q) => q.id == id);

  if (product) res.json(product);
  else res.status(404).json({ message: "Not found!" });
});
app.delete("/api/products/:id", function (req, res) {
  let id = req.params.id;
  products = products.filter((q) => q.id != id);

  res.send("SUCCESS!!");
});
app.post("/api/products", function (req, res) {
  console.log("BODY", req.files);
  let name = req.body.name;
  let description = req.body.description;
  let newProduct = {
    id: Math.floor(Math.random() * 999999),
    name: name,
    description: description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.put("/api/products/:id", function (req, res) {
  let id = req.params.id;

  let product = products.find((q) => q.id == id);

  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    res.json(product);
  } else {
    res.status(404).json({ message: "Not found!" });
  }
});

app.listen(8080);
