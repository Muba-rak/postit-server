const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please enter a title"],
      unique: true,
    },
    tags: {
      type: String,
      required: true,
      enum: ["Technology", "Nature", "Lifestyle"],
    },
    description: {
      type: String,
      required: [true, "please enter a post description"],
    },
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
