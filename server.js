const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();
const port = 3000 || procces.env.PORT;

//middelware
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('', (req, res)=> {
    res.render('index');
});

// Routers
// Route office
const office = require('./router/office');
app.use('/office', office);

//Route users
const users = require('./router/users');
app.use('/users', users);

// Route groups
const groups = require('./router/groups');
app.use('/groups', groups);

// Route activities
const activities = require('./router/activities');
app.use('/activities', activities);

app.listen(port, ()=> {
    console.log('Server running on port ' + port);
});