const Sequelize = require('sequelize');
const sequelize = new Sequelize('synthtime', 'postgres', process.env.PASS, {
    host: 'localhost',
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

module.exports = sequelize;