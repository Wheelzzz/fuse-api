const sql = require('mssql');
const db = require("../models");
const Program = db.programs;

// Create and Save a new Program
exports.create = (req, res) => {
  if (!req.body.program) {
    res.status(400).send({message: "Program name can not be empty!"});
    return;
  }

  // Create a Program
  const program = {
    programId: req.body.programId,
    programName: req.body.programName,
    programDescription: req.body.programDescription,
    programStatus: req.body.programStatus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    primaryContact: req.body.primaryContact,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail
  };

   // Save Program in the database
  Program.create(program)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the program."});});
};

// Retrieve all Programs from the database.
exports.findAll = (req, res) => {
  Program.findAll()
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

exports.getProgramListing = () => {
  let pool = sql.connect(config);
  let programs = pool.request().execute("dbo.getProgramListing");
  return programs;
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

// // find all Active Programs
exports.findAllPublished = (req, res) => {
  Program.findAll({ where: { IsActive: true } })
  .then(data => { res.send(data); })
  .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving active programs." }); });
};
