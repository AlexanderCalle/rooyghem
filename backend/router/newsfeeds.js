const express = require('express');
const router = express.Router();
const con = require('../connect');
const authCheck = require('../middleware/authCheck');
const multer = require('multer');
const newsfeedChecker = require('../middleware/newsfeedChecker');
const compression = require('../middleware/compression');
const path = require('path');
const adminCheck = require('../middleware/adminCheck');
const userCheck = require('../middleware/userCheck');

// Multer middleware Save images
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        if(file) {
            cb(null, process.env.TEMP_PATH)
        }
    },
    filename: (req, file, cb) =>{
        if (file) {
            cb(null, Date.now()+ req.body.title.replace(/\s/g, '') + file.originalname);
        }
    }
});


const upload = multer({ storage: storage });

// Route GET all newsfeeds + form
router.get('/',(req, res)=>{
    con.query('SELECT * FROM newsfeeds WHERE end_publication > CURRENT_DATE() ORDER BY start_publication', (err, newsfeeds) => {
        if (err) return res.status(400).json({"statuscode": 400, error: err});
        newsfeeds.forEach(feed => {
            feed.picture_path = "/newsfeeds/" + feed.feed_id + "/picture";
        })
        res.json({
            newsfeeds: newsfeeds,
            user: req.user,
            admin: req.admin,
            moment: require('moment')
        });
    });
});

router.get('/:feed_id/picture', (req, res) => {
    con.query('SELECT picture_path FROM newsfeeds WHERE feed_id = ?', req.params.feed_id, (err, pic) => {
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        res.sendFile(path.join(__dirname, '..', pic[0].picture_path));
    });
});

router.get('/backoffice', userCheck, adminCheck, (req, res)=>{
    con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
        if (err) return res.status(400).json({"statuscode": 400, error: err});
        return res.json({
            "statuscode": 200,
            newsfeeds: newsfeeds,
        });
    });
});

router.get('/:feed_id', (req, res) => {
    con.query('SELECT * FROM newsfeeds WHERE feed_id = ?', req.params.feed_id, (err, newsfeed) => {
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        if(newsfeed.length === 0) return res.status(404).json({"statuscode": 404, "error": "no newsfeed with given id"})
        newsfeed[0].picture_path = req.protocol + '://' + req.headers.host + "/newsfeeds/" + newsfeed[0].feed_id;
        console.log(newsfeed[0]);
        res.json({
            newsfeed: newsfeed[0]
        });
    });
});

// Route POST create newsfeed
router.post('/create', authCheck, adminCheck, userCheck, upload.single('image'), newsfeedChecker, (req, res)=>{
    if(req.file){
        compression(process.env.TEMP_PATH + req.file.filename, process.env.NEWSFEED_PATH)
        const newsfeed = {
            title: req.body.title,
            description: req.body.description,
            start_publication: req.body.start_publication,
            end_publication: req.body.end_publication,
            picture_path: process.env.NEWSFEED_PATH + req.file.filename,
            created_by: req.user.user_id
        }
        con.query('INSERT INTO newsfeeds SET ?', newsfeed, (err, nf) => {
            if(err) return res.status(400).json({"statuscode": 400, error: err});
            return res.json({"statuscode": 200, "message": "Feed succesfully created"});    
        });
    } else {
        console.log(req.body.title);
        return res.status(400).json({"statuscode": 400, "error": "No picture was given"});
    }
});

// TODO: delete newsfeed
// Route DELETE One activity
router.delete('/delete/:id', authCheck, adminCheck, userCheck, (req, res)=>{
    con.query('DELETE FROM newsfeeds WHERE feed_id = ?', req.params.id, (err, newsfeed)=>{
        if(err) return res.status(400).json({"statuscode": 400, error: err});
        res.json({"statuscode": 200, "message": "Feed deleted succesfully"});
    });
});

// TODO: page for updating a newsfeed
// Router GET update newsfeed
// router.get('/update/:id',(req, res)=>{
//     con.query('SELECT * from newsfeeds WHERE feed_id = ?', req.params.id, (err, newsfeed)=>{
//         if(err) return res.render('badrequest', {error: err});
//         res.render('update_newsfeed', {
//             newsfeed: newsfeed[0],
//             admin: req.admin,
//             username: req.user.username,
//             user: req.user,
//             moment: require('moment')
//         });
//     });
// });

// TODO: update one newsfeed
// Route UPDATE One activity
router.put('/update/:id', authCheck, adminCheck, userCheck, upload.single('image'), newsfeedChecker, (req, res)=>{
    const updated_newsfeed = {
        title: req.body.title,
        description: req.body.description,
        start_publication: req.body.start_publication,
        end_publication: req.body.end_publication,
        created_by: req.user.user_id
    }
    console.log(updated_newsfeed);

    if (req.file) {
        compression(process.env.TEMP_PATH + req.file.filename, process.env.NEWSFEED_PATH);
        updated_newsfeed.picture_path = process.env.NEWSFEED_PATH + req.file.filename
    }

    // TODO: handle optional file paramater
    if(updated_newsfeed.title != '') {
        con.query(`UPDATE newsfeeds SET ? WHERE feed_id = ?`, [updated_newsfeed, req.params.id], (err, newsfeed)=>{
            if(err) return res.status(400).json({"statuscode": 400, error: err});
            return res.json({"statuscode": 200, "message": "Feed updated succesfully"});
        });
    } else {
        // con.query('SELECT * from newsfeeds WHERE feed_id = ?', req.params.id, (err, newsfeed)=>{
        //     if(err) return res.render('badrequest', {error: err});
        //     res.render('update_newsfeed', {
        //         newsfeed: newsfeed[0],
        //         admin: req.admin,
        //         username: req.user.username,
        //         moment: require('moment'),
        //         user: req.user,
        //         error: 'Niet alles is ingevuld!'
        //     });
        // });
        return res.status(400).json({"statuscode": 400, "error": "Data is incomplete"});
    }
});

module.exports = router;