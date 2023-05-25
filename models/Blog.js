var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const blogSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      ref: "User",
      type: ObjectId,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
