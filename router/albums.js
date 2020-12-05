const express = require('express');
const moment = require('moment');
const con = require('../connect');
const multer = require('multer');
const fs = require('fs');
const compression = require('../middleware/compression');
const router = express.Router();

// Multer middleware Save images
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, process.env.TEMP_PATH)
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + file.originalname.replace(/\s/g, ''));
        console.log(file);
    }
});


const upload = multer({ storage: storage });

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

router.get('/album/:id', (req, res) => {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
        if (err) return res.render('badrequest', {error: err});
        con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, (err, pictures) => {
            if(err) return res.render('badrequest', {error: err});
            res.render('album_photos', {
                user: req.user,
                admin: req.admin,
                album: album[0],
                pictures: pictures
            });
        })
    });
});

router.get('/create', (req, res)=> {
    res.render('album_create', {
        user: req.user,
        admin: req.admin,
    });
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
        con.query('INSERT INTO `albums` SET ?', album_data, (err, result)=> {
            if(err) return res.render('badrequest', {error: err});
            var dir = process.env.ALBUMS_PATH+ '/' + data.name + result.insertId + '/'
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                res.redirect('/albums/album/' + result.insertId);
            }
        });
    } else {
        res.render('album_create', {
            user: req.user,
            admin: req.admin,
            error: 'Vul alles in!'
        });
    }
});

router.get('/update/:id', (req, res)=> {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
        if(err) return res.render('badrequest', {error: err});
        res.render('album_update', {
            user: req.user,
            admin: req.admin,
            album: album[0],
            moment: require('moment')
        });
    });
});

router.put('/update/:id', (req, res)=> {
    data = req.body;
    album_data = {
        name: data.name,
        group_id: req.user.group_id,
        description: data.description,
        activity_start: data.activity_start,
        activity_end: data.activity_end,
    }

    con.query('UPDATE albums SET ? WHERE album_id = ?', [album_data ,req.params.id], (err, album)=> {
        if (err) return res.render('badrequest', {error: err});
        res.redirect('/albums')
    });
});

router.get('/delete/:id', (req, res)=> {
    con.query('DELETE FROM albums WHERE album_id = ?', req.params.id, (err, album)=>{
        if(err) return res.render('badrequest', {error: err});
        res.redirect('/albums');
    });
});

router.get('/album/:id/add', (req, res) => {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album)=> {
        if (err) return res.render('badrequest', {error: err});
        res.render('pic_add', {
            user: req.user,
            admin: req.admin,
            album: album[0]
        });
    });
});
router.post('/album/:id/add',upload.array('pic') , (req, res) => {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, async (err, album)  => {
        if (err) return res.render('badrequest', {error: err});
        
        await req.files.forEach(function(file) {
            const pic_destination = process.env.ALBUMS_PATH + '/' + album[0].name + album[0].album_id + '/'
            const pic_destination_site = process.env.ALBUMS_PATH_SITE + '/' + album[0].name + album[0].album_id + '/'
            compression( process.env.TEMP_PATH + file.filename, pic_destination);
            const pic_data = {
                name: file.filename,
                album_id: album[0].album_id,
                path: pic_destination_site + file.filename,
                upload_date: moment(Date.now()).format('YYYY-MM-DD')
            }

            con.query('INSERT INTO pictures SET ?', pic_data, (err, pic_data)=> {
                if(err) return res.render('badrequest', {error: err});
                console.log('succes');
            })
        });

        res.redirect('/albums/album/' + album[0].album_id)
    });
});

router.get('/album/:album_id/pic/delete/:pictures_id', (req, res)=> {
    con.query('SELECT * FROM pictures WHERE pictures_id = ?', req.params.pictures_id, (err, pic)=> {
        if (err) return res.render('badrequest', {error: err});
        fs.unlinkSync('.' + pic[0].path);
        con.query('DELETE FROM pictures WHERE pictures_id = ?', req.params.pictures_id, (err, pic)=>{
            if(err) return res.render('badrequest', {error: err});
            res.redirect('/albums/album/' + req.params.album_id);
        });
    });
});

router.get('/checker', (req, res)=> {
    con.query('SELECT * FROM albums WHERE checked = 0', (err, albums)=>{
        if(err) return res.render('checker', {error: err});
        res.render('album_check', {
            admin: req.admin,
            user: req.user,
            albums: albums
        });
    });
});

module.exports = router;