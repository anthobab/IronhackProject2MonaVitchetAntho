const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [/[^@]/, "@ not allowed on username"],
    },
    firstName: {
      type: String,
      max: 50,
    },
    lastName: {
      type: String,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [
        /(\w+\.?|-?\w+?)+@\w+\.?-?\w+?(\.\w{2,3})+/,
        "not a valid email address",
      ], //validation email : https://regex101.com/r/vznY0l/1
    },
    hash: String,
    salt: String,
    address: {
      street: String,
      city: { type: String, max: 100 },
      postcode: { type: Number, length: 5 },
    },
    phone: {
      prefix: { type: Number, max: 999 },
      number: { type: Number, length: 10 },
    },
    age: {
      type: Number,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "FileModel",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
