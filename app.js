require('dotenv').config();
let express = require('express');
let app = express();
let db = require('./db');
let cors = require('cors')
let project = require('./controllers/projectcontroller');
let users = require('./controllers/userscontroller');

db.sync();
//db.sync({force: true})
app.use(cors())
app.use(require('./middleware/headers'));

app.use(express.json());


app.use('/users', users);

app.use(require('./middleware/validate-session'));
app.use('/project', project);


app.listen(process.env.PORT, function(){
    console.log(`App is listening on port ${process.env.PORT}`);
})