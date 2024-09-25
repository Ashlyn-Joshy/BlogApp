const { default: mongoose } = require("mongoose");
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

//information about the user
module.exports.userInfo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "User not found" });
  }
  const user = await User.findById(id).populate("blogs").populate("reviews");
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json(user);
};
