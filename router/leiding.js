const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/info', (req, res)=> {
    res.render('leiding');
});

router.get('/bondsteam', (req, res)=> {
    con.query('SELECT * FROM users WHERE bondsteam <> "/"', (err, users)=>{
        if(err) return res.render('badrequest');
        res.render('bondsteam', {users: users});
    });
});

module.exports = router;