const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const ApiService = require("../services/api.service");
const myApiService = new ApiService();
const Rutina = require("../models/Rutina.model"); 
const { response } = require("../app");

router.post('/new-rutina', (req,res,next)=>{
    debugger
    const {rutinaName} = req.body
    const loggedUser = req.session.user
    Rutina.create({
        name:rutinaName,
    })
    .then((newRutina)=>{
        loggedUser.rutinas.push(newRutina)
        res.redirect(`/profile`)
    })
    .catch((err)=>{
        next(err)
    })
})

router.get("/rutina/:rutinaId", (req, res, next) => {
    const {rutinaId} = req.params
    Rutina.findById(rutinaId)
    .then((rutina)=>{
        res.render("rutinas/detail", {rutina,workout:rutina.workout});
    })
    .catch((err)=>{
        next(err)
    })
  });
  

module.exports = router;