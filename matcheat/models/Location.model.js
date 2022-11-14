const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
  {
    name: { type: String, require: true },
    adress: {
      street: String,
      city: { type: String, max: 100 },
      postcode: { type: Number, length: 5 },
    },
  },
  {
    timestamps: true,
  }
);

const Location = model("Location", locationSchema);

module.exports = Location;
