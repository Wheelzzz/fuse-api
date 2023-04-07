const db = require("../models");
const Member = db.members;
const sql = require('mssql');

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const { TYPES } = require("tedious");
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

// exports.memberAddressInfo = (req, res) => {
//   const memberId = req.params.memberId;
//   sequelize.query('EXEC members.getAddressInformation @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
//            .then(data => { res.send(data); } )
//            .catch(error => { res.status(500).send({ message: error.message })})
//  };

exports.memberInsurance = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getInsurance @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberTimeline = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getTimeline @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberCompliance = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getCompliance @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };


 exports.memberDemographics = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getDemographics @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberCaregivers = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getCaregivers @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberProviders = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getProviders @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

exports.memberReferrals = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getReferrals @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberActivities = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getActivities @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };


 exports.memberActiveReferrals = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getActiveReferrals @memberId = :memberId', { replacements: { memberId: memberId }, type: sequelize.QueryTypes.SELECT })
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

exports.memberActivitiesUpsert = (req, res) => {
  sequelize.query(`exec members.setActivities
                        @id = :id,
                        @memberId = :memberId,
                        @programId = :programId,
                        @caseManagerId = :caseManagerId,
                        @activityTypeId = :activityTypeId,
                        @activityDate = :activityDate,
                        @startTime = :startTime,
                        @endTime = :endTime,
                        @duration = :duration,
                        @effectiveness = :effectiveness,
                        @activityNotes = :activityNotes,
                        @userId = :userId`,
                        { replacements: { id: req.body.id,
                                          memberId: req.body.memberId,
                                          programId: req.body.programId,
                                          caseManagerId: req.body.caseManagerId,
                                          activityTypeId: req.body.activityTypeId,
                                          activityDate: req.body.activityDate,
                                          startTime: req.body.startTime,
                                          endTime: req.body.endTime,
                                          duration: req.body.duration,
                                          effectiveness: req.body.effectiveness,
                                          activityNotes: req.body.activityNotes,
                                          userId: req.body.userId },
                          type:         sequelize.QueryTypes.select })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberComplianceUpsert = (req, res) => {
  sequelize.query(`exec members.setCompliance
                        @memberId = :memberId,
                        @hasSMSConsent = :hasSMSConsent,
                        @consentType = :consentType,
                        @medicaidId = :medicaidId,
                        @dhs = :dhs,
                        @needsGuardian = :needsGuardian,
                        @userId = :userId`,
                        { replacements: { memberId: req.body.memberId,
                                          hasSMSConsent: req.body.hasSMSConsent,
                                          consentType: req.body.consentType,
                                          medicaidId: req.body.medicaidId,
                                          dhs: req.body.dhs,
                                          needsGuardian: req.body.needsGuardian,
                                          userId: req.body.userId },
                          type:         sequelize.QueryTypes.select })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };


 exports.memberBulkInsert = (req,res) => {

 }

 exports.memberDemographicsUpsert = (req, res) => {
  sequelize.query(`exec members.setDemographics
                        @memberId = :memberId,
                        @gender = :gender,
                        @genderIdentity = :genderIdentity,
                        @sexualOrientation = :sexualOrientation,
                        @pronouns = :pronouns,
                        @dob = :dob,
                        @ethnicity = :ethnicity,
                        @race = :race,
                        @primaryLanguage = :primaryLanguage,
                        @religion = :religion,
                        @maritalStatus = :maritalStatus,
                        @disabilityStatus = :disabilityStatus,
                        @disabilityNotes = :disabilityNotes,
                        @userId = :userId`,
                        { replacements: { memberId: req.body.memberId,
                                          gender: req.body.gender,
                                          genderIdentity: req.body.genderIdentity,
                                          sexualOrientation: req.body.sexualOrientation,
                                          pronouns: req.body.pronouns,
                                          dob: req.body.dob,
                                          ethnicity: req.body.ethnicity,
                                          race: req.body.race,
                                          primaryLanguage: req.body.primaryLanguage,
                                          religion: req.body.religion,
                                          maritalStatus: req.body.maritalStatus,
                                          disabilityStatus: req.body.disabilityStatus,
                                          disabilityNotes: req.body.disabilityNotes,
                                          userId: req.body.userId },
                           type:         sequelize.QueryTypes.SELECT } )
         .then(data => { res.send(data); } )
         .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberInsuranceUpsert = (req, res) => {
  sequelize.query(`exec members.setInsurance
                        @id = :id,
                        @memberId = :memberId,
                        @healthCoverage = :healthCoverage,
                        @coverageStartDate = :coverageStartDate,
                        @coverageEndDate = :coverageEndDate,
                        @medicaidType = :medicaidType,
                        @medicaidInsurer = :medicaidInsurer,
                        @qnxtId = :qnxtId,
                        @mphiDataPullInfo = :mphiDataPullInfo,
                        @dhsCaseNumber = :dhsCaseNumber,
                        @insuranceDataSource = :insuranceDataSource,
                        @mhcbds = :mhcbds,
                        @insuranceNotes = :insuranceNotes,
                        @userId = :userId`,
                        { replacements: { id: req.body.id,
                                          memberId: req.body.memberId,
                                          healthCoverage: req.body.healthCoverage,
                                          coverageStartDate: req.body.coverageStartDate,
                                          coverageEndDate: req.body.coverageEndDate,
                                          medicaidType: req.body.medicaidType,
                                          medicaidInsurer: req.body.medicaidInsurer,
                                          qnxtId: req.body.qnxtId,
                                          mphiDataPullInfo: req.body.mphiDataPullInfo,
                                          dhsCaseNumber: req.body.dhsCaseNumber,
                                          insuranceDataSource: req.body.insuranceDataSource,
                                          mhcbds: req.body.mhcbds,
                                          insuranceNotes: req.body.insuranceNotes,
                                          userId: req.body.userId },
                          type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberProvidersUpsert = (req, res) => {
  sequelize.query(`exec members.setProviders
                        @id = :id,
                        @memberId = :memberId,
                        @provider = :provider,
                        @providerType = :providerType,
                        @businessAssociationAgreement = :businessAssociationAgreement,
                        @providerNotes = :providerNotes,
                        @userId = :userId`,
                        { replacements: { id: req.body.id,
                                          memberId: req.body.memberId,
                                          provider: req.body.provider,
                                          providerType: req.body.providerType,
                                          businessAssociationAgreement: req.body.businessAssociationAgreement,
                                          providerNotes: req.body.providerNotes,
                                          userId: req.body.userId },
                          type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberRecentIntakes = (req, res) => {
  const memberId = req.params.memberId;
  sequelize.query('EXEC members.getRecentIntakes', { type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

// Find a single Client with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Member.findByPk(id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: "Error retrieving Client with id=" + id });
  });
};


exports.memberIntake = (req, res) => {
  sequelize.query(`exec members.setNewIntake
                        -- General
                        @firstName = :firstName,
                        @middleName = :middleName,
                        @lastName = :lastName,
                        @phone1 = :phone1,
                        @phone2 = :phone2,
                        @email	= :email,
                        @generalNotes = :generalNotes,
                        -- Referral
                        @referralDate = :referralDate,
                        @referralMethod = :referralMethod,
                        @referralSource = :referralSource,
                        @urgencyLevel = :urgencyLevel,
                        @domain = :domain,
                        @reason = :reason,
                        @referralNotes = :referralNotes,
                        -- Demographics...
                        @dob = :dob,
                        @gender = :gender,
                        @genderIdentity = :genderIdentity,
                        @sexualOrientation = :sexualOrientation,
                        @pronouns = :pronouns,
                        @ethnicity = :ethnicity,
                        @race = :race,
                        @primaryLanguage = :primaryLanguage,
                        @religion = :religion,
                        @maritalStatus = :maritalStatus,
                        @disabilityStatus = :disabilityStatus,
                        @disabilityNotes = :disabilityNotes,
                        -- Compliance
                        @hasSMSConsent = :hasSMSConsent,
                        @consentType = :consentType,
                        @medicaidId = :medicaidId,
                        @needsGuardian = :needsGuardian,
                        @complianceNotes = :complianceNotes,
                        -- Insurance
                        @healthCoverage = :healthCoverage,
                        @coverageStartDate = :coverageStartDate,
                        @coverageEndDate = :coverageEndDate,
                        @medicaidType = :medicaidType,
                        @medicaidInsurer = :medicaidInsurer,
                        @insuranceNotes = :insuranceNotes,
                        -- Caregivers
                        @primaryFirstName = :primaryFirstName,
                        @primaryLastName = :primaryLastName,
                        @primaryPreferredContactMethod = :primaryPreferredContactMethod,
                        @primaryRelationship = :primaryRelationship,
                        @primaryPhone1 = :primaryPhone1,
                        @primaryPhone2 = :primaryPhone2,
                        @primaryEmail	= :primaryEmail,
                        @primaryAddress1 = :primaryAddress1,
                        @primaryAddress2 = :primaryAddress2,
                        @primaryCity = :primaryCity,
                        @primaryStateProvince = :primaryStateProvince,
                        @primaryZipCode = :primaryZipCode,
                        -- Secondary Caregiver
                        @secondaryFirstName = :secondaryFirstName,
                        @secondaryLastName = :secondaryLastName,
                        @secondaryPreferredContactMethod = :secondaryPreferredContactMethod,
                        @secondaryRelationship = :secondaryRelationship,
                        @secondaryPhone1 = :secondaryPhone1,
                        @secondaryPhone2 = :secondaryPhone2,
                        @secondaryEmail	= :secondaryEmail,
                        @secondaryAddress1 = :secondaryAddress1,
                        @secondaryAddress2 = :secondaryAddress2,
                        @secondaryCity = :secondaryCity,
                        @secondaryStateProvince = :secondaryStateProvince,
                        @secondaryZipCode = :secondaryZipCode,
                        -- Providers
                        @provider = :provider,
                        @providerType = :providerType,
                        @businessAssociationAgreement = :businessAssociationAgreement,
                        @providerNotes = :providerNotes,
                        @userId = :userId;`,
                        { replacements: { firstName: req.body.firstName,
                                          middleName: req.body.middleName,
                                          lastName: req.body.lastName,
                                          phone1: req.body.phone1,
                                          phone2: req.body.phone2,
                                          email: req.body.email,
                                          generalNotes: req.body.generalNotes,
                                          referralDate: req.body.referralDate,
                                          referralMethod: req.body.referralMethod,
                                          referralSource: req.body.referralSource,
                                          urgencyLevel: req.body.urgencyLevel,
                                          domain: req.body.domain,
                                          reason: req.body.reason,
                                          referralNotes: req.body.referralNotes,
                                          dob: req.body.dob,
                                          gender: req.body.gender,
                                          genderIdentity: req.body.genderIdentity,
                                          sexualOrientation: req.body.sexualOrientation,
                                          pronouns: req.body.pronouns,
                                          ethnicity: req.body.ethnicity,
                                          race: req.body.race,
                                          primaryLanguage: req.body.primaryLanguage,
                                          religion: req.body.religion,
                                          maritalStatus: req.body.maritalStatus,
                                          disabilityStatus: req.body.disabilityStatus,
                                          disabilityNotes: req.body.disabilityNotes,
                                          hasSMSConsent: req.body.hasSMSConsent,
                                          consentType: req.body.consentType,
                                          medicaidId: req.body.medicaidId,
                                          needsGuardian: req.body.needsGuardian,
                                          complianceNotes: req.body.complianceNotes,
                                          healthCoverage: req.body.healthCoverage,
                                          coverageStartDate: req.body.coverageStartDate,
                                          coverageEndDate: req.body.coverageEndDate,
                                          medicaidType: req.body.medicaidType,
                                          medicaidInsurer: req.body.medicaidInsurer,
                                          insuranceNotes: req.body.insuranceNotes,
                                          primaryFirstName: req.body.primaryFirstName,
                                          primaryLastName: req.body.primaryLastName,
                                          primaryPreferredContactMethod: req.body.primaryPreferredContactMethod,
                                          primaryRelationship: req.body.primaryRelationship,
                                          primaryPhone1: req.body.primaryPhone1,
                                          primaryPhone2: req.body.primaryPhone2,
                                          primaryEmail: req.body.primaryEmail,
                                          primaryAddress1: req.body.primaryAddress1,
                                          primaryAddress2: req.body.primaryAddress2,
                                          primaryCity: req.body.primaryCity,
                                          primaryStateProvince: req.body.primaryStateProvince,
                                          primaryZipCode: req.body.primaryZipCode,
                                          secondaryFirstName: req.body.secondaryFirstName,
                                          secondaryLastName: req.body.secondaryLastName,
                                          secondaryPreferredContactMethod: req.body.secondaryPreferredContactMethod,
                                          secondaryRelationship: req.body.secondaryRelationship,
                                          secondaryPhone1: req.body.secondaryPhone1,
                                          secondaryPhone2: req.body.secondaryPhone2,
                                          secondaryEmail: req.body.secondaryEmail,
                                          secondaryAddress1: req.body.secondaryAddress1,
                                          secondaryAddress2: req.body.secondaryAddress2,
                                          secondaryCity: req.body.secondaryCity,
                                          secondaryStateProvince: req.body.secondaryStateProvince,
                                          secondaryZipCode: req.body.secondaryZipCode,
                                          provider: req.body.provider,
                                          providerType: req.body.providerType,
                                          businessAssociationAgreement: req.body.businessAssociationAgreement,
                                          providerNotes: req.body.providerNotes,
                                          userId: req.body.userId },
                          type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };

 exports.memberCompleteCase = (req, res) => {
  sequelize.query(`exec members.setCompleteCase
                        @referralDetailId = :referralDetailId,
                        @outcomeDate = :outcomeDate,
                        @outcome = :outcome,
                        @outcomeExplanation = :outcomeExplanation,
                        @userId = :userId;`,
                        { replacements: { referralDetailId: req.body.referralDetailId,
                                          outcomeDate: req.body.outcomeDate,
                                          outcome: req.body.outcome,
                                          outcomeExplanation: req.body.outcomeExplanation,
                                          userId: req.body.userId },
                          type: sequelize.QueryTypes.SELECT })
           .then(data => { res.send(data); } )
           .catch(error => { res.status(500).send({ message: error.message })})
 };
