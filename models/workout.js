var mongoose = require("mongoose");

var exerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  set: {
    type: Number,
    required: true,
  },
  reps: {
    type: String,
    required: true,
  },
});

var workoutSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  exercise: [exerciseSchema],
});

var Workout =
  mongoose.models.workoutSchema || mongoose.model("Workout", workoutSchema);

module.exports = Workout;
