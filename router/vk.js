const express = require('express');
const authCheck = require('../middleware/authCheck');
const adminCheck = require('../middleware/adminCheck');
const con = require('../connect');
const router = express.Router();

router.get('/', authCheck,(req, res)=>{
    con.query('SELECT story FROM `groups` WHERE group_id = ?', req.user.group_id, (err, group)=>{
        if(err) return res.render('badrequest', {error: err});
        res.render('vk', {vk: group[0].story, admin: req.admin, user: req.user, username: req.user.username});
    });
});

router.put('/', authCheck,(req, res)=>{
    const data = req.body;
    data.story = data.story.replace(/\n/g, '\n');
    con.query('UPDATE `groups` SET story = ? WHERE group_id = ?', [data.story, req.user.group_id], (err, story)=>{
        if(err) return res.render('badrequest', {error: err});
        con.query('SELECT story FROM `groups` WHERE group_id = ?', req.user.group_id, (err, group)=>{
            if(err) return res.render('badrequest', {error: err});
            res.render('all_vk_form', 
            {vk: group[0].story, 
                admin: req.admin, 
                user: req.user, 
                username: req.user.username, 
                group_id: req.params.group_id,
                succesError: 'Verhaal is gepost!'
            });
        });
    });
});

router.get('/allvk', authCheck, adminCheck, (req, res)=> {
    con.query('SELECT * from `groups`', (err, groups) => {
        res.render('all_vk', {
            groups: groups,
            admin: req.admin, 
            user: req.user, 
            username: req.user.username
        })
    })
});

router.get('/allvk/:group_id', authCheck, adminCheck, (req, res)=>{
    con.query('SELECT story FROM `groups` WHERE group_id = ?', req.params.group_id, (err, group)=>{
        if(err) return res.render('badrequest', {error: err});
        res.render('all_vk_form', {vk: group[0].story, admin: req.admin, user: req.user, username: req.user.username, group_id: req.params.group_id});
    });
});

router.put('/allvk/:group_id', authCheck, adminCheck, (req, res)=>{
    const data = req.body;
    data.story = data.story.replace(/\n/g, '\n');
    con.query('UPDATE `groups` SET story = ? WHERE group_id = ?', [data.story, req.params.group_id], (err, story)=>{
        if(err) return res.render('badrequest', {error: err});
        con.query('SELECT story FROM `groups` WHERE group_id = ?', req.params.group_id, (err, group)=>{
            if(err) return res.render('badrequest', {error: err});
            res.render('all_vk_form', 
            {vk: group[0].story, 
                admin: req.admin, 
                user: req.user, 
                username: req.user.username, 
                group_id: req.params.group_id,
                succesError: 'Verhaal is gepost!'
            });
        });
    });
});

module.exports = router;