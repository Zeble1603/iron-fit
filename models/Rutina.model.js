const { Schema, model } = require("mongoose");

const rutinaSchema = new Schema(
    {
        name:String,
        timer: String,
        done: Boolean,
        started: Boolean,
        workout: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    },
    {
      timestamps: true,
    }
  );

const Rutina = model("Rutina", rutinaSchema);

module.exports = Rutina;  