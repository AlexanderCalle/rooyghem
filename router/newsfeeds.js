const express = require('express');
const router = express.Router();
const con = require('../connect');
const authCheck = require('../middleware/authCheck');
const multer = require('multer');
const newsfeedChecker = require('../middleware/newsfeedChecker');
const compression = require('../middleware/compression');

// Multer middleware Save images
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, process.env.TEMP_PATH)
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ req.body.title.replace(/\s/g, '') + file.originalname);
        console.log(file);
    }
});


const upload = multer({ storage: storage });

// Route GET all newsfeeds + form
router.get('/',(req, res)=>{
    con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
        if (err) return res.render('badrequest', {error: err});
        res.render('newsfeeds_interface', {
            newsfeeds: newsfeeds,
            user: req.user,
            admin: req.admin,
            username: req.user.username,
            moment: require('moment')
        });
    });
});


router.get('/create',(req, res)=>{
    con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
        if (err) return res.render('badrequest', {error: err});
        res.render('create_newsfeed', {
            newsfeeds: newsfeeds,
            user: req.user,
            admin: req.admin,
            username: req.user.username,
            moment: require('moment')
        });
    });
});

// Route POST create newsfeed
router.post('/create', upload.single('image'), newsfeedChecker ,(req, res)=>{
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
            if(err) return res.render('badrequest', {error: err})
            res.redirect("/newsfeed");      
        });
    } else {
        con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
            if (err) return res.render('badrequest', {error: err});
            res.render('create_newsfeed', {
                newsfeeds: newsfeeds,
                user: req.user,
                admin: req.admin,
                username: req.user.username,
                moment: require('moment'),
                error: 'Geen foto gevonden!'
            });
        });
    }
});

// TODO: delete newsfeed
// Route DELETE One activity
router.get('/delete/:id',(req, res)=>{
    con.query('DELETE FROM newsfeeds WHERE feed_id = ?', req.params.id, (err, newsfeed)=>{
        if(err) return res.render('badrequest', {error: err});
        res.redirect('/newsfeed');
    });
});

// TODO: page for updating a newsfeed
// Router GET update newsfeed
router.get('/update/:id',(req, res)=>{
    con.query('SELECT * from newsfeeds WHERE feed_id = ?', req.params.id, (err, newsfeed)=>{
        if(err) return res.render('badrequest', {error: err});
        res.render('update_newsfeed', {
            newsfeed: newsfeed[0],
            admin: req.admin,
            username: req.user.username,
            user: req.user,
            moment: require('moment')
        });
    });
});

// TODO: update one newsfeed
// Route UPDATE One activity
router.put('/update/:id',(req, res)=>{
    const updated_newsfeed = {
        title: req.body.title,
        description: req.body.description,
        start_publication: req.body.start_publication,
        end_publication: req.body.end_publication,
        picture_path: req.body.picture_path,
        created_by: req.user.user_id
    }
    console.log(updated_newsfeed);
    if(updated_newsfeed.title != '' && updated_newsfeed.picture_path != '') {
        con.query(`UPDATE newsfeeds SET ? WHERE feed_id = ?`, [updated_newsfeed, req.params.id], (err, newsfeed)=>{
            if(err) return res.render('badrequest', {error: err});
            res.redirect('/newsfeed');
        });
    } else {
        con.query('SELECT * from newsfeeds WHERE feed_id = ?', req.params.id, (err, newsfeed)=>{
            if(err) return res.render('badrequest', {error: err});
            res.render('update_newsfeed', {
                newsfeed: newsfeed[0],
                admin: req.admin,
                username: req.user.username,
                moment: require('moment'),
                user: req.user,
                error: 'Niet alles is ingevuld!'
            });
        });
    }
});

module.exports = router;