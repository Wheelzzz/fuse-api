module.exports = app => {
  const members = require("../controllers/member.controller");
  var router = require("express").Router();
  router.get("/", members.findAll);
  router.get("/sp/", members.memberList);
  router.get("/insurance/:memberId", members.memberHealthInsurance);
  router.get("/activities/:memberId", members.memberActivities);
  router.get("/referrals/:memberId", members.memberReferrals);
  router.get("/:id", members.findOne);
  router.post("/", members.create);
  router.put("/:id", members.update);
  app.use('/api/members', router);
};
