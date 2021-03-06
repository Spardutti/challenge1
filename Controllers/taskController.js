const Task = require("../Models/task");
const { body, validationResult } = require("express-validator");
const Template = require("../Models/template");
const Project = require("../Models/project");

// ADD TASK TO TEMPLATE
exports.newTemplateTask = [
  body("description").notEmpty().withMessage("Please enter a task name"),
  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.json({ errors: validationErrors.array() });
    } else {
      Template.findById(req.params.id, (err, template) => {
        if (err) return next(err);
        if (template) {
          const task = new Task({
            description: req.body.description,
          });
          task.save();
          template.tasks.push(task);
          template.save();
          res.json(template);
        }
      });
    }
  },
];

// ADD TASK TO PROJECT
exports.newProjectTask = [
  body("description").notEmpty().withMessage("Please enter a task name"),
  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.json({ errors: validationErrors.array() });
    } else {
      Project.findById(req.params.id, (err, project) => {
        if (err) return next(err);
        const task = new Task({
          description: req.body.description,
        });
        task.save();
        project.tasks.push(task);
        project.save();
        res.json(project);
      });
    }
  },
];
