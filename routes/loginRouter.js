var loginController = require("../controller/loginController");
const express = require("express");
var mid = require("../middleware");

const loginRouter = express.Router();

// GET /logout
loginRouter.get("/logout", function (req, res, next) {
  loginController.logoutGet(req, res, next);
});

// GET /login
loginRouter.get("/login", mid.loggedOut, function (req, res, next) {
  loginController.loginGet(req, res, next);
});

// POST /login
loginRouter.post("/login", function (req, res, next) {
  loginController.loginPost(req, res, next);
});

// GET /register
loginRouter.get("/register", mid.loggedOut, function (req, res, next) {
  loginController.registerGet(req, res, next);
});

// POST /register
loginRouter.post("/register", function (req, res, next) {
  loginController.registerPost(req, res, next);
});

module.exports = loginRouter;
