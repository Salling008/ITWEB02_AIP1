var workoutController = require("../controller/workoutController");
var mid = require("../middleware");
const express = require("express");

const workoutRouter = express.Router();

// GET /workout
workoutRouter.get("/workout", function (req, res, next) {
  workoutController.workoutGet(req, res, next);
});

// GET /createWorkout
workoutRouter.get("/createWorkout", mid.requiresLogin, function (
  req,
  res,
  next
) {
  workoutController.workoutCreateGet(req, res, next);
});

// GET /detailedWorkout
workoutRouter.get("/detailedWorkout", mid.requiresLogin, function (req, res) {
  let id = req.param("id");
  workoutController.detailedWorkoutGet(req, res, id);
});

// GET /addExercise
workoutRouter.get("/addExercise", mid.requiresLogin, function (req, res) {
  let id = req.param("id");
  workoutController.addExerciseToWorkoutGet(req, res, id);
});

// POST /addExercise
workoutRouter.post("/addExercise", mid.requiresLogin, function (req, res) {
  let id = req.param("id");
  workoutController.addExerciseToWorkoutPost(req, res, id);
});

// POST /createWorkout
workoutRouter.post("/createWorkout", mid.requiresLogin, function (
  req,
  res,
  next
) {
  workoutController.workoutCreatePost(req, res, next);
});

module.exports = workoutRouter;
