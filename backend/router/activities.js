const express = require('express');
const router = express.Router();
const con = require('../connect');
const authCheck = require('../middleware/authCheck');
const adminCheck = require('../middleware/adminCheck');
const userCheck = require('../middleware/userCheck');

// Route GET all activities + form
router.get('/', userCheck, adminCheck, (req, res)=> {
    con.query('SELECT * FROM activities', (err, activities)=> {
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        return res.status(200).json({"statuscode": 200, activities: activities});
    });
});

router.get('/me', userCheck, (req, res)=>{
    console.log(JSON.stringify(req.cookies));
    if(req.user.group_id == undefined) return res.status(401).json({"statusCode": 401, "error": "Log in before consulting this endpoint"});
    con.query('SELECT * FROM `groups` WHERE group_id = ?', req.user.group_id, (err, groups)=>{
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        con.query('SELECT * FROM activities WHERE group_id = ?', req.user.group_id, (err, activities)=>{
            if(err) return res.status(400).json({"statuscode": 400, error: err});
            return res.status(200).json({"statuscode": 200, activities:activities});
        }); 
    });
});

router.get('/:id', (req, res)=>{
    con.query('SELECT * FROM activities WHERE activity_id = ?', req.params.id, (err, activity)=> {
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        if (activity[0] == null) return res.status(404).json({"statuscode": 404, "error": "Activity not found"});
        return res.json({
            activity: activity[0],
            moment: require('moment'),
            username: req.user.username
        })
    });
});

// Route GET form
// router.get('/create', authCheck, (req, res)=>{
//     con.query('SELECT * FROM `groups` WHERE group_id = ?', req.user.group_id, (err, groups)=>{
//         if(err) return res.status(400).json({"statuscode": 400, error: err});
//         con.query('SELECT * FROM activities WHERE group_id = ?', req.user.group_id, (err, activities)=>{
//             if(err) return res.status(400).json({"statuscode": 400, error: err});
//             return res.json({
//                 groups:groups, 
//                 activities:activities,
//                 user: req.user, 
//                 admin: req.admin, 
//                 username: req.user.username,
//                 moment: require('moment')
//             });
//         }); 
//     });
// });

// Route POST create activity
router.post('/create', userCheck, (req, res)=>{
    con.query('SELECT group_id, name FROM `groups` WHERE name = ?', req.body.groupName,(err, group)=>{
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        const activity = {
            title: req.body.title,
            start_date: req.body.startTime,
            end_date: req.body.endTime,
            meetingpoint: req.body.meetingpoint,
            description: req.body.description,
            start_publication: req.body.startPublication,
            end_publication: req.body.endPublication,
            group_id: group[0].group_id
        }
        console.log(req.user.group_id);
        if(activity.title != '') {
            if (group[0].group_id === req.user.group_id || req.admin) {
                con.query('INSERT INTO activities SET ?', activity, (err, activity)=> {
                    if(err) {
                        if(err.code = 'ER_TRUNCATED_WRONG_VALUE') {
                            // con.query('SELECT * FROM activities WHERE group_id = ?', group[0].group_id,(err, activities)=>{
                            //     if(err) return res.render('badrequest', {error: err});
                            //     res.render('create_activities', {
                            //         groups: group,
                            //         activities: activities,
                            //         user: req.user,
                            //         admin: req.admin,
                            //         username: req.user.username,
                            //         moment: require('moment'),
                            //         error: 'Er is een datum niet ingevuld!'
                            //     });
                            // });
                            return res.status(400).json({"statuscode": 400, "error": "No date given"});
                        } else {
                            return res.status(400).json({"statuscode": 400, "error": err});
                        }
                    } else {
                        return res.json({"statusCode" : 200,"message": "Created activity succesfully"});
                    }
                });
            } else {
                return res.status(401).json({"statusCode": 401, "error":'Cannot create activities for another group'});
            }
        } else {
            if(activity.title == ''){
                // con.query('SELECT * FROM activities WHERE group_id = ?', group[0].group_id, (err, activities)=>{
                //     if (err) return res.status(400).json({"statuscode": 400, error: err});
                //     res.render('create_activities', {
                //         groups: group,
                //         activities: activities,
                //         user: req.user,
                //         admin: req.admin,
                //         username: req.user.username,
                //         moment: require('moment'),
                //         error: 'Titel is leeg!'
                //     });
                // });
                return res.status(400).json({"statuscode": 400, "error": "No title given"});
            }
        }
    });
});

// Route DELETE One activity
router.get('/delete/:id', authCheck,(req, res)=>{
    if(req.user.group_id == undefined) return res.status(401).json({"statuscode": 401, "error": "Log in before consulting this endpoint"});
    con.query('DELETE FROM activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        return res.json({"message": "Deleted activity succesfully"});
    });
});

// Router GET update activity
// router.get('/update/:id', authCheck,(req, res)=>{
//     con.query('SELECT * from activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
//         if(err) return res.status(400).json({"statuscode": 400, error: err});
//         con.query('SELECT name FROM `groups` WHERE group_id = ?', activity[0].group_id, (err, group_name)=>{
//             if(err) return res.status(400).json({"statuscode": 400, error: err});
//             return res.json({
//                 activity: activity[0],
//                 group_name: group_name[0].name,
//                 group_id: activity[0].group_id,
//                 admin: req.admin,
//                 username: req.user.username,
//                 user: req.user,
//                 moment: require('moment')
//             });
//         });
//     });
// });


// Route UPDATE One activity
router.put('/update/:id', authCheck,(req, res)=>{
    con.query('SELECT group_id, name FROM `groups` WHERE name = ?', req.body.groupName,(err, group)=>{
        if(err) return res.status(400).json({"statusCode": 400, error: err});
        const data = req.body;
        const updated_activity = {
            title: data.title,
            start_date: data.startTime,
            end_date: data.endTime,
            meetingpoint: data.meetingpoint,
            description: data.description,
            start_publication: data.startPublication,
            end_publication: data.endPublication,
            group_id: group[0].group_id
        }
        if(updated_activity.title != '') {
            if(group[0].group_id === req.user.group_id.toString() || req.admin) {
                con.query(`UPDATE activities SET ? WHERE activity_id = ?`, [updated_activity, req.params.id], (err, activity)=>{
                    if(err) {
                        if(err.code = 'ER_TRUNCATED_WRONG_VALUE'){
                            // con.query('SELECT * from activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
                            //     if(err) return res.render('badrequest', {error: err});
                            //     con.query('SELECT name FROM `groups` WHERE group_id = ?', activity[0].group_id, (err, group_name)=>{
                            //         if(err) return res.render('badrequest', {error: err});
                            //         res.render('update_activity', {
                            //             activity: activity[0],
                            //             group_name: group_name[0].name,
                            //             group_id: activity[0].group_id,
                            //             admin: req.admin,
                            //             username: req.user.username,
                            //             user: req.user,
                            //             moment: require('moment'),
                            //             error: 'Er is een datum niet ingevuld!'
                            //         });
                            //     });
                            // });
                            return res.status(400).json({"statuscode": 400, "error": "No date was given"});
                        } else {
                            return res.status(400).json({"statuscode": 400, error: err});
                        }  
                    } 
                    return res.json({"statusCode": 200, "message": "Activity updated succesfully"});
                });
            } else {
                // con.query('SELECT * from activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
                //     if(err) return res.render('badrequest', {error: err});
                //     con.query('SELECT name FROM `groups` WHERE group_id = ?', activity[0].group_id, (err, group_name)=>{
                //         if(err) return res.render('badrequest', {error: err});
                //         res.render('update_activity', {
                //             activity: activity[0],
                //             group_name: group_name[0].name,
                //             group_id: activity[0].group_id,
                //             admin: req.admin,
                //             username: req.user.username,
                //             user: req.user,
                //             moment: require('moment'),
                //             error: 'cannot update activity from another group'
                //         });
                //     });
                // });
                return res.status(401).json({"statuscode": 401, error: "Cannot update activity from another group"});
            }
        } else {
            // con.query('SELECT * from activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
            //     if(err) return res.render('badrequest', {error: err});
            //     con.query('SELECT name FROM `groups` WHERE group_id = ?', activity[0].group_id, (err, group_name)=>{
            //         if(err) return res.render('badrequest', {error: err});
            //         res.render('update_activity', {
            //             activity: activity[0],
            //             group_name: group_name[0].name,
            //             group_id: activity[0].group_id,
            //             admin: req.admin,
            //             username: req.user.username,
            //             user: req.user,
            //             moment: require('moment'),
            //             error: 'Titel is leeg!'
            //         });
            //     });
            // });
            return res.status(400).json({"statuscode": 400, error: "No title was given"});
        }
    });
});

module.exports = router;