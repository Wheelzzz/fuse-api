module.exports = app => {
  const caseManagers = require("../controllers/case-manager.controller");
  var router = require("express").Router();
  router.get("/", caseManagers.findAll);
  router.get("/sp", caseManagers.caseManagerList);
  router.get("/:id", caseManagers.findOne);
  router.post("/", caseManagers.create);
  router.put("/:id", caseManagers.update);
  app.use('/api/case-managers', router);
};
