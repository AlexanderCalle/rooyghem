const express = require('express');
const con = require('../connect');
const bcrypt = require('bcryptjs')
const router = express.Router();

router.get('/:token', (req, res)=> {
    con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired <= ?', [req.params.token, Date.now()], (err, user)=> {
        if(err) return res.render('badrequest', {error: err});
        res.render('reset', {token: req.params.token, username: ''});
    });
});

router.post('/:token', (req, res)=> {
    con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired <= ?', [req.params.token, Date.now()], (err, user)=> {
        if(err) return res.render('badrequest', {error: err});
        if(req.body.password == req.body.confirm) {
            bcrypt.hash(req.body.password, 11, (err, hash)=> {
                const data = {
                    passhash: hash,
                    resetPasswordToken: undefined,
                    resetPasswordExpired: undefined,
                }

                con.query('UPDATE users SET ? WHERE resetPasswordToken = ?', [data, req.params.token], (err, user)=> {
                    if(err) return res.render('badrequest', {error: err});
                    res.render('reset', {token: req.params.token, username: '', error: 'Wachtwoord is gereset'})
                });
            });
        } else {
            res.render('reset', {token: req.params.token, username: '', error: 'Wachtwoorden kloppen niet!'})
        }
    });
});

module.exports = router;