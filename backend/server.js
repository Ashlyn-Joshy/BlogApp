require("dotenv").config();
var express = require("express");
const mongoose = require("mongoose");
var app = express();

//connecting to the router
var blogRouter = require("./router/blogs");
var userRouter = require("./router/user");

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
app.use("/api/user", userRouter);

var port = process.env.PORT || 3000;
mongoose
  .connect(process.env.Mongodb_Database)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => console.error(err.message));
