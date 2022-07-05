const router = require("express").Router();
const authRoutes = require("./auth.routes");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/exercises", (req, res, next) => {
  myApiService
    .getAllBodyParts()
    .then((allBodyParts) => {
      myApiService.getTargetMuscles().then((allTargetMuscles) => {
        myApiService.getEquipment().then((allEquipments)=>{
            myApiService.getAllExercises().then((exercisesList) => {
                console.log(allBodyParts.data)
                res.render("exercises/exercises", {
                  exercisesList: exercisesList.data,
                  allBodyParts: allBodyParts.data,
                  allTargetMuscles: allTargetMuscles.data,
                  allEquipments : allEquipments.data,
                });
              })
        })
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/exercises/exercise-detail/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  myApiService
    .getExerciseById(id)
    .then((exercise) => {
      console.log(exercise.data);
      res.render("exercises/exercise-detail", { exercise: exercise.data });
    })
    .catch((err) => {
      next(err);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
