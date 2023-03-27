const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userId:               {type: Sequelize.STRING},
    userName:             {type: Sequelize.STRING},
    password:             {type: Sequelize.STRING},
    firstName:            {type: Sequelize.STRING},
    lastName:             {type: Sequelize.STRING},
    email:                {type: Sequelize.STRING},
    roleId:               {type: Sequelize.INTEGER},
    token:                {type: Sequelize.STRING},
    isActive:             {type: Sequelize.INTEGER},
    createdByUserId:      {type: Sequelize.INTEGER},
    updatedByUserId:      {type: Sequelize.INTEGER}
  });

  return User;
};
