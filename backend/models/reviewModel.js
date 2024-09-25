const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    reviewOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reviewDislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
