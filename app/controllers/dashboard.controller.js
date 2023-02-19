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

exports.caseManagerActivity = (req, res) => {
  sequelize .query('EXEC dbo.getActivityByCaseManager')
            .then(data => { res.send(data); } )
            .catch(error => { res.status(500).send({ message: error.message })})
};


exports.programEnrollments = (req, res) => {
  sequelize .query('EXEC dbo.getEnrollmentsByProgram')
            .then(data => { res.send(data); } )
            .catch(error => { res.status(500).send({ message: error.message })})
};

exports.programActivitySummary = (req, res) => {
  sequelize .query('EXEC dashboard.getProgramActivitySummary')
            .then(data => { res.send(data); } )
            .catch(error => { res.status(500).send({ message: error.message })})
};
