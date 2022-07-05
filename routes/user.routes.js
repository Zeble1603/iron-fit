const router = require("express").Router();

const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", isLoggedIn, (req, res) => {
<<<<<<< HEAD
  const loggedUser = req.user;
  console.log(loggedUser);
  res.render("user/profile", { loggedUser, rutinas: loggedUser.rutinas });
=======
  const loggedUser = req.session.user;
  User.findOne({username:loggedUser.username})
  .populate("rutinas")
  .then((dbUser)=>{
    res.render("user/profile", { loggedUser, rutinas:dbUser.rutinas });
  })
>>>>>>> 87bf45ab06ddc17c391f61e75a46c23b4c8d2889
});

router.get("/exercise-detail", isLoggedIn, (req, res) => {
  res.render("exercices/exercise-detail");
});

module.exports = router;
