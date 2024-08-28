var express = require("express");
var router = express.Router();

//controller
const blogController = require("../controllers/blogController");

//middleware
const requireAuth = require("../middleware/requireAuth");

router.get("/", blogController.allBlog);
//authentication is needed
router.use(requireAuth);

router.post("/", blogController.newBlog);
router.get("/:id", blogController.singleBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
