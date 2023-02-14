

module.exports = (sequelize, Sequelize) => {
  const CaseManager = sequelize.define("caseManager", {
    caseManager:          {type: Sequelize.STRING},
    firstName:            {type: Sequelize.STRING},
    lastName:             {type: Sequelize.STRING},
    phone:                {type: Sequelize.STRING},
    email:                {type: Sequelize.STRING},
    createdByUserId:      {type: Sequelize.INTEGER},
    updatedByUserId:      {type: Sequelize.INTEGER}
  });

  return CaseManager;
};
