const express = require('express');
const moment = require('moment');
const con = require('../connect');
const multer = require('multer');
const fs = require('fs');
const compression = require('../middleware/compression');
const router = express.Router();
const path = require('path');
const authCheck = require('../middleware/authCheck');
const adminCheck = require('../middleware/adminCheck');

// Get all albums
router.get('/', (req, res) => {
    con.query('SELECT * FROM albums WHERE checked = 1', (err, albums) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        return res.json({
            albums: albums
        });
    });
});

router.get('/groups/albums/:group_id', (req, res) => {
    con.query('SELECT * FROM albums WHERE group_id = ?', req.params.group_id, (err, albums) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        if (albums.length == 0) return res.status(404).json({ "statuscode": 404, "error": "Group not found" });
        return res.status(200).json({ albums: albums })
    })
})

// Get albums of group
router.get('/groups/:group_id', (req, res) => {
    if (isNaN(req.params.group_id)) {
        con.query('SELECT group_id FROM groups WHERE name = ?', req.params.group_id, (err, groups) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });
            con.query('SELECT * FROM albums WHERE group_id = ? AND checked = 1', groups[0], (err, albums) => {
                if (err) return res.status(400).json({ "statuscode": 400, "error": err });
                if (albums.length == 0) return res.status(404).json({ "statuscode": 404, "error": "Group not found" });
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
                return res.status(200).send(groupedAlbums);
            })
        })
    } else {
        con.query('SELECT * FROM albums WHERE group_id = ? AND checked = 1', req.params.group_id, (err, albums) => {
            if (err) return res.status(400).json({ "statuscode": 400, "error": err });
            if (albums.length == 0) return res.status(404).json({ "statuscode": 404, "error": "Group not found" });
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
            return res.status(200).send(groupedAlbums);
        })
    }
});

router.get('/album/:id', (req, res) => {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });

        con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, (err, pictures) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });
            const pictureUrls = [];
            pictures.forEach(picture => {
                pictureUrls.push(`${BACKEND_HOST}/albums/pictures/` + picture.pictures_id);
            });
            return res.status(200).json({
                album: album[0],
                pictures: pictureUrls
            });
        })
    });
});

router.get('/pictures/:id', (req, res) => {
    con.query('SELECT * FROM pictures WHERE pictures_id = ?', req.params.id, (err, pictures) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        if (pictures[0] == null) return res.status(404).json({ "statuscode": 404, "error": "Picture not found" });
        res.sendFile(path.join(__dirname, '..', pictures[0].path));
    })
});

router.post('/create', (req, res) => {
    data = req.body;

    const creation_date = new Date(),
        album_data = {
            name: data.name,
            group_id: data.group_id,
            description: data.description,
            activity_start: data.activity_start,
            activity_end: data.activity_end,
            creation_date: moment(creation_date).format('YYYY-MM-DD HH:mm:ss'),
        }
    con.query('INSERT INTO `albums` SET ?', album_data, (err, result) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        var dir = process.env.ALBUMS_PATH + '/' + data.name + result.insertId + '/'
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            return res.status(201).json({ "message": "Album succesfully created", "album_id": result.insertId });
        } else {
            return res.status(409).json({ "statuscode": 409, "error": "Album already exists" });
        }
    });
});

router.get('/:id', (req, res) => {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        res.status(200).send({
            album: album[0],
        });
    });
});

router.put('/update/:id', (req, res) => {
    con.query('SELECT name FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
        if (err) return res.render('badrequest', { error: err });

        data = req.body.album;

        var dirOld = process.env.ALBUMS_PATH + '/' + album[0].name + req.params.id + '/'
        var dirNew = process.env.ALBUMS_PATH + '/' + data.name + req.params.id + '/'

        if (data.name != album[0].name) {
            fs.renameSync(dirOld, dirNew);
            con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, (err, pictures) => {
                if (err) return res.status(400).json({ "statuscode": 400, error: err });
                pictures.forEach((picture) => {
                    const newPicDest = process.env.ALBUMS_PATH_SITE + '/' + data.name + req.params.id + '/' + picture.name;
                    con.query('UPDATE pictures SET path = ? WHERE pictures_id = ?', [newPicDest, picture.pictures_id], (err, res) => {
                        if (err) return res.status(400).json({ "statuscode": 400, error: err });
                    })
                })
            });
        }

        album_data = {
            name: data.name,
            group_id: req.body.group_id,
            description: data.description,
            activity_start: data.activity_start,
            activity_end: data.activity_end,
        }

        con.query('UPDATE albums SET ? WHERE album_id = ?', [album_data, req.params.id], (err, album) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ "statuscode": 400, error: err });
            }
            return res.json({ "message": "Album updated succesfully" });
        });
    });
});

router.delete('/delete/:id', (req, res) => {
    con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, async (err, pictures) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        await pictures.forEach((picture) => {
            console.log(picture.path);
            fs.unlinkSync('.' + picture.path);
            con.query('DELETE FROM pictures WHERE pictures_id = ?', picture.pictures_id, (err, result) => {
                if (err) return res.status(400).json({ "statuscode": 400, error: err });
                console.log('deleted');
            })
        });
        con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });

            const pic_destination = process.env.ALBUMS_PATH + '/' + album[0].name + album[0].album_id + '/'
            fs.rmdirSync(pic_destination);

            con.query('DELETE FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
                if (err) return res.status(400).json({ "statuscode": 400, error: err });
                return res.json({ "message": "Album deleted succesfully" });
            });
        });
    });
});

let ws;
function writeStream(path) {
    // console.log(path);
    ws = fs.createWriteStream(path)
}

router.post('/pic/UploadChunks', (req, res) => {
    let size = 0;
    req.on('data', function (data) {
        size += data.length;
        ws.write(data)
    })
    req.on('end', function () {
        res.status(201).send("uploaded!")
    })
})

router.get('/pic/openStream/:albumName/:filename', async (req, res) => {
    let path = `./public/images/albums/${req.params.albumName}/${req.params.filename}`
    await writeStream(path);
    res.status(200).send(req.params.filename)
});


router.post('/album/:id/add', (req, res) => {
    ws.end();
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, async (err, album) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        const pic_destination_site = process.env.ALBUMS_PATH_SITE + '/' + album[0].name + album[0].album_id + '/'
        const file = req.body.body.file;
        const pic_data = {
            name: file,
            album_id: album[0].album_id,
            path: pic_destination_site + file,
            upload_date: moment(Date.now()).format('YYYY-MM-DD')
        }

        con.query('INSERT INTO pictures SET ?', pic_data, (err, pic) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });
            res.status(200).send('succes');
        });
    });
});

router.delete('/album/:album_id/pic/delete/:pictures_id', (req, res) => {
    con.query('SELECT * FROM pictures WHERE pictures_id = ?', req.params.pictures_id, (err, pic) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        if (pic[0] == null) return res.status(404).json({ "statuscode": 404, "error": "Album not found" });
        fs.unlinkSync('.' + pic[0].path);
        con.query('DELETE FROM pictures WHERE pictures_id = ?', req.params.pictures_id, (err, pic) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });
            return res.status(200).json({ "message": "pictures succesfully deleted from album" });
        });
    });
});

// Checker routes

router.get('/checker', (req, res) => {
    con.query('SELECT * FROM albums WHERE checked = 0', (err, albums) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        return res.status(200).json({
            albums: albums
        });
    });
});

router.get('/check/:id', (req, res) => {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });
        con.query('SELECT * FROM pictures WHERE album_id = ?', req.params.id, (err, pictures) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });
            res.status(200).send({
                album: album[0],
                pictures: pictures,
            })
        });
    });
});

router.post('/check/:id/checked', (req, res) => {
    con.query('SELECT * FROM albums WHERE album_id = ?', req.params.id, (err, album) => {
        if (err) return res.status(400).json({ "statuscode": 400, error: err });

        const update_data = {
            checked: true,
            approved_by: req.body.user_id,
            approved_on: moment(Date.now()).format('YYYY-MM-DD')
        }

        con.query('UPDATE albums SET ? WHERE album_id = ?', [update_data, req.params.id], (err, result) => {
            if (err) return res.status(400).json({ "statuscode": 400, error: err });
            return res.status(200).json({ "message": "Album was succesfully checked" });
        });
    });
});



module.exports = router;