const fs = require("fs");
fs.readFile("academy.txt", "utf8", function (err, data) {
  console.log("DATA ", data);
});
let file = fs.readFileSync("academy.txt", "utf8");
console.log("Data", file);
