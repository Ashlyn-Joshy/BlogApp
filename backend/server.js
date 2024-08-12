require("dotenv").config();
var express = require("express");
var app = express();

//middleware
app.use((req, res, next) => {
  console.log(req.method + ": " + req.path);
  next();
});

//routers
app.get("/", (req, res) => {
  res.json({ msg: "Hello world! welcome to the blog application!" });
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
