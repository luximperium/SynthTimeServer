const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to SynthTime postgres database');
    },
    function(err){
        console.log('Connection to database failed!')
    }
);

let Users = sequelize.import('./models/users');
let Projects = sequelize.import('./models/project')

Users.hasMany(Projects);
Projects.belongsTo(Users);

module.exports = sequelize;