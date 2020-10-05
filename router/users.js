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


router.get('/', authCheck, adminCheck,(req, res)=>{
    con.query('SELECT * FROM groups', (err, groups)=> {
        if(err) return res.json({err: err});
        con.query('SELECT * FROM users', (err, users)=>{
            if(err) return res.json({err: err});
            res.render('users', {groups: groups, users: users, admin: req.admin});
        });
    });
});

// FIND ALL USERS
router.get('/all', authCheck, adminCheck,(req, res)=> {
    con.query('SELECT * FROM users', (err, users)=>{
        if(err) return res.json({message: 'Failed to load'});
        res.json(users);
    });
});

// FIND SINGLE USER BY ID
router.get('/single/:id', authCheck, adminCheck,(req, res)=> {
    
    con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, user)=>{
        if(err) return res.json({message: 'Failed to find user'});
        res.json(user);
    });
});

// CREATE USER
router.post('/create', authCheck, adminCheck,(req, res)=> {
    const generated_id = crypto.randomBytes(11).toString('hex');
    console.log(generated_id);
    con.query('SELECT group_id FROM groups WHERE name = ?', req.body.group_name, (err, group)=> {
        const group_id = JSON.parse(JSON.stringify(group));
        bcrypt.hash(req.body.password, 11, (err, hash)=>{
            const user = {
                user_id: generated_id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
                passhash: hash,
                phone: req.body.phone,
                is_admin: req.body.is_admin,
                bondsteam: req.body.bondsteam,
                group_id: group_id[0].group_id
            }
            con.query('INSERT INTO users SET ?', user, (err, user)=> {
                if(err) return res.json({message: err});
                res.redirect('/users');
            });
        });
    });
});

router.get('/login', logginCheck, (req, res)=> {
    res.render('login')
});

// LOGIN USER + check password with hash
router.post('/login', (req, res)=>{
    const data = req.body;
    if(data.username !== '' && data.password !== '') {
        con.query('SELECT * FROM users WHERE username = ?', data.username, (err, user)=> {
            if(err) return res.json({err: 'Username does not exists'});
            if(user[0] == null) return res.json({err: 'Username doesnot exists'});
            bcrypt.compare(data.password, user[0].passhash, (err, isMatch)=>{
                if(err) return res.json({err: 'Failed to login'});
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
                    res.json({err: 'Password incorrect'});
                }
            });
        });
    } else {
        if(data.username == '') {
            res.json({err: 'Username cannot be empty'});
        } else if(data.password == '') {
            res.json({err: 'password cannot be empty'});
        }
    }
});

router.get('/logout', authCheck,(req, res)=> {
    try {
        res.clearCookie('auth').redirect('/');
    } catch (error) {
        res.json({
            message: error
        })
    }
});

router.get('/:id', authCheck, adminCheck, (req, res)=> {
    con.query('SELECT * FROM groups', (err, groups)=> {
        if(err) return res.json({err: err});
        con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, users)=>{
            if(err) return res.json({err: err});
            res.render('users_update', {groups: groups, user: users[0], admin: req.admin});
        });
    });
});

router.put('/:id', (req, res)=>{
    const data = req.body;
    con.query('SELECT group_id FROM groups WHERE name = ?', data.group_name, (err, group)=>{
        if(err) return res.json({message: err.message});
        const group_id = JSON.parse(JSON.stringify(group));
        if(data.password === '') {
            const user_data = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                username: data.username,
                phone: data.phone,
                is_admin: data.is_admin,
                bondsteam: data.bondsteam,
                group_id: group_id[0].group_id
            }
            con.query('UPDATE users SET ? WHERE user_id = ?', [user_data, req.params.id], (err, user)=> {
                if(err) return res.json({err: err.message});
                res.redirect('/users');
            });
        } else {
            bcrypt.hash(data.password, 11, (err, hash)=> {
                const user_data = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    username: data.username,
                    passhash: hash,
                    phone: data.phone,
                    is_admin: data.is_admin,
                    bondsteam: data.bondsteam,
                    group_id: group_id[0].group_id
                }
                con.query('UPDATE users SET ? WHERE user_id = ?', [user_data, req.params.id], (err, user)=> {
                    if(err) return res.json({err: err.message});
                    res.redirect('/users');
                });
            });
        }
    });
});

// DELETE ALL USERS
router.get('/delete/all', authCheck, adminCheck,(req, res)=> {
    con.query('DELETE FROM users', (err, users)=>{
        if(err) return res.json({err: err});
        res.send(`All users are deleted`);
    });
});

// DELTE SINGLE USER
router.get('/delete/single/:id', authCheck, adminCheck,(req, res)=> {
    con.query('DELETE FROM users WHERE user_id = ?', req.params.id, (err, user)=>{
        if(err) return res.json({err: err});
        res.send(`user ${user} is deleted`);
    });
});

module.exports = router;