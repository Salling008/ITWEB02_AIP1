var workoutController = require("../controller/workoutController");
var mid = require("../middleware");
const express = require("express");

const workoutRouter = express.Router();

// GET /workout
workoutRouter.get("/workout", function (req, res, next) {
  workoutController.workoutGet(req, res, next);
});

// POST /addExercise
workoutRouter.post("/addExercise", function (req, res) {
  let id = req.param("id");
  workoutController.addExerciseToWorkoutPost(req, res, id);
});

// POST /deleteWorkout
workoutRouter.post("/deleteWorkout", function (req, res) {
  workoutController.workoutDelete(req, res);
});

// POST /addWorkoutToCompletedList
workoutRouter.post("/addToCompleteList", function (req, res) {
  workoutController.addWorkoutToCompletedList(req, res);
});

// POST /createWorkout
workoutRouter.post("/createWorkout", function (
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
