const db = require("../models");
const Member = db.members;
const sql = require('mssql');

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

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
  Member.findAll()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving members." });
  });
};

exports.memberList = (req, res) => {
 sequelize.query('EXEC dbo.getMemberList', { type: sequelize.QueryTypes.SELECT })
          .then(data => { res.send(data); } )
          .catch(error => { res.status(500).send({ message: error.message })})
};


exports.memberHealthInsurance = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC dbo.getHealthInsurance @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };
 

 exports.memberActivities = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC dbo.getActivities @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };


// Create and Save a new Member
exports.create = (req, res) => {
  const member = {
    firstName:        req.body.firstName,
    middleName:       req.body.middleName,
    lastName:         req.body.lastName,
    address1:         req.body.address1,
    address2:         req.body.address2,
    city:             req.body.city,
    stateProvince:    req.body.stateProvince,
    zipCode:          req.body.zipCode,
    gender:           req.body.gender,
    dob:              req.body.dob,
    phone1:           req.body.phone1,
    phone2:           req.body.phone2,
    email:            req.body.email,
    onboardDate:      req.body.onboardDate,
    caseManagerId:    req.body.caseManagerId,
    createdByUserId:  req.body.createdByUserID,
    updatedByUserId:  req.body.updatedByUserID
  };

  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  Member.create(member)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the member."});});
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Member.update(req.body, { where: { id: id } })
  .then(num => {
    if (num == 1) { res.send({ message: "Member was updated successfully." }); }
    else { res.send({ message: "Cannot update member with id=${id}. Maybe member was not found or req.body is empty!" }); } })
  .catch(err => { res.status(500).send({ message: "Error updating member with id =" + id }); });
};







/*
// Create and Save a new Member
exports.upsertMember = (req, res) => {
  const member = {
    firstName:        firstName,
    middleName:       middleName,
    lastName:         req.body.lastName,
    address1:         req.body.address1,
    address2:         req.body.address2,
    city:             req.body.city,
    stateProvince:    req.body.stateProvince,
    zipCode:          req.body.zipCode,
    gender:           req.body.gender,
    dob:              req.body.dob,
    phone1:           req.body.phone1,
    phone2:           req.body.phone2,
    email:            req.body.email,
    onboardDate:      req.body.onboardDate,
    caseManagerId:    req.body.caseManagerId,
    createdByUserId:  req.body.createdByUserID,
    updatedByUserId:  req.body.updatedByUserID
  };

  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  // async function upsertMember(member) {
  let pool = sql.connect(config);
  let memberAPICall = pool.request()
    .input('id',            sql.Int,            member.id)
    .input('firstName',     sql.varChar(100),   member.firstName)
    .input('middleName',    sql.varchar(100),   member.middleName)
    .input('lastName',      sql.varChar(100),   member.lastName)
    .input('address1',      sql.VarChar(100),   member.address1)
    .input('address2',      sql.VarChar(100),   member.address2)
    .input('city',          sql.VarChar(100),   member.city)
    .input('stateProvince', sql.VarChar(25),    member.stateProvince)
    .input('zipCode',       sql.VarChar(25),    member.zipCode)
    .input('phone1',        sql.varChar(25),    member.phone1)
    .input('phone2',        sql.varchar(25),    member.phone2)
    .input('email',         sql.varchar(100),   member.email)
    .input('gender',        sql.varChar(25),    member.gender)
    .input('dob',           sql.date,           member.dob)
    .input('onboardDate',   sql.date,           member.onboardDate)
    .input('caseManagerId', sql.Int,            member.caseManagerId)
    .execute('upsertMember');

  // return memberAPICall.recordset;

    //    .then(data => {res.send(data);})
    //    .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the member."});});
  };

*/



// Find a single Client with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Member.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Client with id=" + id });
  });
};

