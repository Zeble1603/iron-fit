const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const Rutina = require("../models/Rutina.model");

<<<<<<< HEAD
router.post("/new-rutina", (req, res, next) => {
  const { rutinaName } = req.body;
  const loggedUser = req.session.user;
  User.findOne({ username: loggedUser.username })
    .then((dbUser) => {
      console.log(dbUser);
      Rutina.create({
        name: rutinaName,
      }).then((newRutina) => {
        dbUser.rutinas.push(newRutina);
        console.log("User.rutinas", dbUser.rutinas);
        dbUser.save();
        res.redirect(`/profile`);
      });
=======
router.post('/new-rutina', (req,res,next)=>{
    const {rutinaName} = req.body
    const loggedUser = req.session.user
    User.findOne({username:loggedUser.username})
    .then((dbUser)=>{
        Rutina.create({
            name:rutinaName,
        })
        .then((newRutina)=>{
            dbUser.rutinas.push(newRutina)
            dbUser.save()
            res.redirect(`/profile`)
        })
>>>>>>> 87bf45ab06ddc17c391f61e75a46c23b4c8d2889
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

module.exports = router;
