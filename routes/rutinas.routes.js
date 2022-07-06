const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
<<<<<<< HEAD
const Rutina = require("../models/Rutina.model"); 
const Workout = require("../models/Workout.model")
=======
const Rutina = require("../models/Rutina.model");
>>>>>>> 8885992bcff3615c3eee112d35c72f483b258457

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
<<<<<<< HEAD
    const {rutinaId} = req.params
    Rutina.findById(rutinaId)
    .populate("workout")
    .then((rutina)=>{
        console.log(rutina)
        res.render("rutinas/detail", {rutina,workout:rutina.workout});
    })
    .catch((err)=>{
        next(err)
=======
  const { rutinaId } = req.params;
  Rutina.findById(rutinaId)
    .then((rutina) => {
      res.render("rutinas/detail", { rutina, workout: rutina.workout });
>>>>>>> 8885992bcff3615c3eee112d35c72f483b258457
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
<<<<<<< HEAD

router.post("/add/:idExercise/:idRutina",(req,res,next)=>{
    const {idExercise,idRutina} = req.params
    Rutina.findById(idRutina)
    .then((rutina)=>{
        myApiService.getExerciseById(idExercise)
        .then((exercise)=>{
            console.log(exercise)
            let type = exercise.data.bodyPart
            let name = exercise.data.name
            Workout.create({
                name:name,
                type:type,
            })
            .then((workout)=>{
                rutina.workout.push(workout)
                rutina.save()
                res.redirect(`/rutina/${rutina._id}`)
            })
        })
    })
    .catch((err)=>{
        next(err)
    })
    /*promesse -> exercice

    on récupère le nom et le target de l'exercice
    on créer un workout à partir du schema
    si le target est cardio, on set le cardio à true
    promesse -> workout
    on cherche la rutina par son id
    promesse -> rutina 
    on push la workout dans la liste des workout de rutina
    
    */
})  
=======
});
>>>>>>> 8885992bcff3615c3eee112d35c72f483b258457

module.exports = router;
