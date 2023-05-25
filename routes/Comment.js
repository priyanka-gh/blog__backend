const express = require("express");
const router = express.Router();

const { getUserById, getBlogById } = require("../controllers/Blog");
const {
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByBlog,
} = require("../controllers/Comment");
const { isSignedIn, isAuthenticated } = require("../controllers/User");

router.param("blogID", getBlogById);
router.param("userID", getUserById);
router.param("commentID", getCommentById);

router.post("/comment/:userID/:blogID", isSignedIn, createComment);
router.put("/comment/:commentID", isSignedIn, isAuthenticated, updateComment);
router.delete(
  "/comment/:userID/:commentID",
  isSignedIn,
  isAuthenticated,
  deleteComment
);
router.get("/comments/:blogID", getCommentsByBlog);

module.exports = router;
