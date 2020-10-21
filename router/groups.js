const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/', (req, res)=>{
    res.send('groups');
});

router.get('/:group_name/info', (req, res)=> {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err, group)=> {
        if(err) return res.render('badrequest', {error: err});

        con.query('SELECT * FROM locations WHERE location_id = ?', group[0].location_id, (err, location) => {
            if(err) return res.render('badrequest', {error: err});

            con.query('SELECT * FROM activities WHERE group_id = ? AND end_publication > ?', [group[0].group_id, new Date()], (err, activities)=> {
                if(err) return res.render('badrequest', {error: err});

                con.query('SELECT * FROM users WHERE group_id = ?', group[0].group_id, (err, leaders) =>{
                    if(err) return res.render('badrequest', {error: err});

                    res.render('./group_pages/info', {
                        group: group[0],
                        location: location[0], 
                        leaders: leaders, 
                        activities: activities, 
                        moment: require('moment')
                    });
                })
            });
        })
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