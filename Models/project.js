const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema ({
    name: String,
    tasks: [],

})

module.exports = mongoose.model("Project", ProjectSchema);