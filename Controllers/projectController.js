const Project = require("../Models/project");
const Template = require("../Models/template");
const ObjectID = require("mongodb").ObjectID;

// CREATE A NEW PROJECT
exports.newProject = (req, res, next) => {
  Template.findById(req.params.id, (err, template) => {
    if (err) return next(err);
    const templateTasks = template.tasks;
    const project = new Project({
      name: req.body.name,
    });
    templateTasks.forEach((task) => {
      project.tasks.push({
        completed: task.completed,
        _id: new ObjectID(),
        description: task.description,
      });
    });
    project.save((err) => {
      if (err) return next(err);
      res.json(project);
    });
  });
};

// GET ALL PROJECTS
exports.projects = (req, res, next) => {
  Project.find({}, (err, projects) => {
    if (err) return next(err);
    res.json(projects);
  });
};
