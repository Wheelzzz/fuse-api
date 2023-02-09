module.exports = app => {
//  const programs = require("../controllers/program.controller.js");
const programs = require("../controllers/program.controller");
  var router = require("express").Router();
  router.get("/", programs.findAll);
  router.post("/", programs.create);
  router.put("/:id", programs.update);
  // Retrieve a single Program with id
//  router.get("/:id", programs.findOne);

  // Update a Program with id
//  router.put("/:id", programs.update);
  app.use('/api/programs', router);

};
