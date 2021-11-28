const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/:id', (req, res) => {
    con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=> {
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        if(users[0] == null) return res.status(404).json({"statuscode": 404, error: "User not found"});
        return res.json({
            "statuscode": 200,
            user: users[0],
        })
    });
});

router.put('/update/:id', (req, res) => {

    const data = {
        email: req.body.email,
        phone: req.body.phone
    }

    con.query('UPDATE users SET ? WHERE user_id = ?', [data, req.params.id], (err, user) => {
        if (err) return res.render('badrequest', {error: err});
        con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=> {
            if(err) return res.render('badrequest', {error: err});
            res.json({
                "statuscode": 200,
                message: 'Profiel is veranderd!'
            })
        });
    });
});

module.exports = router;