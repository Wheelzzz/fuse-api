const db = require("../models");
const User = db.users;
const sql = require('mssql');

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
// const { TYPES } = require("tedious");
const sequelize = new Sequelize(dbConfig.DB,
                                dbConfig.USER,
                                dbConfig.PASSWORD,
                                { host: dbConfig.HOST,
                                  port: dbConfig.PORT,
                                  dialect: dbConfig.dialect,
                                  freezeTableName: true,
                                  pool: { max: dbConfig.pool.max,
                                          min: dbConfig.pool.min,
                                          acquire: dbConfig.pool.acquire,
                                          idle: dbConfig.pool.idle },});

exports.userList = (req, res) => {
 sequelize.query('EXEC dbo.getUserList', { type: sequelize.QueryTypes.SELECT })
          .then(data => { res.send(data); } )
          .catch(error => { res.status(500).send({ message: error.message })})
};

exports.login = (req, res) => {
  sequelize.query(`EXEC dbo.getLogin
                        @userId = :userId,
                        @userPassword = :userPassword`,
                        { replacements: { userId:       req.body.userId,
                                          userPassword: req.body.userPassword },
                          type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };



// Create and Save a new Member
// exports.create = (req, res) => {
//   const user = {
//     userId:           req.body.userId,
//     userName:         req.body.userName,
//     password:         req.body.password,
//     firstName:        req.body.firstName,
//     lastName:         req.body.lastName,
//     email:            req.body.email,
//     roleId:           req.body.roleId,
//     isActive:         true,
//     createdByUserId:  req.body.createdByUserID,
//     updatedByUserId:  req.body.updatedByUserID
//   };

//   // Validate request
//   if (!req.body.firstName) {
//     res.status(400).send({message: "Content can not be empty!"});
//     return;
//   }

//   User.create(user)
//     .then(data => {res.send(data);})
//     .catch(err => {res.status(500).send({message: err.message || "Some error occurred while creating the user."});});
// };

// Update a Client by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   User.update(req.body, { where: { id: id } })
//   .then(num => {
//     if (num == 1) { res.send({ message: "User was updated successfully." }); }
//     else { res.send({ message: "Cannot update user with id=${id}. Maybe user was not found or req.body is empty!" }); } })
//   .catch(err => { res.status(500).send({ message: "Error updating user with id =" + id }); });
// };

