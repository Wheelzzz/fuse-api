module.exports = app => {
  const referrals = require("../controllers/referral.controller");
  var router = require("express").Router();
  router.get("/", referrals.findAll);
  router.get("/:id", referrals.findOne);
  router.get("/member/:memberId", referrals.findByMemberId);
  router.post("/", referrals.create);
  router.put("/:id", referrals.update);
  app.use('/api/referrals', router);
};

