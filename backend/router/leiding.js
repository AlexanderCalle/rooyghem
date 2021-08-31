const express = require('express');
const router = express.Router();
const con = require('../connect');
const logginCheck = require('../middleware/logginCheck');
const userCheck = require('../middleware/userCheck');

router.get('/info', logginCheck, userCheck, (req, res)=> {
    res.json({username: req.user.username});
});

// router.get('/bondsteam', (req, res)=> {
//     con.query('SELECT * FROM users WHERE bondsteam <> "/"', (err, users)=>{
//         if(err) return res.render('badrequest', {error: err});
//         res.render('bondsteam', {users: users});
//     });
// });

module.exports = router;