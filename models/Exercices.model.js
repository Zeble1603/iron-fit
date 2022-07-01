const { Schema, model } = require("mongoose");

const exerciceSchema = new Schema(
    {
        name:String,
        target:String,
        bodypart:String,
        gif:String,
        equipment:String
    },
    {
      timestamps: true,
    }
  );

const Exercice = model("Exercice", exerciceSchema);

module.exports = Exercice;  