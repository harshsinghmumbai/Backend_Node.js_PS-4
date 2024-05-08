const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const passport = require("passport");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Code which i have written in backend! is below //

app.use(
  expressSession(
    /*helper that allow only the right people can do certain things on a website, set of rule defined*/ {
      resave: false /*if something is getting store on server mutiple items without changing data don't allow it on store on server side */,
      saveUninitialized: false /*data which is getting store on server without having it name don't allow to store on server side*/,
      secret: "hello hello guy",
    }
  )
);
//passport is package through ham implement login and sigup feature in webapp//
app.use(
  passport.initialize() /*ha passport suro hojao for perfoming authentication and authorization*/
);
app.use(
  passport.session() /*means now you are able to save data [above we defining rule] */
);
passport.serializeUser(
  /*it will perform checking which is required for authenicationa and authorization*/ usersRouter.serializeUser()
);
passport.deserializeUser(
  /*it read your name and other details for signin later (next time yadh rakho user detail for signin)*/ usersRouter.deserializeUser()
);

//Code which i have written in backend! is above //

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
