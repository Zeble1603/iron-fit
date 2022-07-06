const router = require("express").Router();
const authRoutes = require("./auth.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { loggedUser: req.session.user });
});

module.exports = router;
