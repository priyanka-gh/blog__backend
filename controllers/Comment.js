const Comment = require("../models/Comment");

exports.getCommentById = (req, res, next, id) => {
  Comment.findById(id).exec((err, comment) => {
    if (err || !comment) {
      return res.status(400).json({
        error: "No Comment found in DB",
      });
    }
    req.comment = comment;
    next();
  });
};

exports.createComment = (req, res) => {
  const userId = req.profile._id;
  const name = req.profile.name;
  const blogId = req.blog._id;
  const { content } = req.body;
  const comment = new Comment({
    user: userId,
    userName: name,
    blog: blogId,
    content,
  });

  comment.save((err, savedComment) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Failed to save the comment",
      });
    }
    return res.json(savedComment);
  });
};

exports.updateComment = (req, res) => {
  const comment = req.comment;
  comment.content = req.body.content;

  comment.save((err, updatedComment) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update the comment",
      });
    }
    return res.json(updatedComment);
  });
};

exports.deleteComment = (req, res) => {
  const comment = req.comment;

  comment.remove((err, deletedComment) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the comment",
      });
    }
    res.json({
      message: "Deletion was successful",
    });
  });
};

exports.getCommentsByBlog = (req, res) => {
  const blogId = req.blog._id;

  Comment.find({ blog: blogId }).exec((err, comments) => {
    if (err || !comments) {
      return res.json({
        success: false,
        error: err,
      });
    }
    return res.json(comments);
  });
};
