const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Mysql middleware
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Falco230!',
    database: 'rooyghem'
});

// Create connection with Mysql
con.connect((err)=> {
    if(err) return console.log('Error connecting to Mysql');
    console.log('Connected to Mysql');
});

router.get('/', (req, res)=> {
    res.render('office');
});

// Router GET * users
router.get('/users', (req, res)=> {
    con.query('SELECT * FROM users', (err, rows)=> {
        if(err) throw err;
        res.render('users', {
            users: rows
        })
    });
});

// router GET a single user
router.get('/:id', (req, res)=> {
    const id = req.params.id;
    con.query('SELECT * FROM users WHERE id = ?', id, (err, user)=> {
        if(err) return res.json({message: 'Failed'});
        res.json(user);
    });
});

// router POST new user
router.post('/', (req, res, next)=> {
    const user = {
        name: req.body.name,
        password: req.body.password,
        ban: req.body.ban
    };

    con.query('INSERT INTO users SET ?', user, (err, use) =>{
        if(err) return res.json({message: 'Name most be unique'});

        res.send('User: ' + user.name + ' is gemaakt');
    });
});

// router DELETE user by ID
router.delete('/:id', (req, res)=> {
    const id = req.params.id;
    con.query('DELETE FROM users WHERE id = ?', id, (err, result)=> {
        if(err) return res.json(err);

        res.json({
            "message": "deleted " + result.affectedRows + "row(s)",
        });
    });
});

module.exports = router;