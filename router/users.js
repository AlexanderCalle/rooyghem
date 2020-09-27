const express = require('express');
const router = express.Router();
const con = require('../connect');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authCheck = require('../middleware/authCheck');
require('dotenv').config();


router.get('/', authCheck,(req, res)=>{
    con.query('SELECT * FROM groups', (err, groups)=> {
        if(err) return res.json({err: err});
        con.query('SELECT * FROM users', (err, users)=>{
            if(err) return res.json({err: err});
            res.render('users', {groups: groups, users: users});
        });
    });
});

// FIND ALL USERS
router.get('/all', authCheck,(req, res)=> {
    con.query('SELECT * FROM users', (err, users)=>{
        if(err) return res.json({message: 'Failed to load'});
        res.json(users);
    });
});

// FIND SINGLE USER BY ID
router.get('/single/:id', authCheck,(req, res)=> {
    
    con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, user)=>{
        if(err) return res.json({message: 'Failed to find user'});
        res.json(user);
    });
});

// CREATE USER
router.post('/create', authCheck,(req, res)=> {
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
                        is_admin: user[0].is_admin
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

// DELETE ALL USERS
router.get('/delete/all', authCheck,(req, res)=> {
    con.query('DELETE FROM users', (err, users)=>{
        if(err) return res.json({err: err});
        res.send(`All users are deleted`);
    });
});

// DELTE SINGLE USER
router.get('/delete/single/:id', authCheck,(req, res)=> {
    con.query('DELETE FROM users WHERE user_id = ?', req.params.id, (err, user)=>{
        if(err) return res.json({err: err});
        res.send(`user ${user} is deleted`);
    });
});

router.get('/login', (req, res)=> {
    res.render('login')
});

module.exports = router;