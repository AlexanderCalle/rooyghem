const express = require('express');
const router = express.Router();
const con = require('../connect');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


router.get('/', (req, res)=>{
    con.query('SELECT * FROM groups', (err, groups)=> {
        if(err) return res.json({err: err});
        con.query('SELECT * FROM users', (err, users)=>{
            if(err) return res.json({err: err});
            res.render('users', {groups: groups, users: users});
        });
    });
});

// FIND ALL USERS
router.get('/all', (req, res)=> {
    con.query('SELECT * FROM users', (err, users)=>{
        if(err) return res.json({message: 'Failed to load'});
        res.json(users);
    });
});

// FIND SINGLE USER BY ID
router.get('/single/:id', (req, res)=> {
    
    con.query('SELECT * FROM users WHERE user_id = ?', req.params.id, (err, user)=>{
        if(err) return res.json({message: 'Failed to find user'});
        res.json(user);
    });
});

// CREATE USER
router.post('/create', (req, res)=> {
    con.query('SELECT group_id FROM groups WHERE name = ?', req.body.group_name, (err, group)=> {
        const group_id = JSON.parse(JSON.stringify(group));
        bcrypt.hash(req.body.password, 11, (err, hash)=>{
            const user = {
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
    // const generated_id = crypto.randomBytes(11);
    // console.log(generated_id.toString('hex'));
});

// LOGIN USER + check password with hash
router.post('/login', (req, res)=>{
    const data = req.body;
    if(data.username !== '' && data.password !== '') {
        con.query('SELECT * FROM users WHERE username = ?', data.username, (err, user)=> {
            if(err) return res.json({err: 'Username does not exists'});
            if(user[0] == null) return res.json({err: 'Username doesnot exists'});
            console.log(user[0])
            bcrypt.compare(data.password, user[0].passhash, (err, isMatch)=>{
                if(err) return res.json({err: 'Failed to login'});
                if(isMatch) {
                    res.redirect('/activities');
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

// DELETE ALL USERS
router.get('/delete/all', (req, res)=> {
    con.query('DELETE FROM users', (err, users)=>{
        if(err) return res.json({err: err});
        res.send(`All users are deleted`);
    });
});

// DELTE SINGLE USER
router.get('/delete/single/:id', (req, res)=> {
    con.query('DELETE FROM users WHERE user_id = ?', req.params.id, (err, user)=>{
        if(err) return res.json({err: err});
        res.send(`user ${user} is deleted`);
    });
});

router.get('/login', (req, res)=> {
    res.render('login')
});

module.exports = router;