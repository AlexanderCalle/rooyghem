const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/', (req, res)=>{
    res.send('groups');
});

router.get('/:group_name/info', (req, res)=> {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err, group)=> {
        if(err) return res.render('badrequest');
        res.render('./group_pages/info', {group: group[0]});
    });
});

router.get('/:group_name/vk', (req, res)=> {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err,group)=>{
        if(err) return res.render('badrequest');
        res.render('./group_pages/vk', {group: group[0]});
    });
});

router.get('/:group_name/leiding', (req, res)=> {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err,group)=>{
        if(err) return res.render('badrequest');
        con.query('SELECT * from users WHERE group_id = ?', group[0].group_id, (err, users)=> {
            if(err) return res.render('badrequest');
            res.render('./group_pages/leiding', {group: group[0], users: users});
        });
    });
});

module.exports = router;