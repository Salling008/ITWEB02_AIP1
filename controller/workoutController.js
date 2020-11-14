const { settings } = require("../app");
var Workout = require("../models/workout");

function workoutGet(req, res) {
  Workout.find()
    .then((workouts) => {
      res.json(workouts);
    })
    .catch(() => {
      res.send("Sorry no workouts was found :(");
    });
}

function detailedWorkoutGet(req, res, id) {
  Workout.findById(id)
    .then((workout) => {
      res.render("detailedWorkout", {
        workout,
        title: `Workout: ${workout.title}`,
      });
    })
    .catch(() => {
      res.send("Sorry no workouts was found :(");
    });
}

function workoutCreateGet(req, res) {
  res.render("createWorkout", { title: "Create a workout" });
}

function workoutCreatePost(req, res, next) {
  var exerciseData = {
    exercise: req.body.exercise,
    description: req.body.exerciseDescription,
    set: req.body.set,
    reps: req.body.reps,
  };
  var workoutData = {
    title: req.body.title,
    description: req.body.description,
    exercise: exerciseData,
  };

  Workout.create(workoutData, function (error, workout) {
    if (error) {
      return next(error);
    } else {
      return res.render("detailedWorkout", {
        title: "Your new and fancy workout",
        workout,
      });
    }
  });
}

function addExerciseToWorkoutPost(req, res, id) {
  var exerciseData = {
    exercise: req.body.exercise,
    description: req.body.exerciseDescription,
    set: req.body.set,
    reps: req.body.reps,
  };

  Workout.findByIdAndUpdate(
    id,
    { $push: { exercise: exerciseData } },
    function (err, workout) {
      if (err) {
        res.send(err);
      } else {
        detailedWorkoutGet(req, res, id);
      }
    }
  );
}

function addExerciseToWorkoutGet(req, res, id) {
  res.render("addExercise", { title: "Add to exercise", id: id });
}

module.exports.workoutGet = workoutGet;
module.exports.workoutCreateGet = workoutCreateGet;
module.exports.workoutCreatePost = workoutCreatePost;
module.exports.detailedWorkoutGet = detailedWorkoutGet;
module.exports.addExerciseToWorkoutPost = addExerciseToWorkoutPost;
module.exports.addExerciseToWorkoutGet = addExerciseToWorkoutGet;
