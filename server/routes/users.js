const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// Register user
router.post(
  "/register",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Get users (admin only)
router.get("/", [auth, admin], async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query;
    const limit = 10;
    const users = await User.find({
      $or: [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalUsers = await User.countDocuments({
      $or: [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    });

    const totalPages = Math.ceil(totalUsers / limit);

    res.json({ users, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete user (admin only)
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.send("User deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
