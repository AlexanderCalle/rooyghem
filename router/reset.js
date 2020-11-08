const express = require('express');
const con = require('../connect');
const bcrypt = require('bcryptjs')
const router = express.Router();

router.get('/:token', (req, res)=> {
    var date = new Date().toJSON().slice(0, 19)
    con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired > ?', [req.params.token, date], (err, user)=> {
        if(err) return res.render('badrequest', {error: err});
        if(!user[0]) return res.render('reset', {token: req.params.token, error: 'Token bestaat niet of is verlopen'});
        res.render('reset', {token: req.params.token});
    });
});

router.post('/:token', (req, res)=> {
    var date = new Date().toJSON().slice(0, 19)
    con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired > ?', [req.params.token, date], (err, user)=> {
        if(err) return res.render('badrequest', {error: err});
        if(!user[0]) return res.render('reset', {token: req.params.token, error: 'Token bestaat niet of is verlopen'});
        if(req.body.password == req.body.confirm) {
            bcrypt.hash(req.body.password, 11, (err, hash)=> {
                const data = {
                    passhash: hash,
                    resetPasswordToken: undefined,
                    resetPasswordExpired: undefined,
                }

                con.query('UPDATE users SET ? WHERE resetPasswordToken = ?', [data, req.params.token], (err, user)=> {
                    if(err) return res.render('badrequest', {error: err});
                    res.render('reset', {token: req.params.token, succesError: 'Wachtwoord werd veranderd'})
                });
            });
        } else {
            res.render('reset', {token: req.params.token, error: 'Wachtwoorden komen niet overeen'})
        }
    });
});

module.exports = router;