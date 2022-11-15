const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const matchSchema = new Schema(
  {
    matcher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matchee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Match = model("Match", matchSchema);

module.exports = Match;
