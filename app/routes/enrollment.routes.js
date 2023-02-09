module.exports = app => {
  const enrollments = require("../controllers/enrollment.controller");
  var router = require("express").Router();
  router.get("/", enrollments.findAll);
  router.post("/", enrollments.create);
  router.put("/:id", enrollments.update);
  router.get("/:memberId", enrollments.findAllByMember);
  app.use('/api/enrollments', router);

};
