const db = require("../models");
const Referral = db.referrals;
const sql = require('mssql');

exports.findAll = (req, res) => {
  Referral.findAll()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving referrals." });
  });
};

exports.findByMemberId = (req, res) => {
  const memberID = req.query.memberId;
  alert(req.query.memberId);
  console.log(memberID);

  Referral.findAll({ where: { memberId: memberId } })
  .then(data => { res.send(data); })
  .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving referrals by member." }); });
};

exports.create = (req, res) => {
  const referral = {
    memberId:                   req.body.memberId,
    referralSource:             req.body.referralSource,
    referralReason:             req.body.referralReason,
    referralDomain:             req.body.referralDomain,
    needIdentifiedDate:         req.body.needIdentifiedDate,
    programEndDate:             req.body.programEndDate,
    outcome:                    req.body.outcome,
    outcomeDate:                req.body.outcomeDate,
    outcomeExplanation:         req.body.outcomeExplanation,
    notes:                      req.body.notes,
    programEnrollmentId:        req.body.programEnrollmentId,
    createdByUserId:            req.body.createdByUserID,
    updatedByUserId:            req.body.updatedByUserID
  };

  // Validate request
  if (!req.body.memberId) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  Referral.create(referral)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the member."});});
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Referral.update(req.body, { where: { id: id } })
  .then(num => {
    if (num == 1) { res.send({ message: "Member was updated successfully." }); }
    else { res.send({ message: "Cannot update member with id=${id}. Maybe member was not found or req.body is empty!" }); } })
  .catch(err => { res.status(500).send({ message: "Error updating member with id =" + id }); });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Referral.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Client with id=" + id });
  });
};
