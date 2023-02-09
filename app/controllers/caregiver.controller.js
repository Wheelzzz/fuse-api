const db = require("../models");
const Caregiver = db.caregivers;
const sql = require('mssql');

exports.findAll = (req, res) => {
  Caregiver.findAll()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving members." });
  }); 
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Caregiver.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Client with id=" + id });
  });
};

exports.findAllByMember = (req, res) => {
  const memberId = req.params.memberId
  Caregiver.findAll({ where: { memberId: memberId } })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving caregivers." }); });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Caregiver.update(req.body, { where: { id: id } })
  .then(num => {
    if (num == 1) { res.send({ message: "Caregiver was updated successfully." }); }
    else { res.send({ message: "Cannot update caregiver with id=${id}. Maybe data was not found or req.body is empty!" }); } })
  .catch(err => { res.status(500).send({ message: "Error updating caregiver with id =" + id }); });
};
