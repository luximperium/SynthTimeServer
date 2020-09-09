const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to SynthTime postgres database");
  },
  function (err) {
    console.log("Connection to database failed!");
  }
);

let Users = sequelize.import("./models/users");
let Projects = sequelize.import("./models/project");

Users.hasMany(Projects, {
  foreignKey: "owner",
  constraints: true,
});

Projects.belongsTo(Users, {
  foreignKey: "id",
  constraints: true,
});

module.exports = sequelize;
