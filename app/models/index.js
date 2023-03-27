const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  freezeTableName: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.members = require("./member.model")(sequelize, Sequelize);
  db.programs = require("./program.model")(sequelize, Sequelize);
  db.activities = require("./activity.model")(sequelize, Sequelize);
  db.enrollments = require("./enrollment.model")(sequelize, Sequelize);
  db.caregivers = require("./caregiver.model")(sequelize, Sequelize);
  db.caseManagers = require("./case-manager.model")(sequelize, Sequelize);
  db.referrals = require("./referral.model")(sequelize, Sequelize);
  db.users = require("./user.model.js")(sequelize, Sequelize);;
  module.exports = db;

