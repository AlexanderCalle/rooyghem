const express = require('express');
const moment = require('moment');
const con = require('../connect');
const multer = require('multer');
const fs = require('fs');
const compression = require('../middleware/compression');
const router = express.Router();
const path = require('path');

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
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        return res.json({
            user: req.user,
            admin: req.admin,
            albums: albums,
        });
    });
});

router.get('/album/:id', (req, res) => {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
        if (err) return res.status(400).json({"statuscode": 400, error: err});

        con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, (err, pictures) => {
            if(err) return res.status(400).json({"statuscode": 400, error: err});
            const pictureUrls = [];
            pictures.forEach(picture => {
                pictureUrls.push('/albums/pictures/' + picture.pictures_id);
            });
            return res.json({
                user: req.user,
                admin: req.admin,
                album: album[0],
                pictures: pictureUrls
            });
        })
    });
});

router.get('/pictures/:id', (req, res) => {
    con.query('SELECT * FROM pictures WHERE pictures_id = ?', req.params.id, (err, pictures) => {
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        if(pictures[0] == null) return res.status(404).json({"statuscode": 404, "error": "Picture not found"});
        res.sendFile(path.join(__dirname, '..', pictures[0].path));
    })
});

// router.get('/create', (req, res)=> {
//     res.render('album_create', {
//         user: req.user,
//         admin: req.admin,
//     });
// });

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
            if(err) return res.status(400).json({"statuscode": 400, error: err});
            var dir = process.env.ALBUMS_PATH+ '/' + data.name + result.insertId + '/'
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                return res.json({"message": "Album succesfully created"});
            } else {
                return res.status(409).json({"statuscode": 409, "error": "Album already exists"});
            }
        });
    } else {
        return res.status(400).json({"statuscode": 400, "error": "Incomplete data"});
    }
});

// router.get('/update/:id', (req, res)=> {
//     con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
//         if(err) return res.status(400).json({"statuscode": 400, error: err});
//         res.render('album_update', {
//             user: req.user,
//             admin: req.admin,
//             album: album[0],
//             moment: require('moment')
//         });
//     });
// });

router.put('/update/:id', (req, res)=> {
    con.query('SELECT name FROM albums WHERE album_id = ?', req.params.id, (err, album)=>{
        if(err) return res.render('badrequest', {error: err});

        data = req.body;

        var dirOld = process.env.ALBUMS_PATH+ '/' + album[0].name + req.params.id + '/'
        var dirNew = process.env.ALBUMS_PATH+ '/' + data.name + req.params.id + '/'

        if(data.name != album[0].name) {
            fs.renameSync(dirOld, dirNew);
            con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, (err, pictures) => {
                if(err) return res.status(400).json({"statuscode": 400, error: err});
                pictures.forEach((picture) => {
                    console.log(picture.pictures_id);
                    const newPicDest = process.env.ALBUMS_PATH_SITE + '/' + data.name + req.params.id + '/' + picture.name;
                    con.query('UPDATE pictures SET path = ? WHERE pictures_id = ?', [newPicDest, picture.pictures_id], (err, res) => {
                        if(err) return res.status(400).json({"statuscode": 400, error: err});
                    })
                })
            });
        }

        album_data = {
            name: data.name,
            group_id: req.user.group_id,
            description: data.description,
            activity_start: data.activity_start,
            activity_end: data.activity_end,
        }

        con.query('UPDATE albums SET ? WHERE album_id = ?', [album_data ,req.params.id], (err, album)=> {
            if (err) return res.status(400).json({"statuscode": 400, error: err});
            return res.json({"message": "Album updated succesfully"});
        });
    });
});

router.get('/delete/:id', (req, res)=> {
    con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, async (err, pictures)=> {
        if (err) return res.status(400).json({"statuscode": 400, error: err});
        await pictures.forEach((picture)=> {
            console.log(picture.path);
            fs.unlinkSync('.'+picture.path);
            con.query('DELETE FROM pictures WHERE pictures_id = ?', picture.pictures_id, (err, result)=> {
                if (err) return res.status(400).json({"statuscode": 400, error: err});
                console.log('deleted');
            })
        });
        con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album)=> {
            if (err) return res.status(400).json({"statuscode": 400, error: err});

            const pic_destination = process.env.ALBUMS_PATH + '/' + album[0].name + album[0].album_id + '/'
            fs.rmdirSync(pic_destination);

            con.query('DELETE FROM albums WHERE album_id = ?', req.params.id, (err, album)=>{
                if(err) return res.status(400).json({"statuscode": 400, error: err});
                return res.json({"message": "Album deleted succesfully"});
            });
        });
    });
});

// router.get('/album/:id/add', (req, res) => {
//     con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album)=> {
//         if (err) return res.status(400).json({"statuscode": 400, error: err});
//         res.json({
//             user: req.user,
//             admin: req.admin,
//             album: album[0]
//         });
//     });
// });

router.post('/album/:id/add', (req, res) => { 
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, async(err, album)  => {
        if (err) return res.status(400).json({"statuscode": 400, error: err});

        fs.mkdirSync(process.env.TEMP_PATH + '/' + album[0].name + album[0].album_id);
    
        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, process.env.TEMP_PATH + '/' + album[0].name + album[0].album_id + '/')
            },
            filename: (req, file, cb) =>{
                cb(null, Date.now() + file.originalname.replace(/\s/g, ''));
            }
        });
        
        const upload =  multer({ storage: storage }).array('pic');

        function uploadFile() {
            return new Promise((resolve, reject) => {
              upload(req, res, (err) => {
                if (err) {
                  console.log(err); // Pass errors to Express.
                  reject(`Error: Something went wrong!`);
                } else if (req.files == undefined) {
                  resolve();
                } else if (!err && req.files.length > 0) {
                  console.log('uploaded file');
                  resolve();
                }
              });
            });
          }

        uploadFile().then(() => {
            const pic_destination = process.env.ALBUMS_PATH + '/' + album[0].name + album[0].album_id + '/'
            const pic_temp = process.env.TEMP_PATH + album[0].name + album[0].album_id
            compression(pic_temp, pic_destination);  
            req.files.forEach(function(file) {
                const pic_destination_site = process.env.ALBUMS_PATH_SITE + '/' + album[0].name + album[0].album_id + '/'
                const pic_data = {
                    name: file.filename,
                    album_id: album[0].album_id,
                    path: pic_destination_site + file.filename,
                    upload_date: moment(Date.now()).format('YYYY-MM-DD')
                }
    
                con.query('INSERT INTO pictures SET ?', pic_data, (err, pic)=> {
                    if(err) return res.status(400).json({"statuscode": 400, error: err});
                    console.log('succes');
                });
            });
            return res.json({"message": "Pictures were added to album"});
        })  
    });
});

router.get('/album/:album_id/pic/delete/:pictures_id', (req, res)=> {
    con.query('SELECT * FROM pictures WHERE pictures_id = ?', req.params.pictures_id, (err, pic)=> {
        if (err) return res.status(400).json({"statuscode": 400, error: err});
        if (pic[0] == null) return res.status(404).json({"statuscode": 404, "error": "Album not found"});
        fs.unlinkSync('.' + pic[0].path);
        con.query('DELETE FROM pictures WHERE pictures_id = ?', req.params.pictures_id, (err, pic)=>{
            if(err) return res.status(400).json({"statuscode": 400, error: err});
            return res.json({"message": "pictures succesfully deleted from album"});
        });
    });
});

// Checker routes

router.get('/checker', (req, res)=> {
    con.query('SELECT * FROM albums WHERE checked = 0', (err, albums)=>{
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        return res.json({
            admin: req.admin,
            user: req.user,
            albums: albums
        });
    });
});

// router.get('/check/:id', (req, res)=> {
//     con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album)=> {
//         if (err) return res.status(400).json({"statuscode": 400, error: err});
//         con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, (err, pictures)=> {
//             if (err) return res.status(400).json({"statuscode": 400, error: err});
//             res.render('pictures_check', {
//                 user: req.user,
//                 admin: req.admin,
//                 album: album[0],
//                 pictures: pictures,
//             })
//         });
//     });
// });

router.get('/check/:id/checked', (req, res)=> {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album)=> {
        if (err) return res.status(400).json({"statuscode": 400, error: err});

        const update_data = {
            checked: true,
            approved_by: req.user.id,
            approved_on: moment(Date.now()).format('YYYY-MM-DD')
        }

        con.query('UPDATE albums SET ? WHERE album_id = ?', [update_data, req.params.id], (err, result)=> {
            if (err) return res.status(400).json({"statuscode": 400, error: err});
            return res.json({"message": "Album was succesfully checked"});
        });
    });
});

// router.get('/album/:album_id/pic/delete/checker/:pictures_id', (req, res)=> {
//     con.query('SELECT * FROM pictures WHERE pictures_id = ?', req.params.pictures_id, (err, pic)=> {
//         if (err) return res.status(400).json({"statuscode": 400, error: err});
//         fs.unlinkSync('.' + pic[0].path);
//         con.query('DELETE FROM pictures WHERE pictures_id = ?', req.params.pictures_id, (err, pic)=>{
//             if(err) return res.status(400).json({"statuscode": 400, error: err});
//             return res.json({"message": "Pictures succesfully deleted"});
//         });
//     });
// });

module.exports = router;