const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/', (req, res)=>{
    res.send('activities');
});

router.get('/:group_name', (req, res)=>{
    con.query('SELECT group_id, name FROM groups WHERE name = ?', req.params.group_name, (err, group)=> {
        if(err) return res.json({err: 'Failed to get group_id'});
        con.query('SELECT * FROM activities WHERE group_id = ?', group[0].group_id, (err, activities)=> {
            if(err) return res.json({err: 'Failed to load activities'});
            res.render('./group_pages/activities', {
                activities: activities,
                group: group[0]
            })
        });
    });
});

module.exports = router;