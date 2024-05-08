const express = require("express"); //express fram. ma code writing coverted into node.js//
const router = express.Router(); // because we have to perform routing for signin & signup features//
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local" /*passport used for authencitation & authorization, local means creating your own signin & sigup feature without onClick (help Nahi lena of google or github or facebook or twitter)*/);
passport.use(
  new localStrategy(
    userModel.authenticate() /*user.js ka bases par authenticate karna hai*/
  )
);

router.get("/", function (req, res, next /*next route chalagaa*/) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/register", function (req /*requests*/, res /*response*/) {
  const userdata = new userModel(
    /*creating mutiple entitys*/ {
      username: req.body.username,
      secret: req.body.secret,
    }
  );

  userModel.register(userdata, req.body.password).then(
    /*promise get resolved*/ function (registereduser) {
      passport.authenticate("local")(
        /*func called*/ req,
        res,
        /*callback func*/ function () {
          res.redirect("/profile");
        }
      );
    }
  );
});

router.get(
  "/profile",
  isLoggedIn /*user which is not login cannot acess /profile page (Middleware eg:)*/,
  function (req, res, next) {
    res.render("profile");
  }
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

router.get(
  "/logout",
  function (req, res, next /*next route chalagaa automtically*/) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
);

//below is Middleware eg:(isLoggedIn is defined)
function isLoggedIn(req, res, next) {
  if (
    /*jaba koi isLoggedIn kho request karaga*/ req.isAuthenticated() /*user register hai ka Nahi checkkaro*/
  ) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
