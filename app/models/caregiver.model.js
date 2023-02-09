

module.exports = (sequelize, Sequelize) => {
  const Caregiver = sequelize.define("caregiver", {
    address1:                    {type: Sequelize.STRING},
    address2:                    {type: Sequelize.STRING},
    city:                        {type: Sequelize.STRING},
    stateProvince:               {type: Sequelize.STRING},
    zipCode:                     {type: Sequelize.STRING},
    county:                      {type: Sequelize.STRING},
    country:                     {type: Sequelize.STRING},
    geolocation:                 {type: Sequelize.STRING},
    neighborhood:                {type: Sequelize.STRING},
    isPrimaryResidence:          {type: Sequelize.STRING},
    caregiverFirstName:          {type: Sequelize.STRING},
    caregiverLastName:           {type: Sequelize.STRING},
    caregiverPrimaryPhone:       {type: Sequelize.STRING},
    caregiverSecondaryPhone:     {type: Sequelize.STRING},
    caregiverEmail:              {type: Sequelize.STRING},
    memberId:                    {type: Sequelize.STRING},
    memberFirstName:             {type: Sequelize.STRING},
    memberLastName:              {type: Sequelize.STRING}
  });

  return Caregiver;
};
