const Like = require("../models/Likes");

exports.getLikeById = (req, res, next, id) => {
  Like.findById(id).exec((err, like) => {
    if (err || !like) {
      return res.status(400).json({
        error: "No Like found in DB",
      });
    }
    req.like = like;
    next();
  });
};

exports.saveLike = (req, res) => {
  const userId = req.profile._id;
  const blogId = req.blog._id;

  Like.exists({ user: userId, blog: blogId }, (err, alreadyLiked) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to check if the blog is already liked",
      });
    }
    if (alreadyLiked) {
      return res.status(400).json({
        error: "Can't like the blog more than once",
      });
    }

    const like = new Like({ user: userId, blog: blogId });

    like.save((err, savedLike) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to save the like",
        });
      }
      return res.json(savedLike);
    });
  });
};

exports.deleteLike = (req, res) => {
  const like = req.like;

  like.remove((err, deletedLike) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the like",
      });
    }
    res.json({
      message: "Deletion was successful",
    });
  });
};

exports.totalLikes = (req, res) => {
  const blogId = req.blog._id;

  Like.countDocuments({ blog: blogId }, (err, count) => {
    if (err) {
      return res.json({
        success: false,
        error: err,
      });
    }
    return res.json(count);
  });
};

exports.getLikes = (req, res) => {
  const userId = req.profile._id;
  const blogId = req.blog._id;

  Like.find({ user: userId, blog: blogId }).exec((err, likes) => {
    if (err || !likes) {
      return res.json({
        success: false,
        error: err,
      });
    }
    return res.json(likes);
  });
};
