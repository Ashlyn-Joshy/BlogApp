const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_secret, { expiresIn: "3d" });
};

module.exports.userLogin = async (req, res) => {
  res.status(200).json({ msg: "login page" });
};

module.exports.userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.Register(name, email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
