const router = require("express").Router();
const authRoutes = require("./auth.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  let loggedUser;
  let usernameCapitalized;
  const capitalized = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  if (req.session.user) {
    loggedUser = req.session.user;
    usernameCapitalized = capitalized(loggedUser.username);
    res.render("index", { usernameCapitalized, loggedUser });
  }else{
    res.render("index");
  }
});

module.exports = router;
