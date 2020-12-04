const express = require('express');
const router = express.Router();

router.get('/' , (req, res)=> {
    res.render('album_interface', {
        user: req.user,
        admin: req.admin,
    });
});

router.get('/create', (req, res)=> {
    res.render('album_create', {
        user: req.user,
        admin: req.admin,
    })
});

router.get('/checker', (req, res)=> {
    res.render('album_check', {
        admin: req.admin,
        user: req.user,
    })
});

module.exports = router;