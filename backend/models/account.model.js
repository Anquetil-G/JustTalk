const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    moderator: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);