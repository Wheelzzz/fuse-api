module.exports = app => {
  const activities = require("../controllers/activity.controller");
  var router = require("express").Router();

  // Retrieve all Activities
  router.get("/", activities.findAll);

  // Create a new Activity
  router.post("/", activities.create);

  // Retrieve a single Activity with id
  // router.get("/:id", activities.findOne);

  // Retrieve a activities by client
  // router.get("/client/:clientId", activities.findByClient);


  // Update a Activity with id
  // router.put("/:id", activities.update);

  app.use('/api/activities', router);
};

