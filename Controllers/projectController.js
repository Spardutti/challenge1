const Project = require("../Models/project");
const Template = require("../Models/template");
const ObjectID = require("mongodb").ObjectID;

// CREATE A NEW PROJECT
exports.newProject = (req, res, next) => {
  Template.findById(req.params.id, (err, template) => {
    if (err) return next(err);
    const templateTasks = template.tasks;
    // TODO check if project exist
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

// UPDATE TASk
exports.updateProjectTask = (req, res, next) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) return next(err);
    let index = req.body.index;
    project.tasks[index].completed = !project.tasks[index].completed;
    project.markModified("tasks");
    project.save((err, updatedProject) => {
      if (err) return next(err);
      res.json(updatedProject);
    });
  });
};

// DELETE TASK
exports.deleteProjectTask = (req, res, next) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) return next(err);
    let index = req.body.index;
    project.tasks.splice(index, 1);
    project.save((err) => {
      if (err) return next(err);
      res.json(project);
    });
  });
};

// REMOVE PROJECT
exports.deleteProject = (req, res, next) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    if (err) return next(err);
    project.save();
    res.json(project);
  });
};
