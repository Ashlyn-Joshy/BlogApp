const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

//static register method
userSchema.statics.Register = async function (name, email, password) {
  //validation of email and password
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be strong");
  }

  const existing = await this.findOne({ email });
  if (existing) {
    throw new Error("Email already exists");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = await this.create({ name, email, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const existingUser = await this.findOne({ email });
  if (!existingUser) {
    throw new Error("Invalid email");
  }
  const isMatchPassword = await bcrypt.compare(password, existingUser.password);
  if (!isMatchPassword) {
    throw new Error("Invalid password");
  }
  return existingUser;
};

module.exports = mongoose.model("User", userSchema);
