const db = require("../models");
const Activity = db.activities;
// const Op = db.Sequelize.Op;

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
    activityTypeId:     1,      // req.body.activityType,
    activityDate:       req.body.activityDate,
    duration:           req.body.duration,
    activityNotes:      req.body.caseNotes,
    createdByUserId:    1,      // req.body.createdByUserID,
    updatedByUserId:    1       // req.body.updatedByUserID
  };

  // Save Activity in the database
  Activity.create(activity)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the Activity."});});
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

