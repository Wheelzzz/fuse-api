const db = require("../models");
const Enrollment = db.enrollments;
const Op = db.Sequelize.Op;

// Create and Save a new Enrollment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  // Create a Enrollment
  const enrollment = {
    programID: req.body.programID,
    clientID: req.body.clientID,
    caseworkerID: req.body.caseworkerID,
    referralID: req.body.referralID,
    createdByUserID: req.body.createdByUserID,
    updatedByUserID: req.body.updatedByUserID
  };

  // Save Enrollment in the database
  Enrollment.create(enrollment)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the Enrollment."});});
};

// Retrieve all Enrollments from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Enrollment.findAll({ where: condition })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving enrollments." });
  });
};

// Find a single Enrollment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Enrollment.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Enrollment with id=" + id });
  });
};

// Update a Enrollment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Enrollment.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) { res.send({ message: "Enrollment was updated successfully." }); }
      else { res.send({ message: `Cannot update Enrollment with id=${id}. Maybe Enrollment was not found or req.body is empty!` }); } })
    .catch(err => { res.status(500).send({ message: "Error updating Enrollment with id=" + id }); });
};

// Delete a Enrollment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Enrollment.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) { res.send({ message: "Enrollment was deleted successfully!" }); }
      else { res.send({ message: `Cannot delete Enrollment with id=${id}. Maybe Enrollment was not found!` }); } })
    .catch(err => { res.status(500).send({ message: "Could not delete Enrollment with id=" + id }); });
};

// Delete all Enrollments from the database.
exports.deleteAll = (req, res) => {
  Enrollment.destroy({ where: {}, truncate: false })
    .then(nums => { res.send({ message: `${nums} Enrollments were deleted successfully!` }); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while removing all enrollments." }); });
};

// find all published Enrollment
exports.findAllPublished = (req, res) => {
  Enrollment.findAll({ where: { published: true } })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving enrollments." }); });
};
