const router = require("express").Router();
const authRoutes = require("./auth.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.user);
  res.render("index");
});

module.exports = router;
