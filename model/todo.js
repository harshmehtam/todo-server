var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  hobby: [
    {
      type: Number,
      required: true,
    },
  ],
  age: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: 1,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
