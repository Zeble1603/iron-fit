const router = require("express").Router();

const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", isLoggedIn, (req, res) => {
  const loggedUser = req.user;
  res.render("user/profile", { loggedUser, rutinas: loggedUser.rutinas });
});

router.get("/exercise-detail", isLoggedIn, (req, res) => {
  res.render("exercices/exercise-detail");
});

module.exports = router;
