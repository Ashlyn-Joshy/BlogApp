require("dotenv").config();
var express = require("express");
var app = express();

//connecting to the router
var blogRouter = require("./router/blogs");

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method + ": " + req.path);
  next();
});

//routers
app.get("/", (req, res) => {
  res.json({ msg: "Hello world! welcome to the blog application!" });
});
app.use("/api/blog", blogRouter);

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
