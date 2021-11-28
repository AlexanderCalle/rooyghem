const express = require('express');
const router = express.Router();
const con = require('../connect');
const path = require('path');

router.get('/', (req, res)=>{
    res.send('location');
});

router.get('/:group_name', (req, res)=>{
    con.query('SELECT location_id, name FROM `groups` WHERE name = ?', req.params.group_name, (err, group)=> {
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        if(group[0] == null) return res.status(404).json({"statuscode": 404, error: "Group not found"});
        con.query('SELECT * FROM locations WHERE location_id = ?', group[0].location_id, (err, locations)=> {
            if(err) return res.status(400).json({"statuscode": 400, error: err});
            locations[0].picture = "/locations/" + locations[0].location_id + "/picture";
            return res.json({
                location: locations[0]
            })
        });
    });
});

router.get('/:location_id/picture', (req, res) => {
    con.query('SELECT picture FROM locations WHERE location_id = ?', req.params.location_id, (err, pic) => {
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        if (pic[0] == null) return res.status(404).json({"statuscode": 404, "error": "Could not find location"})
        res.sendFile(path.join(__dirname, '..', pic[0].picture));
    });
});

module.exports = router;