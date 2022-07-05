const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    amigos: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rutinas: [{ type: Schema.Types.ObjectId, ref: "Rutina" }], //tomo todas las rutinas
    rutinasRealizadas: [
      { type: Schema.Types.ObjectId, ref: "Rutina" },
    ], //tomo solo las rutinas con booleano true
  },
  {
    timestamps: true,
  }
);
const User = model("User", userSchema);

module.exports = User;
