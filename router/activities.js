const express = require('express');
const router = express.Router();
const con = require('../connect');
const authCheck = require('../middleware/authCheck');

// Route GET all activities + form
router.get('/', authCheck,(req, res)=>{
    con.query('SELECT * FROM groups WHERE group_id = ?', req.user.group_id, (err, groups)=>{
        if(err) return res.render('badrequest');
        con.query('SELECT * FROM activities WHERE group_id = ?', req.user.group_id, (err, activities)=>{
            if(err) return res.render('badrequest');
            res.render('create_activities', {groups:groups, activities:activities, user: req.user, admin: req.admin});
        }); 
    });
});

// Route POST create activity
router.post('/create', authCheck,(req, res)=>{
    con.query('SELECT group_id, name FROM groups WHERE name = ?', req.body.group_name,(err, group)=>{
        if(err) return res.render('badrequest');
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
            if (group[0].group_id === req.user.group_id) {
                con.query('INSERT INTO activities SET ?', activity, (err, activity)=> {
                    if(err) return res.render('badrequest');
                    res.redirect('/activities');
                });
            } else {
                res.render('activities', {error: 'Cannot create activities for another group'})
            }
        } else {
            res.render('activities', {error: 'please fill everything in'});
        }
    });
});

// Route GET all activities for one group
router.get('/:group_name', (req, res)=>{
    con.query('SELECT group_id, name FROM groups WHERE name = ?', req.params.group_name, (err, group)=> {
        if(err) return res.render('badrequest');
        con.query('SELECT * FROM activities WHERE group_id = ?', group[0].group_id, (err, activities)=> {
            if(err) return res.render('badrequest');
            res.render('./group_pages/activities', {
                activities: activities,
                group: group[0]
            })
        });
    });
});

// Route DELETE One activity
router.delete('/delete/:id', authCheck,(req, res)=>{
    con.query('DELETE FROM activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
        if(err) return res.render('badrequest');
        res.redirect('/activities');
    });
});

// Router GET update activity
router.get('/update/:id', authCheck,(req, res)=>{
    con.query('SELECT * from activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
        if(err) return res.render('badrequest');
        con.query('SELECT name FROM groups WHERE group_id = ?', activity[0].group_id, (err, group_name)=>{
            if(err) return res.render('badrequest');
            res.render('update_activity', {
                activity: activity[0],
                group_name: group_name[0].name,
                group_id: activity[0].group_id
            })
        });
    });
});


// Route UPDATE One activity
router.put('/update/:id', authCheck,(req, res)=>{
    const data = req.body;
    const updated_activity = {
        title: data.title,
        start_date: data.start_date,
        end_date: data.end_date,
        meetingpoint: data.meetingpoint,
        description: data.description,
        start_publication: data.start_publication,
        end_publication: data.end_publication,
        group_id: data.group_id
    }
    if(updated_activity != null) {
        if (data.group_id === req.user.group_id.toString()) {
            con.query(`UPDATE activities SET ? WHERE activity_id = ?`, [updated_activity, req.params.id], (err, activity)=>{
                if(err) return res.render('badrequest');
                res.redirect('/activities');
            });
        } else {
            res.render('update_activity', {error: 'cannot update activity from another group'});
        }
    } else {
        res.render('update_activity', {error: 'please fill everything in'});
    }
});

module.exports = router;