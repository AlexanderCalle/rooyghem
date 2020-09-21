const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/', (req, res)=>{
    res.send('users');
});

router.get('/all', (req, res)=> {
    con.query('SELECT * FROM users', (err, users)=>{
        if(err) return res.json({message: 'Failed to load'});
        res.json(users);
    });
});

module.exports = router;