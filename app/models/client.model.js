module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    firstName:            {type: Sequelize.STRING},
    middleName:           {type: Sequelize.STRING},
    lastName:             {type: Sequelize.STRING},
    address1:             {type: Sequelize.STRING},
    address2:             {type: Sequelize.STRING},
    city:                 {type: Sequelize.STRING},
    stateProvince:        {type: Sequelize.STRING},
    zipCode:              {type: Sequelize.STRING},
    gender:               {type: Sequelize.STRING},
    dob:                  {type: Sequelize.STRING},
    phone1:               {type: Sequelize.STRING},
    phone2:               {type: Sequelize.STRING},
    email:                {type: Sequelize.STRING},
    onboardDate:          {type: Sequelize.STRING},
    caseWorker:           {type: Sequelize.STRING},
    primaryLanguage:      {type: Sequelize.STRING},
    // ethnicity:            {Type: Sequelize.STRING},
    race:                 {type: Sequelize.STRING},
    religion:             {type: Sequelize.STRING},
    maritalStatus:        {type: Sequelize.STRING},
    disabilityStatus:     {type: Sequelize.STRING},
    hasOverallConsent:    {type: Sequelize.STRING},
    hasSMSConsent:        {type: Sequelize.STRING},
    createdByUserID:      {type: Sequelize.STRING},
    updatedByUserID:      {type: Sequelize.STRING}
  });

  return Client;
};
