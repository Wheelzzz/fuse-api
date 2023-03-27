module.exports = app => {
  const members = require("../controllers/member.controller");
  var router = require("express").Router();
  router.get("/", members.findAll);
  router.get("/sp/", members.memberList);

  router.get("/demographics/:memberId", members.memberDemographics);
  router.get("/compliance/:memberId", members.memberCompliance);
  router.get("/caregivers/:memberId", members.memberCaregivers);
  router.get("/insurance/:memberId", members.memberInsurance);
  router.get("/activities/:memberId", members.memberActivities);
  router.get("/providers/:memberId", members.memberProviders);
  router.get("/timeline/:memberId", members.memberTimeline);
  router.get("/referrals/:memberId", members.memberReferrals);
  router.get("/overview/recent-intakes", members.memberRecentIntakes);
  router.get("/:id", members.findOne);

  router.post("/", members.create);

  router.put("/:id", members.update);

  router.put("/activities/set", members.memberActivitiesUpsert);
  router.put("/compliance/set", members.memberComplianceUpsert);
  router.put("/demographics/set", members.memberDemographicsUpsert);
  router.put("/insurance/set", members.memberInsuranceUpsert);
  router.put("/providers/set", members.memberProvidersUpsert);
  // router.post("/login", members.login);

  app.use('/api/members', router);
};
