const router = require("express").Router();
const authRoutes = require("./auth.routes");
const ApiService = require("../services/api.service");
const myApiService = new ApiService()

router.get("/exercices", (req,res,next)=>{
    myApiService.getAllExercices()
    .then((exercicesList)=>{
        res.render('exercices/exercices', 
        {exercicesList:exercicesList.data})
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

module.exports = router;

