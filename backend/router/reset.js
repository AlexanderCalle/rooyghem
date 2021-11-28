const express = require('express');
const con = require('../connect');
const bcrypt = require('bcryptjs')
const router = express.Router();

<<<<<<< HEAD:backend/router/reset.js
// router.get('/:token', (req, res)=> {
//     var date = new Date().toJSON().slice(0, 19)
//     con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired > ?', [req.params.token, date], (err, user)=> {
//         if(err) return res.status(400).json({"statuscode": 400, error: err});
//         if(!user[0]) return res.status(404).json({"statuscode": 404, error: "Invalid token"});
//         res.render('reset', {token: req.params.token});
//     });
// });
=======
router.get('/:token', (req, res) => {
    var date = new Date().toJSON().slice(0, 19)
    con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired > ?', [req.params.token, date], (err, user) => {
        if (err) return res.render('badrequest', { error: err });
        if (!user[0]) return res.render('reset', { token: req.params.token, error: 'Token bestaat niet of is verlopen' });
        res.render('reset', { token: req.params.token });
    });
});
>>>>>>> develop:router/reset.js

router.post('/:token', (req, res) => {
    var date = new Date().toJSON().slice(0, 19)
<<<<<<< HEAD:backend/router/reset.js
    con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired > ?', [req.params.token, date], (err, user)=> {
        if(err) return res.render('badrequest', {error: err});
        if(!user[0]) return res.status(404).json({"statuscode": 404, error: "Invalid token"});
        if(req.body.password == req.body.confirm) {
            bcrypt.hash(req.body.password, 11, (err, hash)=> {
=======
    con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired > ?', [req.params.token, date], (err, user) => {
        if (err) return res.render('badrequest', { error: err });
        if (!user[0]) return res.render('reset', { token: req.params.token, error: 'Token bestaat niet of is verlopen' });
        if (req.body.password == req.body.confirm) {
            bcrypt.hash(req.body.password, 11, (err, hash) => {
>>>>>>> develop:router/reset.js
                const data = {
                    passhash: hash,
                    resetPasswordToken: undefined,
                    resetPasswordExpired: undefined,
                }

<<<<<<< HEAD:backend/router/reset.js
                con.query('UPDATE users SET ? WHERE resetPasswordToken = ?', [data, req.params.token], (err, user)=> {
                    if(err) return res.status(400).json({"statuscode": 400, error: err});
                    return res.json({"message": "Password was changed"});
                });
            });
        } else {
            return res.status(400).json({"statuscode": 400, "error": "passwords did not match"});
=======
                con.query('UPDATE users SET ? WHERE resetPasswordToken = ?', [data, req.params.token], (err, user) => {
                    if (err) return res.render('badrequest', { error: err });
                    res.render('reset', { token: req.params.token, succesError: 'Wachtwoord werd veranderd' })
                });
            });
        } else {
            res.render('reset', { token: req.params.token, error: 'Wachtwoorden komen niet overeen' })
>>>>>>> develop:router/reset.js
        }
    });
});

module.exports = router;