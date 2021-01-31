const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dateofbirth: {
    type: Date,
  },
  phone: {
    type: String,
  },
  adress: {
    type: String,
  },
  bio: {
    type: String,
  },
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
