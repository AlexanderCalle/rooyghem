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
const authCheck = require('./middleware/authCheck');
const adminCheck = require('./middleware/adminCheck');
const userCheck = require('./middleware/userCheck');
const sgMail = require('@sendgrid/mail');
const app = express();
const port = 2000 || procces.env.PORT;

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

app.get('/', userCheck, (req, res) => {
    const date = new Date();
    con.query('SELECT * FROM newsfeeds WHERE end_publication > ? AND start_publication <= ? ORDER BY start_publication', [date, date], (err, newsfeeds) => {
        if (err) return res.render('badrequest', { error: err });
        res.render('index', {
            newsfeeds: newsfeeds,
            moment: moment,
            username: req.user.username
        });
    });
});

app.get('/contact', userCheck, (req, res) => {
    con.query('SELECT firstname, lastname, email, path_pic, phone FROM users WHERE bondsteam = "bondsleider"', (err, users) => {
        res.render('contact', { bondsleiders: users, username: req.user.username });
    });
});

app.post('/contact', userCheck, (req, res) => {
    if (req.body.naam != '' && req.body.onderwerp != '' && req.body.bericht != '') {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: 'joris.deckmyn@ksarooyghem.be',
            from: 'ksarooyghemwebteam@gmail.com',
            subject: req.body.onderwerp,
            text: 'Hallo , \n\n' +
                'Vraag van: ' + req.body.naam + ', email: ' + req.body.email + ' \n\n' +
                req.body.bericht
        }

        sgMail.send(msg).then(() => {
            con.query('SELECT * FROM users WHERE bondsteam = "bondsleider"', (err, users) => {
                res.render('contact', { bondsleiders: users, username: req.user.username, succesError: 'Vraag werd verstuurd' });
            });
        }).catch((err) => {
            con.query('SELECT * FROM users WHERE bondsteam = "bondsleider"', (err, users) => {
                res.render('contact', { bondsleiders: users, username: req.user.username, error: err });
            });
        });
    } else {
        con.query('SELECT * FROM users WHERE bondsteam = "bondsleider"', (err, users) => {
            res.render('contact', { bondsleiders: users, username: req.user.username, error: 'Gelieve alle velden in te vullen' });
        });
    }
});

app.get('/overons', userCheck, (req, res) => {
    res.render('over_ons', { username: req.user.username });
});

app.get('/forgot', userCheck, (req, res) => {
    res.render('forgot', { username: req.user.username });
});

app.post('/forgot', (req, res) => {
    let token;

    crypto.randomBytes(20, (err, buf) => {
        token = buf.toString('hex');
    });

    con.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, users) => {
        if (err) return res.render('badrequest', { error: err });
        if (!users[0]) return res.render('forgot', { error: 'Er bestaat geen gebruiker met deze email!', username: '' });
        Date.prototype.addHours = function (h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }
        var date = new Date().addHours(2).toJSON().slice(0, 19);
        var data = {
            resetPasswordToken: token,
            resetPasswordExpired: date
        }
        con.query('UPDATE users SET ? WHERE email = ?', [data, req.body.email], (err, user) => {
            if (err) return res.render('badrequest', { error: err, username: '' });

            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
                to: req.body.email,
                from: 'ksarooyghemwebteam@gmail.com',
                subject: 'Wachtwoord resetten',
                text: 'Hallo ' + req.body.email + ', \n\n U hebt dit ontvangen omdat u gevraagd heeft om uw wachtwoord te herstellen, voor verdere instructies druk op de link hieronder\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'Als u dit niet gevraagd heb negeer dan deze mail.\n'
            }

            sgMail.send(msg).then(() => {
                res.render('forgot', { succesError: 'Email werd verzonden', username: '' });
            }).catch((err) => {
                res.render('forgot', { error: err, username: '' });
            });
        });
    });
});

app.get('/sitemap', function (_, res) {
    console.log(__dirname);
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname, "sitemap.xml"));
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

// Route Vk
const vk = require('./router/vk');
app.use('/vk', userCheck, vk);

// Route Newsfeed
const newsfeed = require('./router/newsfeeds');
app.use('/newsfeed', authCheck, adminCheck, userCheck, newsfeed);

// Route reset
const reset = require('./router/reset');
app.use('/reset', userCheck, reset);

// Route profile
const profile = require('./router/profile');
app.use('/profile', userCheck, authCheck, adminCheck, profile);

const wafelbak = require('./router/wafelbak');
app.use('/wafelbak', userCheck, wafelbak);


app.listen(port, () => {
    console.log('Server running on port ' + port);
});
