const router = require("express").Router();
const User = require("../models/User.model");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const Rutina = require("../models/Rutina.model");
const Workout = require("../models/Workout.model");

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
  const loggedUser = req.session.user
  Rutina.findById(rutinaId)
    .populate("workout")
    .then((rutina)=>{
        res.render("rutinas/detail", {rutina,workout:rutina.workout,loggedUser});
    })
    .catch((err)=>{
        next(err)
    })
    .catch((err) => {
      next(err);
    });
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
    const {idWorkout,idRutina} = req.params
    Workout.findByIdAndUpdate(idWorkout,{
        time,
        repetition,
        weight,

    },{new:true})
    .then((workout)=>{
        console.log(workout)
        workout.save()
        res.redirect(`/rutina/${idRutina}`)
    })
    .catch((err)=>{
      next(err)
    })
})

router.post("/done/:idWorkout/:idRutina", (req,res,next)=>{ 
  const {done} = req.body
  const {idWorkout,idRutina} = req.params
  Workout.findByIdAndUpdate(idWorkout,
    {done:true},{new:true})
    .then((workout)=>{
      workout.save()
      console.log(workout)
      res.redirect(`/rutina/${idRutina}`)
    })
    .catch((err)=>{
      next(err)
    })
})

router.post("/rutina/:rutinaId/delete", (req, res, next) => {
  const loggedUser = req.session.user;
  const { rutinaId } = req.params;
  User.findOne({ username: loggedUser.username }).then((dbUser) => {
    Rutina.findByIdAndDelete(rutinaId)
      .then((response) => {
        dbUser.rutinas.pop(response);
        dbUser.save();
        res.redirect("/profile");
      })
      .catch((error) => next(error));
  });
});

router.get("/rutina/:rutinaId/edit", (req, res, next) => {
  const { rutinaId } = req.params;
  const loggedUser = req.session.user;
  Rutina.findById(rutinaId)
    .then((rutina) => {
      res.render("rutinas/editName", { loggedUser, rutina });
    })
    .catch((error) => next(error));
});

router.post("/rutina/:rutinaId/edit", (req, res, next) => {
  const { rutinaId } = req.params;
  const loggedUser = req.session.user;
  const { newName } = req.body;
  console.log("nuevo nombre", newName);

  Rutina.findByIdAndUpdate(rutinaId, { name: newName }, { new: true })
    .then((routine) => {
      routine.save();
      res.redirect("/profile");
    })
    .catch((error) => next(error));
});

router.post("/stop/:rutinaId", (req,res,next)=>{
  const {rutinaId} = req.params
  Rutina.findByIdAndUpdate(rutinaId,
    {started:false},{new:true})
  .then((rutina)=>{
    rutina.save()
    res.redirect(`/rutina/${rutinaId}`)
  })  
  .catch((err)=>{
    next(err)
  })
})

router.post("/start/:rutinaId", (req,res,next)=>{
  const {rutinaId} = req.params
  Rutina.findByIdAndUpdate(rutinaId,
    {started:true},{new:true})
  .then((rutina)=>{
    rutina.save()
    res.redirect(`/rutina/${rutinaId}`)
  })  
  .catch((err)=>{
    next(err)
  })
})

module.exports = router;
