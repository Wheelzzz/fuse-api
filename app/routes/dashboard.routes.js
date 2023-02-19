module.exports = app => {
  const dashboard = require("../controllers/dashboard.controller");
  var router = require("express").Router();
  router.get("/casemanageractivity", dashboard.caseManagerActivity);
  router.get("/programenrollments", dashboard.programEnrollments);
  router.get("/programactivitysummary", dashboard.programActivitySummary);
  app.use('/api/dashboard', router);
};

