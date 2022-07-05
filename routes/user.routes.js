const router = require("express").Router();

const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", isLoggedIn, (req, res) => {
  const loggedUser = req.session.user;
  User.findOne({username:loggedUser.username})
  .populate("rutinas")
  .then((dbUser)=>{
    res.render("user/profile", { loggedUser, rutinas:dbUser.rutinas });
  })
});

router.get("/exercise-detail", isLoggedIn, (req, res) => {
  res.render("exercices/exercise-detail");
});

module.exports = router;
