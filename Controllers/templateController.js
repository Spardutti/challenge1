const Template = require("../Models/template");
const { body, validationResult } = require("express-validator");

// CREATE A TEMPLATE
exports.newTemplate = [
  body("name").notEmpty().withMessage("Please enter a Template name"),
  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(404);
      res.json({ errors: validationErrors.array() });
    } else {
      new Template({
        name: req.body.name,
      }).save((err, template) => {
        if (err) return next(err);
        res.json(template);
      });
    }
  },
];

// GET ALL TEMPLATES
exports.templates = (req, res, next) => {
  Template.find({}, (err, templates) => {
    if (err) return next(err);
    res.json(templates);
  });
};
