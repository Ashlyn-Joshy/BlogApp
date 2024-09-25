var express = require("express");
var router = express.Router();

//controller
const blogController = require("../controllers/blogController");

//middleware
const requireAuth = require("../middleware/requireAuth");

router.get("/", blogController.allBlog);
router.get("/:id", blogController.singleBlog);
router.get("/:id/review/:reviewId", blogController.getReview);

//authentication is needed
router.use(requireAuth);

router.post("/", blogController.newBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

//like and dislike functionality
router.put("/:id/like", blogController.likeBlog);
router.put("/:id/dislike", blogController.dislikeBlog);

//review
router.post("/:id/review", blogController.addReview);
router.delete("/:id/review/:reviewId", blogController.deleteReview);
router.put("/:id/review/:reviewId/like", blogController.likeReview);
router.put("/:id/review/:reviewId/dislike", blogController.dislikeReview);

module.exports = router;
