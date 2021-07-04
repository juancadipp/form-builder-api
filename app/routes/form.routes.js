module.exports = (app) => {
  const forms = require("../controllers/form.controller.js");

  // Create a new Form
  app.post("/forms", forms.create);

  // Retrieve all Forms
  app.get("/forms", forms.findAll);

  // Retrieve a single Form with formId
  app.get("/forms/:formId", forms.findOne);

  // Update a Form with formId
  app.put("/forms/:formId", forms.update);

  // Delete a Form with formId
  app.delete("/forms/:formId", forms.delete);
};
