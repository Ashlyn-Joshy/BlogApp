const mongoose = require("mongoose");

//models
const Blog = require("../models/blogModel");

//get all blogs
module.exports.allBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//new blog
module.exports.newBlog = async (req, res) => {
  const { title, author, body } = req.body;
  try {
    const blog = await Blog.create({ title, author, body });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//get single blog
module.exports.singleBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  res.status(200).json(blog);
};

//update blog
module.exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!blog) {
    return res.status(400).json({ msg: "Blog not found" });
  }
  res.status(200).json(blog);
};

//delete blog
module.exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findOneAndDelete({ _id: id });
  if (!blog) {
    return res.status(400).json({ msg: "Blog not found" });
  }
  res.status(200).json({ message: "Blog deleted successfully" });
};
