const express = require('express');
const router = express.Router();
const con = require('../connect');

// Route GET all activities + form
router.get('/', (req, res)=>{
    con.query('SELECT * FROM groups', (err, groups)=>{
        if(err) return res.json({err: 'Feilid to get group'});
        con.query('SELECT * FROM activities', (err, activities)=>{
            if(err) return res.json({err: 'Failed to get activities'});
            res.render('create_activities', {groups:groups, activities:activities});
        }); 
    });
});

// Route POST create activity
router.post('/create', (req, res)=>{
    con.query('SELECT group_id, name FROM groups WHERE name = ?', req.body.group_name,(err, group)=>{
        const group_id = JSON.parse(JSON.stringify(group));
        const activity = {
            title: req.body.title,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            meetingpoint: req.body.meetingpoint,
            description: req.body.description,
            start_publication: req.body.start_publication,
            end_publication: req.body.end_publication,
            group_id: group[0].group_id
        }

        if(activity != null) {
            con.query('INSERT INTO activities SET ?', activity, (err, activity)=> {
                if(err) return res.json({err: 'Failed to make activity'});
                res.redirect('/activities');
            });
        }
    });
});

// Route GET all activities for one group
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

// Route DELETE One activity
router.delete('/delete/:id', (req, res)=>{
    con.query('DELETE FROM activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
        if(err) return res.json({err: 'Failed to delete activity'});
        res.redirect('/activities');
    });
});

module.exports = router;