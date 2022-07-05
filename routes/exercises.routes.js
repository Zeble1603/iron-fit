const router = require("express").Router();
const authRoutes = require("./auth.routes");
const ApiService = require("../services/api.service");
const myApiService = new ApiService()
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/exercises", (req,res,next)=>{
    myApiService.getAllExercices()
    .then((exercisesList)=>{
        console.log(exercisesList)
        res.render('exercises/exercises', 
        {exercisesList:exercisesList.data})
    })
    /*.then((allBodyParts)=>{ 
        myApiService.getTargetMuscles()
    })
    .then((targetMuscles)=>{
        res.render('/exercices/exercices', 
        {exercicesList,allBodyParts,targetMuscles})
    })*/
    .catch((err)=>{
        next(err)
    })
})

router.get("/exercises/exercise-detail/:id", (req, res, next) => {
    const {id} = req.params
    console.log(id)
    myApiService.getExerciceById(id)
    .then((exercice)=>{
        res.render("exercises/exercise-detail", { exercice });
    })
    .catch((err)=>{
        next(err)
    })
  });
  

module.exports = router;

