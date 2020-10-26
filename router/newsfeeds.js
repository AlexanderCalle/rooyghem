const express = require('express');
const router = express.Router();
const con = require('../connect');
const authCheck = require('../middleware/authCheck');

// Route GET all newsfeeds + form
router.get('/', authCheck,(req, res)=>{
    con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
        if (err) return res.render('badrequest', {error: err});
        res.render('create_newsfeed', {
            newsfeeds: newsfeeds,
            user: req.user,
            admin: req.admin,
            moment: require('moment')
        });
    });
});

// TODO: implement viewing of one newsfeed
// router.get('/activity/:id', (req, res)=>{
//     con.query('SELECT * FROM activities WHERE activity_id = ?', req.params.id, (err, activity)=> {
//         if(err) return res.render('badrequest', {error: err});
//         res.render('./group_pages/single_activity', {
//             activity: activity[0],
//             moment: require('moment')
//         })
//     });
// });

// Route POST create newsfeed
router.post('/create', authCheck,(req, res)=>{
    const newsfeed = {
        title: req.body.title,
        description: req.body.description,
        start_publication: req.body.start_publication,
        end_publication: req.body.end_publication,
        picture_path: req.body.picture_path,
        created_by: req.user.user_id
    }
    console.log("User: " + req.user.user_id);
    if(newsfeed != null) {
        con.query('INSERT INTO newsfeeds SET ?', newsfeed, (err, nf) => {
            if(err) return res.render('badrequest', {error: err});
            res.redirect("/newsfeed");
        })
    } else {
        res.render('badrequest', {error: {
            message: 'please fill everything in'
        }});
    }
});

// TODO: delete newsfeed
// Route DELETE One activity
// router.delete('/delete/:id', authCheck,(req, res)=>{
//     con.query('DELETE FROM activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
//         if(err) return res.render('badrequest', {error: err});
//         res.redirect('/activities');
//     });
// });

// TODO: page for updating a newsfeed
// Router GET update newsfeed
// router.get('/update/:id', authCheck,(req, res)=>{
//     con.query('SELECT * from activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
//         if(err) return res.render('badrequest', {error: err});
//         con.query('SELECT name FROM `groups` WHERE group_id = ?', activity[0].group_id, (err, group_name)=>{
//             if(err) return res.render('badrequest', {error: err});
//             res.render('update_activity', {
//                 activity: activity[0],
//                 group_name: group_name[0].name,
//                 group_id: activity[0].group_id,
//                 admin: req.admin,
//                 moment: require('moment')
//             })
//         });
//     });
// });

// TODO: update one newsfeed
// Route UPDATE One activity
// router.put('/update/:id', authCheck,(req, res)=>{
//     const data = req.body;
//     const updated_activity = {
//         title: data.title,
//         start_date: data.start_date,
//         end_date: data.end_date,
//         meetingpoint: data.meetingpoint,
//         description: data.description,
//         start_publication: data.start_publication,
//         end_publication: data.end_publication,
//         group_id: data.group_id
//     }
//     if(updated_activity != null) {
//         if(req.user.user_id == 1) {
//             con.query(`UPDATE activities SET ? WHERE activity_id = ?`, [updated_activity, req.params.id], (err, activity)=>{
//                 if(err) return res.render('badrequest', {error: err});
//                 res.redirect('/activities');
//             });
//         } else if(data.group_id === req.user.group_id.toString()) {
//             con.query(`UPDATE activities SET ? WHERE activity_id = ?`, [updated_activity, req.params.id], (err, activity)=>{
//                 if(err) return res.render('badrequest', {error: err});
//                 res.redirect('/activities');
//             });
//         } else {
//             con.query('SELECT * from activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
//                 if(err) return res.render('badrequest', {error: err});
//                 con.query('SELECT name FROM `groups` WHERE group_id = ?', activity[0].group_id, (err, group_name)=>{
//                     if(err) return res.render('badrequest', {error: err});
//                     res.render('update_activity', {
//                         activity: activity[0],
//                         group_name: group_name[0].name,
//                         group_id: activity[0].group_id,
//                         error: 'cannot update activity from another group'
//                     });
//                 });
//             });
//         }
//     } else {
//         con.query('SELECT * from activities WHERE activity_id = ?', req.params.id, (err, activity)=>{
//             if(err) return res.render('badrequest', {error: err});
//             con.query('SELECT name FROM `groups` WHERE group_id = ?', activity[0].group_id, (err, group_name)=>{
//                 if(err) return res.render('badrequest', {error: err});
//                 res.render('update_activity', {
//                     activity: activity[0],
//                     group_name: group_name[0].name,
//                     group_id: activity[0].group_id,
//                     error: 'Please fill all fields in'
//                 });
//             });
//         });
//     }
// });

module.exports = router;