module.exports = app => {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();

  router.get("/", users.userList);
  router.get("/list", users.userList);
  router.put("/login", users.login);

  app.use('/api/users', router);
};
