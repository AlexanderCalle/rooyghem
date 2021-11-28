const express = require('express');
const con = require('../connect');
const bcrypt = require('bcryptjs')
const router = express.Router();

// router.get('/:token', (req, res)=> {
//     var date = new Date().toJSON().slice(0, 19)
//     con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired > ?', [req.params.token, date], (err, user)=> {
//         if(err) return res.status(400).json({"statuscode": 400, error: err});
//         if(!user[0]) return res.status(404).json({"statuscode": 404, error: "Invalid token"});
//         res.render('reset', {token: req.params.token});
//     });
// });

router.post('/:token', (req, res) => {
    var date = new Date().toJSON().slice(0, 19)
    con.query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpired > ?', [req.params.token, date], (err, user) => {
        if (err) return res.render('badrequest', { error: err });
        if (!user[0]) return res.status(404).json({ "statuscode": 404, error: "Invalid token" });
        if (req.body.password == req.body.confirm) {
            bcrypt.hash(req.body.password, 11, (err, hash) => {
                const data = {
                    passhash: hash,
                    resetPasswordToken: undefined,
                    resetPasswordExpired: undefined,
                }

                con.query('UPDATE users SET ? WHERE resetPasswordToken = ?', [data, req.params.token], (err, user) => {
                    if (err) return res.status(400).json({ "statuscode": 400, error: err });
                    return res.json({ "message": "Password was changed" });
                });
            });
        } else {
            return res.status(400).json({ "statuscode": 400, "error": "passwords did not match" });
        }
    });
});

module.exports = router;