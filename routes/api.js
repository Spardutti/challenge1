var express = require("express");
var router = express.Router();
const taskController = require("../Controllers/taskController");
const templateController = require("../Controllers/templateController");
const projectController = require("../Controllers/projectController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index");
});

/*********************** PROJECTS */

// NEW PROJECT
router.post("/project/new/:id", projectController.newProject);

// GET ALL PROJECTS
router.get("/projects", projectController.projects);

/********************* TASK  */

// NEW TASK
router.post("/task/new", taskController.newTask);

// UPDATE TASK
router.put("/task/update/:id", taskController.updateTask);

// REMOVE TASK
router.delete("/task/delete/:id", taskController.removeTask);

/************************ TEMPLATES */

// GET ALL TEMPLATES
router.get("/templates", templateController.templates);

//CREATE TEMPLATE
router.post("/template/new", templateController.newTemplate);

// ADD TASK TO TEMPLATE
router.post("/template/:id", taskController.newTemplateTask);

module.exports = router;
