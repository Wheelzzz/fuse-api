module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    caseworkerID:                   {type: Sequelize.STRING},
    clientID:                       {type: Sequelize.STRING},
    activityType:                   {type: Sequelize.STRING},
    activityDate:                   {type: Sequelize.STRING},
    duration:                       {type: Sequelize.NUMBER},
    caseNotes:                      {type: Sequelize.STRING},
    createdByUserID:                {type: Sequelize.STRING},
    updatedByUserID:                {type: Sequelize.STRING}
  });

  return Program;
};
