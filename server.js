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
const crypto = require('crypto');
const sendgrid = require('sendgrid')('user', process.env.SENDGRID_API_KEY)
const authCheck = require('./middleware/authCheck');
const adminCheck = require('./middleware/adminCheck');
const userCheck = require('./middleware/userCheck');

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

app.get('/', userCheck, (req, res)=> {
    const date = new Date();
    con.query('SELECT * FROM newsfeeds WHERE end_publication > ? AND start_publication <= ? ORDER BY start_publication', [date, date], (err, newsfeeds) => {
        if(err) return res.render('badrequest', {error: err});
        res.render('index', {
            newsfeeds: newsfeeds, 
            moment: moment, 
            username: req.user.username
        });
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

app.get('/contact', userCheck, (req, res)=> {
    con.query('SELECT * FROM users WHERE bondsteam = "bondsleider"', (err, users)=> {
        res.render('contact', {bondsleiders: users, username: req.user.username});
    });
});

app.get('/overons', userCheck, (req, res)=> {
    res.render('over_ons', {username: req.user.username});
});

app.get('/forgot', userCheck, (req, res)=> {
    res.render('forgot', {username: req.user.username});
});

const sgMail = require('@sendgrid/mail')

app.post('/forgot', (req, res)=> {
    let token;

    crypto.randomBytes(20, (err, buf) => {
        token = buf.toString('hex');
    });

    con.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, users)=> {
        if(err) return res.render('badrequest', {error: err});

        var data = {
            resetPasswordToken: token,
            resetPasswordExpired: Date.now() + 3600000
        }
        con.query('UPDATE users SET ? WHERE email = ?', [data ,req.body.email], (err, user)=> {
            if(err) return res.render('badrequest', {error: err, username: ''})
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
                to: req.body.email,
                from: 'callebauta@hotmail.com',
                subject: 'Wachtwoord resetten',
                text: 'Hallo ' + req.body.email +', \n\n U hebt dit ontvangen omdat u gevraagd heeft om uw wachtwoord te herstellen, voor verdere instructies druk op de link hieronder\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'Als u dit niet gevraagd heb negeer dan deze mail.\n'
            }
            
            sgMail.send(msg).then(()=> {
                res.render('forgot', {error: 'Email sended', username: ''});
            }).catch((err)=> {
                res.render('forgot', {error: err, username: ''});
            });
        });
    });
}); 

// Routers
//Route users
const users = require('./router/users');
app.use('/users', userCheck, users);

// Route groups
const groups = require('./router/groups');
app.use('/groups', userCheck, groups);

// Route activities
const activities = require('./router/activities');
app.use('/activities', userCheck, activities);

// Route locations
const locations = require('./router/location');
app.use('/locations', userCheck, locations);

// Route leiding
const leiding = require('./router/leiding');
app.use('/leiding', userCheck, leiding);

const vk = require('./router/vk');
app.use('/vk', userCheck, vk);

const newsfeed = require('./router/newsfeeds');
app.use('/newsfeed', authCheck, adminCheck, userCheck, newsfeed);

const reset = require('./router/reset');
app.use('/reset', reset);

app.listen(port, ()=> {
    console.log('Server running on port ' + port);
});
