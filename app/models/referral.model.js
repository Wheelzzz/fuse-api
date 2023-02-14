

module.exports = (sequelize, Sequelize) => {
  const Referral = sequelize.define("referral", {
    memberId:                   {type: Sequelize.INTEGER},
    referralSource:             {type: Sequelize.STRING},
    referralReason:             {type: Sequelize.STRING},
    referralDomain:             {type: Sequelize.STRING},
    needIdentifiedDate:         {type: Sequelize.DATE},
    programEndDate:             {type: Sequelize.DATE},
    outcome:                    {type: Sequelize.STRING},
    outcomeDate:                {type: Sequelize.DATE},
    outcomeExplanation:         {type: Sequelize.STRING},
    notes:                      {type: Sequelize.STRING},
    programEnrollmentId:        {type: Sequelize.INTEGER},
    createdByUserId:            {type: Sequelize.INTEGER},
    updatedByUserId:            {type: Sequelize.INTEGER}
  });

  return Referral;
};
