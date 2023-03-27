module.exports = app => {
  const activities = require("../controllers/activity.controller");
  var router = require("express").Router();

  router.get("/", activities.findAll);
  router.get("/member/:memberId", activities.findByMember);
  router.get("/list", activities.activityList);

  // Create a new Activity
  router.post("/", activities.create);
  router.post("/sp", activities.activityCreate);

  // Retrieve a single Activity with id
  // router.get("/:id", activities.findOne);


  // Update a Activity with id
  // router.put("/:id", activities.update);

  app.use('/api/activities', router);
};

