const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Location = model("Location", locationSchema);

module.exports = Location;
