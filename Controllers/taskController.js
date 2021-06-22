const Task = require("../Models/task");
const { body, validationResult } = require("express-validator");
const Template = require("../Models/template");

// CREATES A NEW TASK
exports.newTask = [
  body("description").notEmpty().withMessage("Please enter a task name"),
  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.json({ errors: validationErrors.array() });
    } else {
      new Task({
        description: req.body.description,
      }).save((err, newTask) => {
        if (err) return next(err);
        res.json(newTask);
      });
    }
  },
];

// ADD TASK TO TEMPLATE
exports.newTemplateTask = (req, res, next) => {
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
};

// UPDATE TASK
exports.updateTask = (req, res, next) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) return next(err);
    task.completed = !task.completed;
    task.save((err) => {
      if (err) return next(err);
      res.json(task);
    });
  });
};

// REMOVE TASK
exports.removeTask = (req, res, next) => {
  Task.findByIdAndRemove(req.params.id, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
};
