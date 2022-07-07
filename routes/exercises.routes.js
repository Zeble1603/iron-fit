const router = require("express").Router();
const authRoutes = require("./auth.routes");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Rutina = require("../models/Rutina.model");
const Workout = require("../models/Workout.model");

router.get("/exercises", (req, res, next) => {
  let loggedUser;
  let usernameCapitalized;
  const capitalized = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  if (req.session.user) {
    loggedUser = req.session.user;
    usernameCapitalized = capitalized(loggedUser.username);
  }
  myApiService
    .getAllBodyParts()
    .then((allBodyParts) => {
      myApiService.getTargetMuscles().then((allTargetMuscles) => {
        myApiService.getEquipment().then((allEquipments) => {
          myApiService.getAllExercises().then((exercisesList) => {
            console.log(allBodyParts.data);
            res.render("exercises/exercises", {
              exercisesList: exercisesList.data,
              allBodyParts: allBodyParts.data,
              allTargetMuscles: allTargetMuscles.data,
              allEquipments: allEquipments.data,
              usernameCapitalized,
              loggedUser,
            });
          });
        });
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/exercises/:rutinaId", (req, res, next) => {
  const loggedUser = req.session.user
  const { rutinaId } = req.params;
  const capitalized = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  console.log(loggedUser.username);
  const usernameCapitalized = capitalized(loggedUser.username);
  console.log(usernameCapitalized);
  myApiService.getAllBodyParts().then((allBodyParts) => {
    myApiService.getTargetMuscles().then((allTargetMuscles) => {
      myApiService.getEquipment().then((allEquipments) => {
        myApiService.getAllExercises().then((exercisesList) => {
          res.render("exercises/exercises", {
            exercisesList: exercisesList.data,
            allBodyParts: allBodyParts.data,
            allTargetMuscles: allTargetMuscles.data,
            allEquipments: allEquipments.data,
            rutinaId: rutinaId,
            usernameCapitalized,
            loggedUser,
          });
        });
      });
    });
  });
});

router.get("/exercises/exercise-detail/:id", (req, res, next) => {
  const { id } = req.params;
  const loggedUser = req.session.user;
  const capitalized = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  const usernameCapitalized = capitalized(loggedUser.username);
  myApiService
    .getExerciseById(id)
    .then((exercise) => {
      res.render("exercises/exercise-detail", {
        usernameCapitalized,
        exercise: exercise.data,
        loggedUser,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/addtorutina/:id", (req,res,next)=>{
  const { id } = req.params;
  const loggedUser = req.session.user;
  const capitalized = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  const usernameCapitalized = capitalized(loggedUser.username);
  User.findOne({username:loggedUser.username})
  .populate("rutinas")
  .then((user)=>{
    res.render("exercises/form", {
      usernameCapitalized,
      idExercise: id,
      loggedUser,
      rutinas:user.rutinas
    })
  })
  .catch((err)=>{
    next(err)
  })  
})

router.post("/addtorutina/:idExercise", (req,res,next)=>{
  const {idExercise} = req.params
  const {selectRutina} = req.body
  Rutina.findById(selectRutina)
  .then((rutina)=>{
    myApiService.getExerciseById(idExercise)
    .then((exercise)=>{
      let type = exercise.data.bodyPart
      let name = exercise.data.name
      let equipment = exercise.data.equipment
      let gifUrl = exercise.data.gifUrl
      let target = exercise.data.target
      Workout.create({
        name:name,
        type:type,
        equipment:equipment,
        target:target,
        gifUrl:gifUrl,
      })
      .then((workout)=>{
        if(workout.type === "cardio"){
          workout.needtime = true
        }else{
            workout.needtime = false
        }
        workout.save()
        rutina.workout.push(workout)
        rutina.save()
        res.redirect(`/rutina/${selectRutina}`)
      })
    })
  })
  .catch((err)=>{
    next(err)
  })
})


module.exports = router;
