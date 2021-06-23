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

// UPDATE PROJECT TASK
router.put("/project/update/:id", projectController.updateProjectTask);

// DELETE PROJECT TASK
router.delete("/project/delete/:id", projectController.deleteProjectTask);

// ADD PROJECT TASK
router.post("/project/task/:id", taskController.newProjectTask);

// DELETE PROJECT
router.delete("/project/:id", projectController.deleteProject);

/************************ TEMPLATES */

// GET ALL TEMPLATES
router.get("/templates", templateController.templates);

//CREATE TEMPLATE
router.post("/template/new", templateController.newTemplate);

// ADD TASK TO TEMPLATE
router.post("/template/:id", taskController.newTemplateTask);

module.exports = router;
