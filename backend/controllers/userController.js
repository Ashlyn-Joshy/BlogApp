const User = require("../models/userModel");

module.exports.userLogin = async (req, res) => {
  res.status(200).json({ msg: "login page" });
};

module.exports.userRegister = async (req, res) => {
  res.status(200).json({ msg: "register page" });
};
