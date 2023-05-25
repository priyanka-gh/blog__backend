const express = require("express");
const User = require("../models/User");
const Blog = require("../models/Blog");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user for was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getBlogById = (req, res, next, id) => {
  Blog.findById(id)
    .populate("author", "_id name")
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: "No blog found in DB",
        });
      }
      req.blog = blog;
      next();
    });
};

exports.createNewBlog = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    //destructure the fields
    const { content, author } = fields;

    if (!content || !author) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let blog = new Blog(fields);

    //handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      blog.photo.data = fs.readFileSync(file.photo.path);
      blog.photo.contentType = file.photo.type;
    }

    blog.save((err, blog) => {
      if (err) {
        res.status(400).json({
          error: "Saving blog in DB failed",
        });
        console.log(err);
      }
      res.json(blog);
    });
  });
};

exports.getBlog = (req, res) => {
  return res.json(req.blog);
};

exports.getAllBlogsByUser = (req, res) => {
  id = req.profile._id;
  Blog.find({ author: id })
    .populate("author", "_id name")
    .exec((err, blogs) => {
      if (err || !blogs) {
        return res.json({
          success: false,
          error: err,
        });
      }
      return res.json(blogs);
    });
};

exports.deleteBlog = (req, res) => {
  let blog = req.blog;
  blog.remove((err, deletedBlog) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the blog",
      });
    }
    res.json({
      message: "Deletion was a success",
    });
  });
};

exports.updateBlog = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    let blog = req.blog;
    blog = _.extend(blog, fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      blog.photo.data = fs.readFileSync(file.photo.path);
      blog.photo.contentType = file.photo.type;
    }

    blog.save((err, blog) => {
      if (err) {
        res.status(400).json({
          error: "Updation failed",
        });
      }
      res.json(blog);
    });
  });
};

exports.getAllBlogs = (req, res) => {
  Blog.find()
    .populate("author", "_id name")
    .exec((err, blog) => {
      if (err) {
        return res.status(400).json({
          error: "No blogs found in DB",
        });
      }
      return res.json(blog);
    });
};

exports.photo = (req, res, next) => {
  if (req.blog.photo.data) {
    res.set("Content-Type", req.blog.photo.contentType);
    return res.send(req.blog.photo.data);
  }
  next();
};
