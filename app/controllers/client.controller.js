const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  // Create a Client
  const client = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    stateProvince: req.body.stateProvince,
    zipCode: req.body.zipCode,
    gender: req.body.gender,
    dob: req.body.dob,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    email: req.body.email,
    onboardDate: req.body.onboardDate,
    internalCaseManager: req.body.internalCaseManager,
    // ethnicity: req.body.ethnicity,
    race: req.body.race,
    religion: req.body.religion,
    maritalStatus: req.body.maritalStatus,
    disabilityStatus: req.body.disabilityStatus,
    isOverallConsentObtained: req.body.isOverallConsentObtained,
    isSMSConsentObtained: req.body.isSMSConsentObtained,
    primaryLanguage: req.body.primaryLanguage,
    createdByUserID: req.body.createdByUserID,
    updatedByUserID: req.body.updatedByUserID
  };

  // Save Client in the database
  Client.create(client)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the Client."});});
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Client.findAll({ where: condition })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving clients." });
  });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Client with id=" + id });
  });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Client.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) { res.send({ message: "Client was updated successfully." }); }
      else { res.send({ message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!` }); } })
    .catch(err => { res.status(500).send({ message: "Error updating Client with id=" + id }); });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Client.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) { res.send({ message: "Client was deleted successfully!" }); }
      else { res.send({ message: `Cannot delete Client with id=${id}. Maybe Client was not found!` }); } })
    .catch(err => { res.status(500).send({ message: "Could not delete Client with id=" + id }); });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
  Client.destroy({ where: {}, truncate: false })
    .then(nums => { res.send({ message: `${nums} Clients were deleted successfully!` }); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while removing all clients." }); });
};

// find all published Client
exports.findAllPublished = (req, res) => {
  Client.findAll({ where: { published: true } })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving clients." }); });
};
