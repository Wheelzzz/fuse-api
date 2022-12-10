module.exports = app => {
  const activities = require("../controllers/activity.controller");
  var router = require("express").Router();

  // Create a new Activity
  router.post("/", activities.create);

  // Retrieve all Activities
  router.get("/", activities.findAll);

  // Retrieve a single Activity with id
  router.get("/:id", activities.findOne);

  // Update a Activity with id
  router.put("/:id", activities.update);

  app.use('/api/activities', router);
};

