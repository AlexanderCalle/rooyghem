const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/', (req, res)=>{
    con.query('SELECT * FROM `groups` WHERE group_id <= 6', (err, groups)=> {
        if(err) return res.render('badrequest', {error: err});
        res.render('groups', {
            groups: groups,
            username: req.user.username
        });
    })
});

router.get('/:group_name/info', (req, res)=> {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err, group)=> {
        
        if(err) return res.render('badrequest', {error: err});

        if (group.length === 0) return res.render('badrequest', {error: "No group found for " + req.params.group_name})

        con.query('SELECT * FROM locations WHERE location_id = ?', group[0].location_id, (err, location) => {
            if(err) return res.render('badrequest', {error: err});

            con.query('SELECT * FROM activities WHERE group_id = ? AND end_publication > ?', [group[0].group_id, new Date()], (err, activities)=> {
                if(err) return res.render('badrequest', {error: err});
                con.query('SELECT firstname, lastname, email, is_banleader, path_pic FROM users WHERE group_id = ? ORDER BY is_banleader DESC, lastname ASC', group[0].group_id, (err, leaders) =>{
                    if(err) return res.render('badrequest', {error: err});
                    
                    con.query('SELECT * FROM albums WHERE group_id = ? AND checked = 1', group[0].group_id, (err, albums) => {
                        if(err) return res.render('badrequest', {error: err});
                        if(albums[0] != null){
                            res.render('./group_pages/info', {
                                group: group[0],
                                location: location[0], 
                                leaders: leaders, 
                                activities: activities, 
                                username: req.user.username,
                                albums: albums,
                                moment: require('moment')
                            });
                        } else {
                            res.render('./group_pages/info', {
                                group: group[0],
                                location: location[0], 
                                leaders: leaders, 
                                activities: activities, 
                                username: req.user.username,
                                albums: null,
                                moment: require('moment')
                            });
                        }
                    });

                })
            });
        })
    });
});

router.get('/:group_name/info/events', (req,res)=> {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err, groups)=> {
        if(err) return res.render('badrequest', {error: err});
        con.query('SELECT * FROM activities WHERE group_id = ?', groups[0].group_id, (err, activities)=> {
            if(err) return res.render('badrequest', {error: err});
            let events = [];
            activities.forEach(activity => {
                events.push({
                    id: activity.activity_id,
                    title: activity.title,
                    start: activity.start_date,
                    end: activity.end_date,
                });
            });
            res.send(events)
        });
    });
});

// router.get('/:group_name/vk', (req, res)=> {
//     con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err,group)=>{
//         if(err) return res.render('badrequest', {error: err});
//         res.render('./group_pages/vk', {group: group[0]});
//     });
// });

// router.get('/:group_name/leiding', (req, res)=> {
//     con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err,group)=>{
//         if(err) return res.render('badrequest', {error: err});
//         con.query('SELECT * from users WHERE group_id = ?', group[0].group_id, (err, users)=> {
//             if(err) return res.render('badrequest', {error: err});
//             res.render('./group_pages/leidinggevende', {group: group[0], users: users});
//         });
//     });
// });

module.exports = router;
