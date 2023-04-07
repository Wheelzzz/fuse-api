const express = require("express");
const app = express();

const cors = require("cors");
var corsOptions = { origin: ['https://localhost:3000','https://localhost:443', 'http://localhost:3000', 'http://localhost:80', 'https://fuse-cms.azurewebsites.net:443', 'http://fuse-cms.azurewebsites.net:8080'] }
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {res.json({ message: "Welcome to Fuse API!!" });});
  require("./app/routes/member.routes")(app);
  require("./app/routes/program.routes")(app);
  require("./app/routes/activity.routes")(app);
  require("./app/routes/caregiver.routes")(app);
  require("./app/routes/case-manager.routes")(app);
  require("./app/routes/referral.routes")(app);
  require("./app/routes/dashboard.routes")(app);
  require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`);});
