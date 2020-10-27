const express = require('express');
const router = express.Router();
const con = require('../connect');
const authCheck = require('../middleware/authCheck');

// Route GET all newsfeeds + form
router.get('/',(req, res)=>{
    con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
        if (err) return res.render('badrequest', {error: err});
        res.render('create_newsfeed', {
            newsfeeds: newsfeeds,
            user: req.user,
            admin: req.admin,
            moment: require('moment')
        });
    });
});

// TODO: implement viewing of one newsfeed
// router.get('/activity/:id', (req, res)=>{
//     con.query('SELECT * FROM activities WHERE activity_id = ?', req.params.id, (err, activity)=> {
//         if(err) return res.render('badrequest', {error: err});
//         res.render('./group_pages/single_activity', {
//             activity: activity[0],
//             moment: require('moment')
//         })
//     });
// });

// Route POST create newsfeed
router.post('/create',(req, res)=>{
    const newsfeed = {
        title: req.body.title,
        description: req.body.description,
        start_publication: req.body.start_publication,
        end_publication: req.body.end_publication,
        picture_path: req.body.picture_path,
        created_by: req.user.user_id
    }
    console.log(newsfeed);
    if(newsfeed.title != '' && newsfeed.picture_path != '') {
        con.query('INSERT INTO newsfeeds SET ?', newsfeed, (err, nf) => {
            if(err) {
                if(err.code = 'ER_TRUNCATED_WRONG_VALUE') {
                    con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
                        if (err) return res.render('badrequest', {error: err});
                        res.render('create_newsfeed', {
                            newsfeeds: newsfeeds,
                            user: req.user,
                            admin: req.admin,
                            moment: require('moment'),
                            error: 'Er is een datum niet ingevuld!'
                        });
                    });
                } else {
                    res.render('badrequest', {error: err})
                }
            } else {
                res.redirect("/newsfeed");
            }
        })
    } else {
        con.query('SELECT * FROM newsfeeds ORDER BY start_publication', (err, newsfeeds) => {
            if (err) return res.render('badrequest', {error: err});
            res.render('create_newsfeed', {
                newsfeeds: newsfeeds,
                user: req.user,
                admin: req.admin,
                moment: require('moment'),
                error: 'Vul alles in!'
            });
        });
    }
});

// TODO: delete newsfeed
// Route DELETE One activity
router.delete('/delete/:id',(req, res)=>{
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
                moment: require('moment'),
                error: 'Niet alles is ingevuld!'
            });
        });
    }
});

module.exports = router;