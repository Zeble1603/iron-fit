// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

// ℹ️ Needed to accept from requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request if from the same domain, by default express wont accept POST requests
const cors = require("cors");

// ℹ️ Session middleware for authentication
// https://www.npmjs.com/package/express-session
const session = require("express-session");

// ℹ️ MongoStore in order to save the user session in the database
// https://www.npmjs.com/package/connect-mongo
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

// Connects the mongo uri to maintain the same naming structure
const MONGO_URI = require("../utils/consts");
const path = require("path");
const favicon = require("serve-favicon");
// Middleware configuration
module.exports = (app) => {
  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like heroku use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  // ! please configure the cors `origin` key so that you can accept the requests wherever they might be coming from
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );

  // In development environment the app logs
  app.use(logger("dev"));

  //Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"));
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");
  // AHandles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));
  // Handles access to the favicon
  app.use(
    favicon(path.join(__dirname, "..", "public", "images", "favicon.ico"))
  );
  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // ℹ️ Middleware that adds a "req.session" information and later to check that you are who you say you are 😅
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "super hyper secret key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
      }),
      cookie: {
        sameSite: "none",
        httpOnly: true,
        maxAge: 60000,
      },
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await User.findById(id);
    done(null, user);
  });
  //Estrategia a seguir para el logeo === username and password
  passport.use(
    "local",
    new LocalStrategy(
      {
        passReqToCallback: true, //envio mas datos, no solo username y password
        usernameField: "username", // by default
        passwordField: "password", // by default
      },
      (req, username, password, done) => {
        User.findOne({ username })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Incorrect username" });
            }

            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: "Incorrect password" });
            }

            done(null, user);
          })
          .catch((err) => done(err));
      }
    )
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    req.user = req.session.user || null;
    next();
  });
};
