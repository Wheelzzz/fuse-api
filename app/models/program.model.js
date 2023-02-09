module.exports = (sequelize, Sequelize) => {
  const Program = sequelize.define("program", {
    programId:                    {type: Sequelize.INTEGER},
    programName:                  {type: Sequelize.STRING},
    programDescription:           {type: Sequelize.STRING},
    programStatus:                {type: Sequelize.STRING},
    startDate:                    {type: Sequelize.DATE},
    endDate:                      {type: Sequelize.DATE},
    location:                     {type: Sequelize.STRING},
    primaryContact:               {type: Sequelize.STRING},
    contactPhone:                 {type: Sequelize.STRING},
    contactEmail:                 {type: Sequelize.STRING}
  });

  return Program;
};
