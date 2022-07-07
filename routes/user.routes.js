const router = require("express").Router();

const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", isLoggedIn, (req, res) => {
  const loggedUser = req.session.user;
  const capitalized = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  const usernameCapitalized = capitalized(loggedUser.username);
  User.findOne({ username: loggedUser.username })
    .populate("rutinas")
    .populate("rutinasRealizadas")
    .then((dbUser) => {
      console.log("mi usuario", dbUser);
      res.render("user/profile", {
        usernameCapitalized,
        rutinas: dbUser.rutinas,
        doneRutinas: dbUser.rutinasRealizadas,
        loggedUser,
      });
    });
});

module.exports = router;
