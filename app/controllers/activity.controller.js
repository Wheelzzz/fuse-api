const db = require("../models");
const Activity = db.activities;
// const sql = require('mssql');

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

exports.activityList = (req, res) => {
  sequelize.query('EXEC dbo.getActivityList', { type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };


// Create and Save a new Activity
exports.create = (req, res) => {
  if (!req.body.memberId) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  // Create a Activity
  const activity = {
    caseManagerId:      req.body.caseManagerId,
    memberId:           req.body.memberId,
    activityTypeId:     req.body.activityTypeId,
    activityDate:       req.body.activityDate,
    duration:           req.body.duration,
    activityNotes:      req.body.caseNotes,
    createdByUserId:    req.body.userId,
    updatedByUserId:    req.body.userId
  };

  // Save Activity in the database
  Activity.create(activity)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the Activity."});});
};

exports.activityCreate = (req, res) => {
  const activity = {
    id:                 req.body.id,
    memberId:           req.body.memberId,
    caseManagerId:      req.body.caseManagerId,
    activityTypeId:     req.body.activityTypeId,
    activityDate:       req.body.activityDate,
    activityNotes:      req.body.activityNotes,
    userId:             req.body.userId
  };


  const sql = `
    exec dbo.setActivities
        @id = :id,
        @memberId = :memberId,
        @caseManagerId = :caseManagerId,
        @activityTypeId = :activityTypeId,
        @activityDate = :activityDate,
        @activityNotes = :activityNotes,
        @userId = :userId;
  `;

//  sequelize.query('EXEC dbo.setActivities @Id = :Id, @memberId = :memberId, @activityTypeId = :activityTypeId, @activityDate = :activityDate, @activityNotes = :activityNotes, @userId = :userId;', { 
    sequelize.query(sql,  { replacements: {
                            id:             activity.id,
                            memberId:       activity.memberId,
                            caseManagerId:  activity.caseManagerId,
                            activityTypeId: activity.activityTypeId,
                            activityDate:   activity.activityDate,
                            activityNotes:  activity.activityNotes,
                            userId:         activity.userId },
                            type: sequelize.QueryTypes.update })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

// Retrieve all Activities from the database.
exports.findAll = (req, res) => {
  Activity.findAll()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving activities." });
  });
};

exports.findByMember = (req, res) => {
  const memberId = req.params.memberId;

  Activity.findAll({ where: { memberId: memberId } })
  .then(data => { res.send(data); })
  .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving client activity." }); });
};

// Update a Activity by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Activity.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) { res.send({ message: "Activity was updated successfully." }); }
      else { res.send({ message: "Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!" }); } })
    .catch(err => { res.status(500).send({ message: "Error updating Activity with id=" + id }); });
};

