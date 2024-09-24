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
  const { title, body } = req.body;
  const author = req.user.name;
  const blogOwner = req.user._id;

  try {
    const blog = await Blog.create({ title, author, body, blogOwner });
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

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  //checking if the blog owner same as the current user
  if (!blog.blogOwner.equals(req.user._id)) {
    return res
      .status(403)
      .json({ msg: "You are not authorized to update this blog" });
  }

  const update = { ...req.body };
  delete update.author; //not able to update author data

  const blogUpdate = await Blog.findOneAndUpdate({ _id: id }, update);
  res.status(200).json(blogUpdate);
};

//delete blog
module.exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  //checking if the blog owner same as the current user
  if (!blog.blogOwner.equals(req.user._id)) {
    return res
      .status(403)
      .json({ msg: "You are not authorized to delete this blog" });
  }

  await Blog.findOneAndDelete({ _id: id });
  res.status(200).json({ message: "Blog deleted successfully" });
};

//like the blog
module.exports.likeBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  //Remove user from dislikes if they had previously disliked
  if (blog.blogDislikes.includes(req.user._id)) {
    blog.blogDislikes.pull(req.user._id);
  }

  //toggle the likes
  if (blog.blogLikes.includes(req.user._id)) {
    blog.blogLikes.pull(req.user._id);
  } else {
    blog.blogLikes.push(req.user._id);
  }
  await blog.save();
  res.status(200).json(blog);
};

module.exports.dislikeBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  //Remove user from likes if they had previously liked
  if (blog.blogLikes.includes(req.user._id)) {
    blog.blogLikes.pull(req.user._id);
  }
  //toggle the dislike
  if (blog.blogDislikes.includes(req.user._id)) {
    blog.blogDislikes.pull(req.user._id);
  } else {
    blog.blogDislikes.push(req.user._id);
  }

  await blog.save();
  res.status(200).json(blog);
};
