const Form = require("../models/form.model.js");

// Create and Save a new Form
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Form title can not be empty",
    });
  }

  // Create a Form
  const form = new Form({
    title: req.body.title,
  });

  // Save Form in the database
  form
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Form.",
      });
    });
};

// Retrieve and return all forms from the database.
exports.findAll = (req, res) => {
  Form.find()
    .then((forms) => {
      res.send(forms);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving forms.",
      });
    });
};

// Find a single form with a formId
exports.findOne = (req, res) => {
  Form.findById(req.params.formId)
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message: "Form not found with id " + req.params.formId,
        });
      }
      res.send(form);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Form not found with id " + req.params.formId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving form with id " + req.params.formId,
      });
    });
};

// Update a form identified by the formId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Form title can not be empty",
    });
  }

  // Find form and update it with the request body
  Form.findByIdAndUpdate(
    req.params.formId,
    {
      title: req.body.title,
    },
    { new: true }
  )
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message: "Form not found with id " + req.params.formId,
        });
      }
      res.send(form);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Form not found with id " + req.params.formId,
        });
      }
      return res.status(500).send({
        message: "Error updating form with id " + req.params.formId,
      });
    });
};

// Delete a form with the specified formId in the request
exports.delete = (req, res) => {
  Form.findByIdAndRemove(req.params.formId)
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message: "Form not found with id " + req.params.formId,
        });
      }
      res.send({ message: "Form deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Form not found with id " + req.params.formId,
        });
      }
      return res.status(500).send({
        message: "Could not delete form with id " + req.params.formId,
      });
    });
};
