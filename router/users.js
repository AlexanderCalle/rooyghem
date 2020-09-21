const express = require('express');
const router = express.Router();
const con = require('../connect');

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
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            passhash: req.body.password,
            phone: req.body.phone,
            is_admin: req.body.is_admin,
            group_id: group_id[0].group_id
        }

        if(user != null) {
            con.query('INSERT INTO users SET ?', user, (err, user)=> {
                if(err) return res.json({message: err});
                res.send(`User: ${user.username} has been created`);
            });
        }
    });

});

// DELETE ALL USERS
router.get('/delete/all', (req, res)=> {
    con.query('DELETE * FROM users', (err, users)=>{
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

module.exports = router;