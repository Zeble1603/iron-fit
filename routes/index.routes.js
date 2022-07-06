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
  }

  console.log(usernameCapitalized);
  res.render("index", { usernameCapitalized, loggedUser });
});

module.exports = router;
