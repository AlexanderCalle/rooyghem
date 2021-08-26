const express = require('express');
const router = express.Router();
const con = require('../connect');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authCheck = require('../middleware/authCheck');
const adminCheck = require('../middleware/adminCheck');
const logginCheck = require('../middleware/logginCheck');
require('dotenv').config();
const multer = require('multer');
const userFormChecker = require('../middleware/userFormChecker');
const fs = require('fs');
const compression = require('../middleware/compression');

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

router.get('/', authCheck, adminCheck,(req, res)=>{
    con.query('SELECT * FROM `groups`', (err, groups)=> {
        if(err) return res.render('badrequest', {error: err});
        con.query('SELECT * FROM users ORDER BY lastname ASC, firstname ASC', (err, users)=>{
            if(err) return res.render('badrequest', {error: err});
            res.render('users_interface', {users: users, user:req.user, admin: req.admin, username: req.user.username});
        });
    });
});
router.get('/create', authCheck, adminCheck,(req, res)=>{
    con.query('SELECT * FROM `groups`', (err, groups)=> {
        if(err) return res.render('badrequest', {error: err});
        con.query('SELECT * FROM users', (err, users)=>{
            if(err) return res.render('badrequest', {error: err});
            res.render('users', {groups: groups, users: users, user:req.user, admin: req.admin, username: req.user.username});
        });
    });
});

// FIND ALL USERS
router.get('/all', authCheck, adminCheck,(req, res)=> {
    con.query('SELECT * FROM users', (err, users)=>{
        if(err) return res.render('badrequest', {error: err});
        res.json(users);
    });
});

// FIND SINGLE USER BY ID
router.get('/single/:id', authCheck, adminCheck,(req, res)=> {
    
    con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, user)=>{
        if(err) return res.json({message: 'Gebruiker werd niet gevonden'});
        res.json(user);
    });
});

// CREATE USER
router.post('/create', authCheck, adminCheck, upload.single('image'), userFormChecker, (req, res)=> {
    if(req.file) {
        const generated_id = crypto.randomBytes(11).toString('hex');
        compression( process.env.TEMP_PATH + req.file.filename, process.env.LEIDING_PATH)
        bcrypt.hash(req.body.password, 11, (err, hash)=>{   
            const user = {
                user_id: generated_id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
                passhash: hash,
                phone: req.body.phone,
                is_admin: req.body.is_admin || 0,
                bondsteam: req.body.bondsteam,
                path_pic: process.env.LEIDING_PATH_PIC + req.file.filename,
                group_id: req.body.group_id,
                is_banleader: req.body.is_banleader || 0,
            }
            con.query('INSERT INTO users SET ?', user, (err, user)=> {
                if(err) {
                    if(err.code === `ER_DUP_ENTRY`) {
                        con.query('SELECT * FROM `groups`', (err, groups)=> {
                            if(err) return res.render('badrequest', {error: err});
                            con.query('SELECT * FROM users', (err, users)=>{
                                if(err) return res.render('badrequest', {error: err});
                                res.render('users', {
                                    groups: groups, 
                                    users: users, 
                                    user: req.user,
                                    admin: req.admin,
                                    username: req.user.username,
                                    error: 'Gebruikersnaam bestaat al'
                                });
                            });
                        });
                    } else {
                        res.render('badrequest', {error: err});
                    }
                } else {
                    res.redirect('/users')
                }
            });
        });
    } else {
        con.query('SELECT * FROM `groups`', (err, groups)=> {
            if(err) return res.render('badrequest', {error: err});
            con.query('SELECT * FROM users', (err, users)=>{
                if(err) return res.render('badrequest', {error: err});
                res.render('users', {
                    groups: groups, 
                    users: users, 
                    admin: req.admin,
                    user: req.user,
                    username: req.user.username,
                    error: 'Geen foto gevonden'
                });
            });
        });
    }

});

router.get('/login', logginCheck, (req, res)=> {
    res.render('login', {username: req.user.username})
});

// LOGIN USER + check password with hash
router.post('/login', (req, res)=>{
    const data = req.body;
    if(data.username !== '' && data.password !== '') {
        con.query('SELECT * FROM users WHERE username = ?', data.username, (err, user)=> {
            if(err) return res.render('badrequest', {error: err});
            if(user[0] == null) return res.render('login', {error: 'Deze gebruikersnaam bestaat niet'});
            bcrypt.compare(data.password, user[0].passhash, (err, isMatch)=>{
                if(err) return res.render('badrequest', {error: err});
                if(isMatch) {
                    const payload = {
                        user_id: user[0].user_id,
                        username: user[0].username,
                        is_admin: user[0].is_admin,
                        group_id: user[0].group_id
                    }
                    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '12h' });
                    res.cookie('auth', token).redirect('/activities');
                } else {
                    res.render('login', {error: 'Password klopt niet',username: req.user.username});
                }
            });
        });
    } else {
        if(data.username == '') {
            res.render('login', {error: 'Vul uw gebruikersnaam is', username: req.user.username});
        } else if(data.password == '') {
            res.render('login', {error: 'Vul uw wachtwoord in', username: req.user.username});
        }
    }
});

router.get('/logout', authCheck,(req, res)=> {
    try {
        res.clearCookie('auth').redirect('/');
    } catch (error) {
        res.render('badrequest');
    }
});

router.get('/:id', authCheck, adminCheck, (req, res)=> {
    con.query('SELECT * FROM `groups`', (err, groups)=> {
        if(err) return res.render('badrequest', {error: err});
        con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=>{
            if(err) return res.render('badrequest', {error: err});
            res.render('users_update', {groups: groups, user:req.user, userInfo: users[0], admin: req.admin, username: req.user.username});
        });
    });
});

router.put('/:id', authCheck, adminCheck, upload.single('image'), userFormChecker, (req, res)=>{
    const data = req.body;

    if(req.file) {
        compression( process.env.TEMP_PATH + req.file.filename, process.env.LEIDING_PATH)
        con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=> {
            if(err) return res.render('badrequest', {error: err});
            fs.unlinkSync( '.' + users[0].path_pic);
            const user_data = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                username: data.username,
                phone: data.phone,
                is_admin: data.is_admin || 0,
                bondsteam: data.bondsteam,
                path_pic: process.env.LEIDING_PATH_PIC + req.file.filename,
                group_id: data.group_id,
                is_banleader: data.is_banleader  || 0,
            }
            con.query('UPDATE users SET ? WHERE user_id = ?', [user_data, req.params.id], (err, user)=> {
                if(err) {
                    if(err.code == `ER_DUP_ENTRY`) {
                        con.query('SELECT * FROM `groups`', (err, groups)=> {
                            if(err) return res.render('badrequest', {error: err});
                            con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=>{
                                if(err) return res.render('badrequest', {error: err});
                                res.render('users_update', {groups: groups, user: users[0], admin: req.admin, error: 'Gebruikersnaam is al in gebruik', username: req.user.username});
                            });
                        });
                    } else {
                        res.render('badrequest', {error: err});
                    }
                } else {
                    res.redirect('/users');
                }
            });
        });
        
    } else {
        const user_data = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            username: data.username,
            phone: data.phone,
            is_admin: data.is_admin || 0,
            bondsteam: data.bondsteam,
            group_id: data.group_id,
            is_banleader: data.is_banleader || 0
        }
        con.query('UPDATE users SET ? WHERE user_id = ?', [user_data, req.params.id], (err, user)=> {
            if(err) {
                if(err.code == `ER_DUP_ENTRY`) {
                    con.query('SELECT * FROM `groups`', (err, groups)=> {
                        if(err) return res.render('badrequest', {error: err});
                        con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=>{
                            if(err) return res.render('badrequest', {error: err});
                            res.render('users_update', {groups: groups, user: users[0], admin: req.admin, error: 'Gebruikersnaam is al in gebruik', username: req.user.username});
                        });
                    });
                } else {
                    res.render('badrequest', {error: err});
                }
            } else {
                res.redirect('/users');
            }
        });
    } 
});

// DELTE SINGLE USER
router.get('/delete/single/:id', authCheck, adminCheck,(req, res)=> {
    con.query('DELETE FROM users WHERE user_id = ?', req.params.id, (err, user)=>{
        if(err) return res.render('badrequest', {error: err});
        res.redirect('/users');
    });
});

module.exports = router;