module.exports = app => {
  const clients = require("../controllers/client.controller.js");
  var router = require("express").Router();

  // Create a new Client
  router.post("/", clients.create);

  // Retrieve all Clients
  router.get("/", clients.findAll);

  // Retrieve a single Client with id
  router.get("/:id", clients.findOne);

  // Update a Client with id
  router.put("/:id", clients.update);

  app.use('/api/clients', router);
};
