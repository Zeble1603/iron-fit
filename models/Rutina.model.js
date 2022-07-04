const { Schema, model } = require("mongoose");

const rutinaSchema = new Schema(
    {
        name:String,
        timer: Number,
        workout: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    },
    {
      timestamps: true,
    }
  );

const Rutina = model("Rutina", rutinaSchema);

module.exports = Rutina;  