const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  //verify that the user is authorized
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ error: "Authorization token is required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_secret);
    req.user = await User.findById({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid authorization token" });
  }
};

module.exports = requireAuth;
