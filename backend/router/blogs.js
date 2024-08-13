var express = require("express");
var router = express.Router();

//controller
const blogController = require("../controllers/blogController");

router.get("/", blogController.allBlog);
router.post("/", blogController.newBlog);
router.get("/:id", blogController.singleBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
