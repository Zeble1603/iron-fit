const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
    name: String,
    type: String,
    repetition: Number,
    weight: Number,
    time: Number,
  },
  {
    timestamps: true,
  }
);

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
