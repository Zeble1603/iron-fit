const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const Rutina = require("../models/Rutina.model");

router.post("/new-rutina", (req, res, next) => {
  const { rutinaName } = req.body;
  const loggedUser = req.session.user;

  User.findOne({ username: loggedUser.username })
    .then((dbUser) => {
      Rutina.create({
        name: rutinaName,
      }).then((newRutina) => {
        dbUser.rutinas.push(newRutina);
        dbUser.save();
        res.redirect(`/profile`);
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/rutina/:rutinaId", (req, res, next) => {
  const { rutinaId } = req.params;
  Rutina.findById(rutinaId)
    .then((rutina) => {
      res.render("rutinas/detail", { rutina, workout: rutina.workout });
    })
    .catch((err) => {
      next(err);
    });
});
router.post("/rutina/:rutinaId/delete", (req, res, next) => {
  const loggedUser = req.session.user;
  const { rutinaId } = req.params;
  User.findOne({ username: loggedUser.username }).then((dbUser) => {
    console.log("mirespuesta", dbUser);
    Rutina.findByIdAndDelete(rutinaId)
      .then((response) => {
        dbUser.rutinas.pop(response);
        dbUser.save();
        res.redirect("/profile");
      })
      .catch((error) => next(error));
  });
});

module.exports = router;
