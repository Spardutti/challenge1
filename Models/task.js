const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: String,
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
