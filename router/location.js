const express = require('express');
const router = express.Router();
const con = require('../connect');

router.get('/', (req, res)=>{
    res.send('location');
});

router.get('/:group_name', (req, res)=>{
    con.query('SELECT location_id, name FROM `groups` WHERE name = ?', req.params.group_name, (err, group)=> {
        if(err) return res.render('badrequest');
        con.query('SELECT * FROM locations WHERE location_id = ?', group[0].location_id, (err, locations)=> {
            if(err) return res.render('badrequest');
            res.render('./group_pages/location', {
                location: locations[0],
                group: group[0]
            })
        });
    });
});

module.exports = router;