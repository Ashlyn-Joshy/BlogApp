const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_secret, { expiresIn: "3d" });
};

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ id: user._id, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.Register(name, email, password);
    const token = createToken(user._id);
    res.status(200).json({ id: user._id, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
