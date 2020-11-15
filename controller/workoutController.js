const { settings } = require("../app");
var Workout = require("../models/workout");
var User = require("../models/user");

function workoutGet(req, res) {
  Workout.find()
    .then((workouts) => {
      res.json(workouts);
    })
    .catch(() => {
      res.send("Sorry no workouts was found :(");
    });
}

function workoutDelete(req, res) {
  console.log(req.body.workoutId);
  Workout.findByIdAndDelete(req.body.workoutId, function (error) {
    if (error) {
      return next(error);
    }
  });
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


function addWorkoutToCompletedList(req, res) {
  User.findByIdAndUpdate(
    req.body.userId,
    { $push: { completedWorkouts: req.body.workoutId } },
    function (err) {
      if (err) {
        res.send(err);
      }
    }
  );
}

function completedWorkouts(req, res, id) {
  var workoutList = [];

  User.findById(id)
    .then((user) => {


  Workout.find()
    .then((workouts) => {
      for (i = 0; i < workouts.length; i++) {
        for (j = 0; j < user.completedWorkouts.length; j++){          
          if (workouts[i]._id == user.completedWorkouts[j]) {
            workoutList.push(workouts[i]);
          }
        }
      }
      res.json(workoutList);
    })
    .catch(() => {
      res.send("Sorry no workouts was found :(");
    });
    })
    .catch(() => {
      res.send("Sorry user was found :(");
    });
}


function addExerciseToWorkoutGet(req, res, id) {
  res.render("addExercise", { title: "Add to exercise", id: id });
}

module.exports.workoutGet = workoutGet;
module.exports.workoutDelete = workoutDelete;
module.exports.workoutCreatePost = workoutCreatePost;
module.exports.addExerciseToWorkoutPost = addExerciseToWorkoutPost;
module.exports.addExerciseToWorkoutGet = addExerciseToWorkoutGet;
module.exports.addWorkoutToCompletedList = addWorkoutToCompletedList;
module.exports.completedWorkouts = completedWorkouts;
