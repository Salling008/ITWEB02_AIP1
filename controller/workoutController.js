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

function workoutDelete(req, res, id) {
  Workout.deleteOne(id, function (error) {
    if (error) {
      return next(error);
    }
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

  Workout.create(workoutData, function (error) {
    if (error) {
      return next(error);
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
    function (err) {
      if (err) {
        res.send(err);
      }
    }
  );
}

function addExerciseToWorkoutGet(req, res, id) {
  res.render("addExercise", { title: "Add to exercise", id: id });
}

module.exports.workoutGet = workoutGet;
module.exports.workoutDelete = workoutDelete;
module.exports.workoutCreateGet = workoutCreateGet;
module.exports.workoutCreatePost = workoutCreatePost;
module.exports.detailedWorkoutGet = detailedWorkoutGet;
module.exports.addExerciseToWorkoutPost = addExerciseToWorkoutPost;
module.exports.addExerciseToWorkoutGet = addExerciseToWorkoutGet;
