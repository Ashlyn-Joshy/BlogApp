var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "all the blogs are available" });
});

router.post("/", (req, res) => {
  res.json({ msg: "new blog is created" });
});

router.get("/:id", (req, res) => {
  res.json({ msg: "single blog found" });
});

router.put("/:id", (req, res) => {
  res.json({ msg: "blog updated" });
});

router.delete("/:id", (req, res) => {
  res.json({ msg: "blog deleted" });
});

module.exports = router;
