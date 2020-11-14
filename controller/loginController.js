var User = require("../models/user");
var Jwt = require('jsonwebtoken');

function loginPost(req, res, next) {
  var secret = 'secret123';
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (
      error,
      user
    ) {
      if (error || !user) {
        var err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        const token = Jwt.sign({ sub: user._id }, secret)
        return res.json({ id: user._id, token });
      }
    });
  } else {
    var err = new Error("Email and password are required.");
    err.status = 401;
    return next(err);
  }
}

function loginGet(req, res, next) {
  return res.send("login", { title: "Log In" });
}

function logoutGet(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
}

function registerGet(req, res, next) {
  return res.render("register", { title: "Sign Up" });
}

function registerPost(req, res, next) {
  if (req.body.email && req.body.password && req.body.confirmPassword) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error("Passwords do not match.");
      err.status = 400;
      return next(err);
    }

    // create object with form input
    var userData = {
      email: req.body.email,
      password: req.body.password,
    };
    // use schema's `create` method to insert document into Mongo
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      }});
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
}

module.exports.registerPost = registerPost;
module.exports.registerGet = registerGet;
module.exports.logoutGet = logoutGet;
module.exports.loginPost = loginPost;
module.exports.loginGet = loginGet;
