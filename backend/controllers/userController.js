const User = require("../models/userModel");

module.exports.userLogin = async (req, res) => {
  res.status(200).json({ msg: "login page" });
};

module.exports.userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.Register(name, email, password);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
