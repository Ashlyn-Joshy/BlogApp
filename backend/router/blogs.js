var express = require("express");
var router = express.Router();

//controller
const blogController = require("../controllers/blogController");

//middleware
const requireAuth = require("../middleware/requireAuth");

router.get("/", blogController.allBlog);
router.get("/:id", blogController.singleBlog);

//authentication is needed
router.use(requireAuth);

router.post("/", blogController.newBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

//like and dislike functionality
router.put("/:id/like", blogController.likeBlog);
router.put("/:id/dislike", blogController.dislikeBlog);

module.exports = router;
