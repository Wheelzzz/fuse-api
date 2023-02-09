const db = require("../models");
const Enrollment = db.enrollments;
const sql = require('mssql');

// Retrieve all Enrollments from the database.
exports.findAll = (req, res) => {
  Enrollment
    .findAll({ limit: 10 })
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({
      message: err.message || "Some error occurred while retrieving enrollments." });
  });
};

// Create and Save a new Member
exports.create = (req, res) => {
  const enrollment = {
    memberId:                   req.body.memberId,
    program:                    req.body.program,
    startDate:                  req.body.startDate,
    endDate:                    req.body.endDate,
    referralDate:               req.body.referralDate,
    referralMethod:             req.body.referralMethod,
    referralSource:             req.body.referralSource,
    referralPartnerCategory:    req.body.referralPartnerCategory,
    programEnrollmentNotes:     req.body.programEnrollmentNotes,
    caseType:                   req.body.caseType,
    caseManager:                req.body.caseManager,
    memberFirstName:            req.body.memberFirstName,
    memberLastname:             req.body.memberLastname,
    createdByUserId:            req.body.createdByUserID,
    updatedByUserId:            req.body.updatedByUserID
  };

  // Validate request
  if (!req.body.program) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  Enrollment.create(enrollment)
    .then(data => {res.send(data);})
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the enrollment."});});
};

exports.update = (req, res) => {
  const id = req.params.id;

  Enrollment.update(req.body, { where: { id: id } })
  .then(num => {
    if (num == 1) { res.send({ message: "Enrollment was updated successfully." }); }
    else { res.send({ message: "Cannot update enrollment with id=${id}. Maybe enrollment was not found or req.body is empty!" }); } })
  .catch(err => { res.status(500).send({ message: "Error updating enrollment with id =" + id }); });
};

exports.findAllByMember = (req, res) => {
  const memberId = req.params.memberId
  Enrollment.findAll({ where: { memberId: memberId } })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving enrollments." }); });
};

