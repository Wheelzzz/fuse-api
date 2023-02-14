module.exports = app => {
  const members = require("../controllers/member.controller");
  var router = require("express").Router();
  router.get("/", members.findAll);
  router.get("/:id", members.findOne);
  router.post("/", members.create);
  router.put("/:id", members.update);
  app.use('/api/members', router);
};
