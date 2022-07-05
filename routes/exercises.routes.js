const router = require("express").Router();
const authRoutes = require("./auth.routes");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/exercises", (req, res, next) => {
  myApiService
    .getAllExercices()
    .then((exercisesList) => {
      res.render("exercises/exercises", { exercisesList: exercisesList.data });
    })
    /*.then((allBodyParts)=>{ 
        myApiService.getTargetMuscles()
    })
    .then((targetMuscles)=>{
        res.render('/exercices/exercices', 
        {exercicesList,allBodyParts,targetMuscles})
    })*/
    .catch((err) => {
      next(err);
    });
});

router.get("/exercises/exercise-detail/:id", (req, res, next) => {
  const { id } = req.params;
  myApiService
    .getExerciceById(id)
    .then((exercise) => {
      res.render("exercises/exercise-detail", { exercise: exercise.data });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
