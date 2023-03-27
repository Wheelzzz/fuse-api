const db = require("../models");
const CaseManager = db.caseManagers;
const sql = require('mssql');
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

exports.findAll = (req, res) => {
  CaseManager.findAll()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving data." });
  });
};

exports.caseManagerDropDown = (req, res) => {
  sequelize.query('EXEC dbo.getCaseManagerDropDown', { type: sequelize.QueryTypes.SELECT })
            .then(data => { res.send(data); } )
            .catch(error => { res.status(500).send({ message: error.message })})
};

exports.caseManagerList = (req, res) => {
  sequelize.query('EXEC dbo.getCaseManagerList', { type: sequelize.QueryTypes.SELECT })
            .then(data => { res.send(data); } )
            .catch(error => { res.status(500).send({ message: error.message })})
};

exports.caseManagerAssignments = (req, res) => {
  const caseManagerId = req.params.caseManagerId;
  sequelize.query('EXEC dbo.getCaseManagerAssignments @caseManagerId = :caseManagerId', { replacements: { caseManagerId: caseManagerId },type: sequelize.QueryTypes.SELECT })
            .then(data => { res.send(data); } )
            .catch(error => { res.status(500).send({ message: error.message })})
};

exports.create = (req, res) => {
  const caseManager = {
    caseManager:      req.body.caseManager,
    firstName:        req.body.firstName,
    lastName:         req.body.lastName,
    phone:            req.body.phone,
    email:            req.body.email,
    createdByUserId:  req.body.createdByUserID,
    updatedByUserId:  req.body.updatedByUserID
  };

  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  CaseManager.create(caseManager)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the case manager."});});
};

exports.update = (req, res) => {
  const id = req.params.id;

  CaseManager.update(req.body, { where: { id: id } })
  .then(num => {
    if (num == 1) { res.send({ message: "Case Manager was updated successfully." }); }
    else { res.send({ message: "Cannot update Case Manager with id=${id}. Maybe Case Manager was not found or req.body is empty!" }); } })
  .catch(err => { res.status(500).send({ message: "Error updating Case Manager with id =" + id }); });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  CaseManager.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Case Manager with id=" + id });
  });
};
