const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    blogOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blogLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blogDislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
