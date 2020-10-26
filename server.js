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
const authCheck = require('./middleware/authCheck');

const app = express();
const port = 3000 || procces.env.PORT;

// Server Logs middelware
app.use(morgan('dev'));

//middelware
app.use('/public', express.static(path.join(__dirname, "public")));
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
    const date = new Date();
    con.query('SELECT * FROM newsfeeds WHERE end_publication > ? AND start_publication <= ? ORDER BY start_publication', [date, date], (err, newsfeeds) => {
        if(err) return res.render('badrequest', {error: err});
        res.render('index', {newsfeeds: newsfeeds, moment: moment});
    });
});

// app.get('/events', (req, res)=> {
//     Date.prototype.addDays = function(days) {
//         var date = new Date(this.valueOf());
//         date.setDate(date.getDate() + days);
//         return date;
//     }
//     const date = new Date();
//     con.query('SELECT * FROM `groups`', (err, groups)=>{
//         if(err) return res.render('badrequest', {error: err});
//         con.query('SELECT * from activities WHERE end_publication > ? AND start_publication <= ? AND start_date >= ? AND start_date <= ? ORDER BY start_date', [date, date, date, date.addDays(14)], (err, activities)=> {
//             if(err) return res.render('badrequest');
//             let events = []
//             activities.forEach(activity => {
//                 let color;
//                 let title;
            
//                 if(activity.group_id === groups[0].group_id) {
//                     color = "#ebbd05";
//                     title = "kab: " + activity.title;
//                 } else if(activity.group_id === groups[1].group_id) {
//                     color = "orange";
//                     title = "pag: " + activity.title;
//                 } else if(activity.group_id === groups[2].group_id) {
//                     color = "red";
//                     title = "jkn: " + activity.title;
//                 } else if(activity.group_id === groups[3].group_id) {
//                     color = "purple";
//                     title = "kn: " + activity.title;
//                 } else if(activity.group_id === groups[4].group_id) {
//                     color = "blue"
//                     title = "jhn: " + activity.title;
//                 } else if(activity.group_id === groups[5].group_id) {
//                     color = "green";
//                     title = "aspi: " + activity.title;
//                 } else if(activity.group_id === groups[6].group_id) {
//                     color = "brown";
//                     title = "hn: " + activity.title;
//                 }
    
//                 events.push({
//                     id: activity.activity_id,
//                     title: title,
//                     start: activity.start_date,
//                     end: activity.end_date,
//                     color: color
//                 })
//             });
//             res.send(events);
//         });
//     });
// });

app.get('/contact', (req, res)=> {
    con.query('SELECT * FROM users WHERE bondsteam = "bondsleider"', (err, users)=> {
        res.render('contact', {bondsleiders: users});
    });
});

app.post('/contact', (req, res)=> {
    sendmail({
        from: 'no-replt@ksarooyhgem.be',
        to: 'callebauta@hotmail.com',
        subject: 'from: ' + req.body.naam + ' ' + req.body.onderwerp,
        html: req.body.bericht
    }, (err, reply)=> {
        res.redirect('/contact')
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
const { query } = require('express');
const sendMailFactory = require('sendmail');
app.use('/vk', vk);

const newsfeed = require('./router/newsfeeds');
const adminCheck = require('./middleware/adminCheck');
app.use('/newsfeed', authCheck, adminCheck, newsfeed);

app.listen(port, ()=> {
    console.log('Server running on port ' + port);
});
