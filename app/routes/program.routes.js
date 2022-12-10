module.exports = app => {
  const programs = require("../controllers/program.controller.js");
  var router = require("express").Router();

  // Create a new Program
  router.post("/", programs.create);

  // Retrieve all Programs
  router.get("/", programs.findAll);

  // Retrieve a single Program with id
  router.get("/:id", programs.findOne);

  // Update a Program with id
  router.put("/:id", programs.update);

  app.use('/api/programs', router);
};
