const mongoose = require("mongoose");

//models
const Blog = require("../models/blogModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

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
    //saving the blog info to the user
    await User.findByIdAndUpdate(blogOwner, { $push: { blogs: blog._id } });

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
  const blog = await Blog.findById(id).populate("reviews");
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
  const blog = await Blog.findById(id).populate("reviews");
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  //checking if the blog owner same as the current user
  if (!blog.blogOwner.equals(req.user._id)) {
    return res
      .status(403)
      .json({ msg: "You are not authorized to delete this blog" });
  }

  try {
    // Delete all reviews related to the blog
    await Review.deleteMany({ _id: { $in: blog.reviews } });

    //remove the blog info from the user
    await User.findByIdAndUpdate(blog.blogOwner, {
      $pull: { blogs: blog._id },
    });

    await Blog.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Blog and its reviews deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
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

//add review
module.exports.addReview = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const author = req.user.name;
  const reviewOwner = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  try {
    const newReview = await Review.create({
      body,
      reviewOwner,
      author,
      blogInfo: blog.id,
    });
    blog.reviews.push(newReview._id);
    await blog.save();

    //saving the review info to the user
    await User.findByIdAndUpdate(reviewOwner, {
      $push: { reviews: newReview._id },
    });

    res.status(200).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete review
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id).populate("reviews");
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(404).json({ msg: "Review not found" });
  }
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ msg: "Review not found" });
  }

  //checking if the review owner same as the current user
  if (!review.reviewOwner.equals(req.user._id)) {
    return res
      .status(403)
      .json({ msg: "You are not authorized to delete this review" });
  }

  try {
    //filter out the review from the blog
    blog.reviews.filter((review) => review._id.toString() !== reviewId);
    await blog.save();

    //remove the review info from the user
    await User.findByIdAndUpdate(review.reviewOwner, {
      $pull: { reviews: review._id },
    });
    //deleting the review
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "review deleted successfully" });
  } catch (error) {
    res.status(403).json({ msg: error.message });
  }
};

//like the review in the blog
module.exports.likeReview = async (req, res) => {
  const { id, reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id).populate("reviews");
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(404).json({ msg: "Review not found" });
  }
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ msg: "Review not found" });
  }

  //Remove user from dislikes if they had previously disliked
  if (review.reviewDislikes.includes(req.user._id)) {
    review.reviewDislikes.pull(req.user._id);
  }

  //toggle the likes
  if (review.reviewLikes.includes(req.user._id)) {
    review.reviewLikes.pull(req.user._id);
  } else {
    review.reviewLikes.push(req.user._id);
  }

  await review.save();
  await blog.save();
  res.status(200).json(review);
};

//dislike the review in the blog
module.exports.dislikeReview = async (req, res) => {
  const { id, reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  const blog = await Blog.findById(id).populate("reviews");
  if (!blog) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(404).json({ msg: "Review not found" });
  }
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ msg: "Review not found" });
  }

  //Remove user from likes if they had previously liked
  if (review.reviewLikes.includes(req.user._id)) {
    review.reviewLikes.pull(req.user._id);
  }
  //toggle the dislike
  if (review.reviewDislikes.includes(req.user._id)) {
    review.reviewDislikes.pull(req.user._id);
  } else {
    review.reviewDislikes.push(req.user._id);
  }

  await review.save();
  await blog.save();
  res.status(200).json(review);
};

//view single review
module.exports.getReview = async (req, res) => {
  const { id, reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(404).json({ msg: "Review not found" });
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ msg: "Review not found" });
  }

  res.status(200).json(review);
};
