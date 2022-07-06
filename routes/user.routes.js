const router = require("express").Router();

const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", isLoggedIn, (req, res) => {
  const loggedUser = req.session.user;
  console.log(loggedUser);
  User.findOne({ username: loggedUser.username })
    .populate("rutinas")
    .then((dbUser) => {
      console.log("mi usuario", dbUser);
      res.render("user/profile", { loggedUser, rutinas: dbUser.rutinas });
    });
});

module.exports = router;
