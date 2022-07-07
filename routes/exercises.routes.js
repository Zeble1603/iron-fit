const router = require("express").Router();
const authRoutes = require("./auth.routes");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const isLoggedIn = require("../middleware/isLoggedIn");

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

module.exports = router;
