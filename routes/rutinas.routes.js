const router = require("express").Router();
const User = require("../models/User.model");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const Rutina = require("../models/Rutina.model");
const Workout = require("../models/Workout.model");

//GET ROUTES

router.get("/rutina/:rutinaId/edit", (req, res, next) => {
  const { rutinaId } = req.params;
  const loggedUser = req.session.user;
  const capitalized = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  const usernameCapitalized = capitalized(loggedUser.username);
  Rutina.findById(rutinaId)
    .then((rutina) => {
      res.render("rutinas/editName", {
        usernameCapitalized,
        loggedUser,
        rutina,
      });
    })
    .catch((error) => next(error));
});

router.get("/rutina/:rutinaId", (req, res, next) => {
  const { rutinaId } = req.params;
  const loggedUser = req.session.user;
  const capitalized = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  const usernameCapitalized = capitalized(loggedUser.username);
  Rutina.findById(rutinaId)
  .populate("workout")
    .then((rutina) => {
      if(rutina.done){
        const day = rutina.createdAt.getDate()
        const month = rutina.createdAt.getMonth()+1
        const year = rutina.createdAt.getFullYear()
        const date = `${day} / ${month} / ${year} `
        console.log(date)
        console.log(month)

        res.render("rutinas/detail", {
          usernameCapitalized,
          rutina,
          loggedUser,
          workout:rutina.workout,
          date:date,
        })
      }else{
        res.render("rutinas/detail", {
          usernameCapitalized,
          rutina,
          loggedUser,
          workout:rutina.workout,
        });
      }
      
    })
    .catch((err) => {
      next(err);
    });
});

//POST ROUTES
router.post("/new-rutina", (req, res, next) => {
  const { rutinaName } = req.body;
  const loggedUser = req.session.user;
  User.findOne({ username: loggedUser.username })
    .then((dbUser) => {
      Rutina.create({
        name: rutinaName,
        done:false,
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

router.post("/add/:idExercise/:idRutina", (req, res, next) => {
  const { idExercise, idRutina } = req.params;
  Rutina.findById(idRutina)
    .then((rutina) => {
      myApiService.getExerciseById(idExercise).then((exercise) => {
        let type = exercise.data.bodyPart;
        let name = exercise.data.name;
        let equipment = exercise.data.equipment;
        let gifUrl = exercise.data.gifUrl;
        let target = exercise.data.target;
        Workout.create({
          name: name,
          type: type,
          equipment: equipment,
          target: target,
          gifUrl: gifUrl,
        }).then((workout) => {
          if (workout.type === "cardio") {
            workout.needtime = true;
          } else {
            workout.needtime = false;
          }
          workout.save();
          rutina.workout.push(workout);
          rutina.save();
          res.redirect(`/rutina/${rutina._id}`);
        });
      });
    })
    .catch((err) => {
      next(err);
    });
});
router.post("/delete/:idWorkout/:idRutina", (req, res, next) => {
  const { idWorkout, idRutina } = req.params;
  Workout.findByIdAndDelete(idWorkout)
    .then((promise) => {
      res.redirect(`/rutina/${idRutina}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/edit/:idWorkout/:idRutina", (req, res, next) => {
  const { time, repetition, weight } = req.body;
  const { idWorkout, idRutina } = req.params;
  Workout.findByIdAndUpdate(
    idWorkout,
    {
      time,
      repetition,
      weight,
    },
    { new: true }
  )
    .then((workout) => {
      console.log(workout);
      workout.save();
      res.redirect(`/rutina/${idRutina}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/done/:idWorkout/:idRutina", (req, res, next) => {
  const { done } = req.body;
  const { idWorkout, idRutina } = req.params;
  Workout.findByIdAndUpdate(idWorkout, { done: true }, { new: true })
    .then((workout) => {
      workout.save();
      res.redirect(`/rutina/${idRutina}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/rutina/:rutinaId/delete", (req, res, next) => {
  const loggedUser = req.session.user;
  const { rutinaId } = req.params;
  Rutina.findByIdAndDelete(rutinaId)
    .then((response) => {
      res.redirect("/profile");
    })
    .catch((err) => {
      next(err);
    });
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
  const {counter} = req.body
  const {rutinaId} = req.params
  const sessionUser = req.session.user

  Rutina.findByIdAndUpdate(rutinaId,
    {started:false,timer:counter},{new:true})
  .then((motherRutina)=>{
    motherRutina.save()
    Rutina.create({
      name:motherRutina.name,
      timer:motherRutina.timer,
      done:true,
      started:false,
      workout: motherRutina.workout
    })
    .then((rutinaDone)=>{
      User.findOne({username:sessionUser.username})
      .then((dbUser)=>{
        dbUser.rutinasRealizadas.push(rutinaDone)
        dbUser.save()
        console.log(dbUser)
        res.redirect(`/rutina/${rutinaDone._id}`)
      })  
    })
  })  
  .catch((err)=>{
    next(err)
  })
})

router.post("/start/:rutinaId", (req, res, next) => {
  const { rutinaId } = req.params;
  Rutina.findByIdAndUpdate(rutinaId, { started: true }, { new: true })
    .then((rutina) => {
      rutina.save();
      res.redirect(`/rutina/${rutinaId}`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
