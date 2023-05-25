const express = require("express");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/User");
const { check } = require("express-validator");

router.post("/signup", signup);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password Required"),
  ],
  signin
);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  res.json(req.auth);
});
module.exports = router;
