const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  blog: {
    type: ObjectId,
    required: true,
    ref: "Blog",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userName: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
