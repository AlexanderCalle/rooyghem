const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const con = require('./connect');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const moment = require('moment');

const app = express();
const port = 3000 || procces.env.PORT;

// Server Logs middelware
app.use(morgan('dev'));

//middelware
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(helmet());

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=> {
    con.query('SELECT name, group_id FROM groups', (err, groups)=> {
        if(err) return res.json({err: 'Failed to load groups'});
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        const date = new Date();
        con.query('SELECT * from activities WHERE end_publication > ? AND start_publication <= ? AND start_date >= ? AND start_date <= ?', [date, date, date, date.addDays(14)], (err, activities)=> {
            if(err) return res.render('badrequest');
            res.render('index', {groups: groups, activities: activities, moment: moment});
        });
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

// Route leiding
const leiding = require('./router/leiding');
app.use('/leiding', leiding);

const vk = require('./router/vk');
app.use('/vk', vk);

app.listen(port, ()=> {
    console.log('Server running on port ' + port);
});
