const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  name: String,
  tasks: [],
});

module.exports = mongoose.model("Template", TemplateSchema);
