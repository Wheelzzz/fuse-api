const db = require("../models");
const Activity = db.activities;
const Op = db.Sequelize.Op;

// Create and Save a new Activity
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  // Create a Activity
  const activity = {
    caseworkerID:         req.body.caseworkerID,
    clientID:             req.body.clientID,
    activityType:         req.body.activityType,
    activityDate:         req.body.activityDate,
    duration:             req.body.duration,
    caseNotes:            req.body.caseNotes,
    createdByUserID:      req.body.createdByUserID,
    updatedByUserID:      req.body.updatedByUserID
  };

  // Save Activity in the database
  Activity.create(activity)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the Activity."});});
};

// Retrieve all Activities from the database.
exports.findAll = (req, res) => {
  const activityType = req.query.activityType
  var condition = activityType ? { activityType: { [Op.like]: `%${activityType}%` } } : null;

  Activity.findAll({ where: condition })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving activities." });
  });
};

// Find a single Activity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Activity.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Activity with id=" + id });
  });
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

