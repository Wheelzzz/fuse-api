const express = require("express");
const app = express();

const cors = require("cors");
var corsOptions = {origin: "http://localhost:3000"};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Fuse API !!" });
});

app.get("/", (req, res) => {res.json({ message: "Welcome to Fuse API!!" });});
  require("./app/routes/member.routes")(app);
  require("./app/routes/program.routes")(app);
  require("./app/routes/activity.routes")(app);
  require("./app/routes/enrollment.routes")(app);
  require("./app/routes/caregiver.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`);});
