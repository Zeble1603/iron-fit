const router = require("express").Router();
const Rutina = require("../models/Rutina.model");
const Workout = require("../models/Workout.model");

router.get("/workout/:idWorkout/:idRutina", (req,res,next)=>{
    const { idWorkout,idRutina } = req.params;
    const loggedUser = req.session.user
    Rutina.findById(idRutina)
    .then((rutina)=>{
        Workout.findById(idWorkout)
        .then((workout)=>{
            res.render("workout/detail", {workout,loggedUser,rutina})
        })
    })
    .catch((err)=>{
        next(err)
    })
})

module.exports = router;
