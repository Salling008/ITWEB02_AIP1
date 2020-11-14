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

// DELETE /deleteWorkout
workoutRouter.delete("/deleteWorkout", mid.requiresLogin, function (req, res) {
  let id = req.param("id");
  workoutController.workoutDelete(id);
});

// POST /addWorkoutToCompletedList
workoutRouter.post("/addToCompleteList",  function (req, res) {
  workoutController.addWorkoutToCompletedList(req, res);
});

// POST /createWorkout
workoutRouter.post("/createWorkout", mid.requiresLogin, function (
  req,
  res,
  next
) {
  workoutController.workoutCreatePost(req, res, next);
});

// GET /completedworkouts
workoutRouter.get("/completedworkouts", function (req, res) {
  let id = req.param("id");
  workoutController.completedWorkouts(req, res, id);
});

module.exports = workoutRouter;
