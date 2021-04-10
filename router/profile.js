const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/:id', (req, res) => {
    con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=> {
        if(err) return res.render('badrequest', {error: err});
        res.render('profile', {
            username: users[0].username,
            user: users[0],
            admin: req.admin
        })
    });
});

router.get('/update/:id', (req, res) => {
    con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=> {
        if(err) return res.render('badrequest', {error: err});
        res.render('profile_update', {
            username: users[0].username,
            user: users[0],
            admin: req.admin
        })
    });
});

router.post('/update/:id', (req, res) => {

    const data = {
        email: req.body.email,
        phone: req.body.phone
    }

    con.query('UPDATE users SET ? WHERE user_id = ?', [data, req.params.id], (err, user) => {
        if (err) return res.render('badrequest', {error: err});
        con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=> {
            if(err) return res.render('badrequest', {error: err});
            res.render('profile_update', {
                username: users[0].username,
                user: users[0],
                admin: req.admin,
                succesError: 'Profiel is veranderd!'
            })
        });
    });
});

module.exports = router;