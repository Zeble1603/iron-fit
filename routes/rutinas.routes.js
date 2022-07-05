const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
<<<<<<< HEAD
const Rutina = require("../models/Rutina.model");
=======
const Rutina = require("../models/Rutina.model"); 
const { response } = require("../app");
>>>>>>> ab3c6524bcbfddc7a92bf41108cdf4b4040a5bbc

router.post("/new-rutina", (req, res, next) => {
  debugger;
  const { rutinaName } = req.body;
  const loggedUser = req.session.user;
  Rutina.create({
    name: rutinaName,
  })
    .then((newRutina) => {
      loggedUser.rutinas.push(newRutina);
      res.redirect(`/profile`);
    })
    .catch((err) => {
      next(err);
    });
});

<<<<<<< HEAD
router.get("/rutina/:rutinaId", (req, res) => {
  res.render("rutinas/detail");
});
=======
router.get("/rutina/:rutinaId", (req, res, next) => {
    const {rutinaId} = req.params
    Rutina.findById(rutinaId)
    .then((rutina)=>{
        res.render("rutinas/detail", {rutina,workout:rutina.workout});
    })
    .catch((err)=>{
        next(err)
    })
  });
  
>>>>>>> ab3c6524bcbfddc7a92bf41108cdf4b4040a5bbc

module.exports = router;
