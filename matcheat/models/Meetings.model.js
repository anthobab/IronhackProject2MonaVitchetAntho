const { Schema, model } = require("mongoose");

const meetingSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Meeting = model("Meeting", meetingSchema);

module.exports = Meeting;
