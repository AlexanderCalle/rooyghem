const express = require('express');
const authCheck = require('../middleware/authCheck');
const con = require('../connect');
const router = express.Router();

router.get('/', authCheck,(req, res)=>{
    con.query('SELECT story FROM groups WHERE group_id = ?', req.user.group_id, (err, group)=>{
        if(err) return console.log(err);
        res.render('vk', {vk: group[0].story, admin: req.admin});
    });
});

router.put('/', authCheck,(req, res)=>{
    const data = req.body;
    con.query('UPDATE groups SET story = ? WHERE group_id = ?', [data.story, req.user.group_id], (err, story)=>{
        if(err) return console.log(err);
        res.redirect('/vk');
    });
});

module.exports = router;