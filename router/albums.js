const express = require('express');
const moment = require('moment');
const con = require('../connect');
const router = express.Router();

router.get('/' , (req, res)=> {
    con.query('SELECT * FROM albums WHERE group_id = ?', req.user.group_id, (err, albums)=> {
        if(err) return res.render('badrequest', {error: err});
        res.render('album_interface', {
            user: req.user,
            admin: req.admin,
            albums: albums,
        });
    });
});

router.get('/create', (req, res)=> {
    res.render('album_create', {
        user: req.user,
        admin: req.admin,
    })
});

router.post('/create', (req, res)=> {
    data = req.body;

    
    if(data.name != '' && data.actvity_start != '' && data.activity_end != '') {
        creation_date = new Date(),
        album_data = {
            name: data.name,
            group_id: req.user.group_id,
            description: data.description,
            activity_start: data.activity_start,
            activity_end: data.activity_end,
            creation_date: moment(creation_date).format('YYYY-MM-DD HH:mm:ss'),
        }
        console.log(album_data);
        con.query('INSERT INTO `albums` SET ?', album_data, (err, album)=> {
            if(err) return res.render('badrequest', {error: err});
            res.send('ok')
        });
    } else {
        res.render('album_create', {
            user: req.user,
            admin: req.admin,
            error: 'Vul alles in!'
        })
    }
})

router.get('/checker', (req, res)=> {
    res.render('album_check', {
        admin: req.admin,
        user: req.user,
    })
});

module.exports = router;