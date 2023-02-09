module.exports = app => {
  const caregivers = require("../controllers/caregiver.controller");
  var router = require("express").Router();
  router.get("/", caregivers.findAll);
  router.get("/:memberId", caregivers.findAllByMember);
  router.put("/:memberId", caregivers.update);
  app.use('/api/caregivers', router);

};
