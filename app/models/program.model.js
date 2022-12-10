module.exports = (sequelize, Sequelize) => {
  const Program = sequelize.define("program", {
    programID:                    {type: Sequelize.STRING},
    programName:                  {type: Sequelize.STRING},
    programDescription:           {type: Sequelize.STRING},
    startDate:                    {type: Sequelize.STRING},
    endDate:                      {type: Sequelize.STRING},
    location:                     {type: Sequelize.STRING},
    primaryContact:               {type: Sequelize.STRING},
    contactPhone:                 {type: Sequelize.STRING},
    contactEmail:                 {type: Sequelize.STRING},
    sendEmailUponReferral:        {type: Sequelize.BOOLEAN},
    isActive:                     {type: Sequelize.BOOLEAN},
    createdByUserID:              {type: Sequelize.STRING},
    updatedByUserID:              {type: Sequelize.STRING}
  });

  return Program;
};
