const mongoose = require("mongoose");

const FormSchema = mongoose.Schema(
  {
    title: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", FormSchema);
