const con = require('../connect');
const fs = require('fs');

module.exports = (req, res, next) => {
    console.log(req.body);
    if(req.body.title != '' && req.body.description != '' && req.body.start_publication != '' && req.end_publication != '' ) {
        next();
    } else {
        con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
            if (err) return res.render('badrequest', {error: err});
            res.render('create_newsfeed', {
                newsfeeds: newsfeeds,
                user: req.user,
                admin: req.admin,
                username: req.user.username,
                moment: require('moment'),
                error: 'Vul alles in!'
            });
            if(req.file) {fs.unlinkSync(process.env.NEWSFEED_PATH + req.file.filename);}
        });
    }
}