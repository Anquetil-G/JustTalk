const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    authorPseudo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", messageSchema);