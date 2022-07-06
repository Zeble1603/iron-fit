const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const Rutina = require("../models/Rutina.model"); 
const Workout = require("../models/Workout.model")

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
    })
    .catch((err)=>{
        next(err)
    })
})

router.get("/rutina/:rutinaId", (req, res, next) => {
    const {rutinaId} = req.params
    Rutina.findById(rutinaId)
    .populate("workout")
    .then((rutina)=>{
        res.render("rutinas/detail", {rutina,workout:rutina.workout});
    })
    .catch((err)=>{
        next(err)
    })
  });

router.post("/add/:idExercise/:idRutina",(req,res,next)=>{
    const {idExercise,idRutina} = req.params
    Rutina.findById(idRutina)
    .then((rutina)=>{
        myApiService.getExerciseById(idExercise)
        .then((exercise)=>{
            let type = exercise.data.bodyPart
            let name = exercise.data.name
            Workout.create({
                name:name,
                type:type,
            })
            .then((workout)=>{
                if(workout.type === "cardio"){
                    workout.needtime = true
                }else{
                    workout.needtime = false
                }
                rutina.workout.push(workout)
                rutina.save()
                res.redirect(`/rutina/${rutina._id}`)
            })
        })
    })
    .catch((err)=>{
        next(err)
    })
})  

router.post("/delete/:idWorkout/:idRutina", (req,res,next)=>{
    const {idWorkout,idRutina} = req.params
    Workout.findByIdAndDelete(idWorkout)
    .then((promise)=>{
        res.redirect(`/rutina/${idRutina}`)
    })
    .catch((err)=>{
        next(err)
    })
})

router.post("/edit/:idWorkout/:idRutina",(req,res,next)=>{
    const {time,repetition,weight} = req.body
    console.log("repetition:",repetition)
    const {idWorkout,idRutina} = req.params
    Workout.findByIdAndUpdate(idWorkout,{
        time,
        repetition,
        weight
    },{new:true})
    .then((workout)=>{
        console.log(workout)
        workout.save()
        res.redirect(`/rutina/${idRutina}`)
    })
})

module.exports = router;