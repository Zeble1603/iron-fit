const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
    {
        name:String,
        type:String,
        target:String,
        equipment:String,
        gifUrl:String,
        repetition:Number,
        weight:Number,
        time:Number,
        needtime:Boolean,
        done:Boolean,
    },
    {
      timestamps: true,
    }
  );

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
