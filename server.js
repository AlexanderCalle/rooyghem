const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const con = require('./connect');

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

app.get('/', (req, res)=> {
    con.query('SELECT name FROM groups', (err, groups)=> {
        if(err) return res.json({err: 'Failed to load groups'});
        res.render('index', {groups: groups});
    });
});

// Routers
//Route users
const users = require('./router/users');
app.use('/users', users);

// Route groups
const groups = require('./router/groups');
app.use('/groups', groups);

// Route activities
const activities = require('./router/activities');
app.use('/activities', activities);

// Route locations
const locations = require('./router/location');
app.use('/locations', locations);

app.listen(port, ()=> {
    console.log('Server running on port ' + port);
});