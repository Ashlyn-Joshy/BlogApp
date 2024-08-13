var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

//models
const Blog = require("../models/blogModel");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, author, body } = req.body;
  try {
    const blog = await Blog.create({ title, author, body });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  res.status(200).json(blog);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!blog) {
    return res.status(400).json({ msg: "Blog not found" });
  }
  res.status(200).json(blog);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findOneAndDelete({ _id: id });
  if (!blog) {
    return res.status(400).json({ msg: "Blog not found" });
  }
  res.status(200).json({ message: "Blog deleted successfully" });
});

module.exports = router;
