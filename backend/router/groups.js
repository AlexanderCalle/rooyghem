const express = require('express');
const router = express.Router();
const con = require('../connect');
const path = require('path');

router.get('/', (req, res) => {
    con.query('SELECT * FROM `groups` WHERE group_id <= 6', (err, groups) => {
<<<<<<< HEAD:backend/router/groups.js
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        groups.forEach(group => {
            group.logo = '/groups/' + group.name + '/logo';
        })
        return res.status(200).json({
            groups: groups
=======
        if (err) return res.render('badrequest', { error: err });
        res.render('groups', {
            groups: groups,
            username: req.user.username
>>>>>>> develop:router/groups.js
        });
    })
});

<<<<<<< HEAD:backend/router/groups.js
router.get('/:group_name/logo', (req, res) => {
    con.query('SELECT logo FROM `groups` WHERE name = ?', req.params.group_name, (err, logo_path) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        if (logo_path[0] == null) return res.status(404).json({ "statuscode": 404, "error": "Group not found" });
        console.log(logo_path[0].logo);
        res.sendFile(path.join(__dirname, '..', logo_path[0].logo));
    });
});

router.get('/:group_name/info', (req, res) => {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err, group) => {

        if (err) return res.status(400).json({ "statuscode": 400, error: err });

        if (group.length === 0) return res.status(404).json({ "statuscode": 404, error: "Group not found" });
        group[0].logo = req.protocol + '://' + req.headers.host + '/groups/' + req.params.group_name + '/logo';
        group[0].contact = req.params.group_name + '@ksarooyghem.be';
        con.query('SELECT * FROM locations WHERE location_id = ?', group[0].location_id, (err, location) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });
            location[0].picture = '/locations/' + location[0].location_id + '/picture';
            con.query('SELECT * FROM activities WHERE group_id = ? AND end_publication > ?', [group[0].group_id, new Date()], (err, activities) => {
                if (err) return res.status(400).json({ "statuscode": 400, error: err });
                con.query('SELECT user_id, firstname, lastname, email, is_banleader FROM users WHERE group_id = ? ORDER BY is_banleader DESC, lastname ASC', group[0].group_id, (err, leaders) => {
                    if (err) return res.status(400).json({ "statuscode": 400, error: err });
                    leaders.forEach(leader => {
                        leader.picture = req.protocol + '://' + req.headers.host + '/users/single/' + leader.user_id + '/picture';
                    });
                    con.query('SELECT * FROM albums WHERE group_id = ? AND checked = 1 ORDER BY activity_end DESC', group[0].group_id, (err, albums) => {
                        if (err) return res.status(400).json({ "statuscode": 400, error: err });
                        if (albums[0] != null) {

                            const sortedAlbums = albums.sort((a, b) => {
                                return new Date(a.end_date) - new Date(b.end_date);
                            });

                            const groups = albums.reduce((groups, album) => {
                                const dateString = album.activity_end.toString();
                                const date = new Date(dateString);
                                const month = date.getMonth() + 1;

                                if (month >= 1 && month <= 8) {
                                    const year = parseInt(date.getFullYear()) - 1 + " - " + date.getFullYear();

                                    if (!groups[year]) {
                                        groups[year] = [];
                                    }

                                    groups[year].push(album);
                                }

                                if (month >= 9 && month <= 12) {
                                    const year = date.getFullYear() + " - " + (parseInt(date.getFullYear()) + 1).toString();

                                    if (!groups[year]) {
                                        groups[year] = [];
                                    }

                                    groups[year].push(album);
                                }

                                return groups;
                            }, {})

                            const groupedAlbums = Object.keys(groups).map((date) => {
                                return {
                                    date,
                                    albums: groups[date]
                                };
                            });


                            return res.json({
                                group: group[0],
                                location: location[0],
                                leaders: leaders,
                                activities: activities,
                                username: req.user.username,
                                albums: groupedAlbums,
                                moment: require('moment')
                            });
                        } else {
                            return res.json({
                                group: group[0],
                                location: location[0],
                                leaders: leaders,
                                activities: activities,
                                username: req.user.username,
                                albums: null,
                                moment: require('moment')
                            });
                        }
=======
router.get('/:group_name/info', (req, res) => {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err, group) => {

        if (err) return res.render('badrequest', { error: err });

        if (group.length === 0) return res.render('badrequest', { error: "No group found for " + req.params.group_name })

        con.query('SELECT * FROM locations WHERE location_id = ?', group[0].location_id, (err, location) => {
            if (err) return res.render('badrequest', { error: err });

            con.query('SELECT * FROM activities WHERE group_id = ? AND end_publication > ?', [group[0].group_id, new Date()], (err, activities) => {
                if (err) return res.render('badrequest', { error: err });
                con.query('SELECT firstname, lastname, email, is_banleader, path_pic FROM users WHERE group_id = ? ORDER BY is_banleader DESC, lastname ASC', group[0].group_id, (err, leaders) => {
                    if (err) return res.render('badrequest', { error: err });
                    res.render('./group_pages/info', {
                        group: group[0],
                        location: location[0],
                        leaders: leaders,
                        activities: activities,
                        username: req.user.username,
                        moment: require('moment')
>>>>>>> develop:router/groups.js
                    });
                })
            });
        })
    });
});

<<<<<<< HEAD:backend/router/groups.js
router.get('/:group_name/info/activities', (req, res) => {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err, groups) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        if (groups[0] == null) return res.status(404).json({ "statuscode": 404, error: "Group not found" });
        con.query('SELECT * FROM activities WHERE group_id = ?', groups[0].group_id, (err, activities) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });
=======
router.get('/:group_name/info/events', (req, res) => {
    con.query('SELECT * FROM `groups` WHERE name = ?', req.params.group_name, (err, groups) => {
        if (err) return res.render('badrequest', { error: err });
        con.query('SELECT * FROM activities WHERE group_id = ?', groups[0].group_id, (err, activities) => {
            if (err) return res.render('badrequest', { error: err });
>>>>>>> develop:router/groups.js
            let events = [];
            activities.forEach(activity => {
                events.push({
                    id: activity.activity_id,
                    title: activity.title,
                    start: activity.start_date,
                    end: activity.end_date,
                });
            });
            res.status(200).json({ "activities": events })
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
