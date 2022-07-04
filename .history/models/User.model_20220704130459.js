const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    amigos: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rutinas: [{ type: Schema.Types.ObjectId, ref: "Rutinas" }], //tomo todas las rutinas
    rutinasRealizadas: [{ type: Schema.Types.ObjectId, ref: "Rutinas" }], //tomo solo las rutinas con booleano true
  },
  {
    timestamps: true,
  }
);
userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
