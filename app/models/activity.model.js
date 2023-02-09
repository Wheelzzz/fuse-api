module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activities", {
    caseManagerId:          {type: Sequelize.INTEGER},
    memberId:               {type: Sequelize.INTEGER},
    activityTypeId:         {type: Sequelize.INTEGER},
    activityDate:           {type: Sequelize.DATE},
    duration:               {type: Sequelize.INTEGER},
    activityNotes:          {type: Sequelize.STRING},
    createdByUserId:        {type: Sequelize.INTEGER},
    updatedByUserId:        {type: Sequelize.INTEGER}
  });

  return Activity;
};
