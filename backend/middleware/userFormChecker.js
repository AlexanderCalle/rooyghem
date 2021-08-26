const con = require('../connect');
const fs = require('fs');

module.exports = (req, res, next) => {
    const data = req.body;
    if(data.firstname != '' && data.lastname != '' && data.email != '' && data.username != '' && data.password != '' && data.phone != '') {
        next();
    } else {
        con.query('SELECT * FROM `groups`', (err, groups)=> {
            if(err) return res.render('badrequest', {error: err});
            con.query('SELECT * FROM users', (err, users)=>{
                if(err) return res.render('badrequest', {error: err});
                res.render('users', {
                    groups: groups, 
                    users: users, 
                    admin: req.admin,
                    user: req.user,
                    username: req.user.username,
                    error: 'Vul alles in!'
                });
                if(req.file) {fs.unlinkSync(process.env.LEIDING_PATH + req.file.filename)}
            });
        });
    }
}