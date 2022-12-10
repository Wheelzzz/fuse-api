const db = require("../models");
const Program = db.programs;
const Op = db.Sequelize.Op;

// Create and Save a new Program
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  // Create a Program
  const program = {
    programID: req.body.programID,
    programName: req.body.programName,
    programDescription: req.body.programDescription,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    primaryContact: req.body.primaryContact,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail,
    sendEmailUponReferral: req.body.sendEmailUponReferral,
    isActive: req.body.isActive,
    createdByUserID: req.body.createdByUserID,
    updatedByUserID: req.body.updatedByUserID
  };

  // Save Program in the database
  Program.create(program)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the Program."});});
};

// Retrieve all Programs from the database.
exports.findAll = (req, res) => {
  const programName = req.query.programName;
  var condition = programName ? { programName: { [Op.like]: `%${programName}%` } } : null;

  Program.findAll({ where: condition })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving programs." });
  });
};

// Find a single Program with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Program.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Program with id=" + id });
  });
};

// Update a Program by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Program.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) { res.send({ message: "Program was updated successfully." }); }
      else { res.send({ message: "Cannot update Program with id=${id}. Maybe Program was not found or req.body is empty!" }); } })
    .catch(err => { res.status(500).send({ message: "Error updating Program with id=" + id }); });
};

// Delete a Program with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Program.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) { res.send({ message: "Program was deleted successfully!" }); }
      else { res.send({ message: `Cannot delete Program with id=${id}. Maybe Program was not found!` }); } })
    .catch(err => { res.status(500).send({ message: "Could not delete Program with id=" + id }); });
};

// Delete all Programs from the database.
exports.deleteAll = (req, res) => {
  Program.destroy({ where: {}, truncate: false })
    .then(nums => { res.send({ message: `${nums} Programss were deleted successfully!` }); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while removing all programs." }); });
};

// find all Active Programs
exports.findAllPublished = (req, res) => {
  Program.findAll({ where: { IsActive: true } })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving active programs." }); });
};
