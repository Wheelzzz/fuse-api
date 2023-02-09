

module.exports = (sequelize, Sequelize) => {
  const Enrollment = sequelize.define("enrollment", {
    memberId:            {type: Sequelize.INTEGER},
    program:           {type: Sequelize.STRING},
    startDate:             {type: Sequelize.DATE},
    endDate:             {type: Sequelize.DATE},
    referralDate:     {type: Sequelize.DATE},
    referralMethod:     {type: Sequelize.STRING},
    referralSource:       {type: Sequelize.STRING},
    referralPartnerCategory: {type: Sequelize.STRING},
    programEnrollmentNotes: {type: Sequelize.STRING},
    caseType: {type: Sequelize.STRING},
    caseManager: {type: Sequelize.STRING},
    memberFirstName: {type: Sequelize.STRING},
    memberLastname: {type: Sequelize.STRING},
    referralSourceExternal: {type: Sequelize.STRING},
    createdByUserId:      {type: Sequelize.INTEGER},
    updatedByUserId:      {type: Sequelize.INTEGER}
  });

  return Enrollment;
};

