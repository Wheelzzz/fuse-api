

module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("member", {
    firstName:            {type: Sequelize.STRING},
    middleName:           {type: Sequelize.STRING},
    lastName:             {type: Sequelize.STRING},
    address1:             {type: Sequelize.STRING},
    address2:             {type: Sequelize.STRING},
    city:                 {type: Sequelize.STRING},
    stateProvince:        {type: Sequelize.STRING},
    zipCode:              {type: Sequelize.STRING},
    gender:               {type: Sequelize.STRING},
    dob:                  {type: Sequelize.DATE},
    phone1:               {type: Sequelize.STRING},
    phone2:               {type: Sequelize.STRING},
    email:                {type: Sequelize.STRING},
    onboardDate:          {type: Sequelize.DATE},
    caseManagerId:        {type: Sequelize.INTEGER},
    createdByUserId:      {type: Sequelize.INTEGER},
    updatedByUserId:      {type: Sequelize.INTEGER}
  });

  return Member;
};
