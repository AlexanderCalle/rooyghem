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
const path = require('path');

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

router.get('/', (req, res) => {
    con.query('SELECT aspi_id, firstname, lastname FROM aspiranten ORDER BY lastname ASC, firstname ASC', (err, aspis) => {
        if(err) return res.status(400).json({"error": err});
        aspis.forEach(aspi => {
            aspi.picture = '/aspiranten/single/' + aspi.aspi_id + '/picture';
        });
        return res.json({aspis: aspis});
    })
});

router.get('/single/:id', (req, res) => {
    con.query('SELECT aspi_id, firstname, lastname FROM aspiranten WHERE aspi_id = ?', req.params.id, (err, aspi) => {
        if (err) return res.status(400).json({'error': err});
        if (aspi.length == 0) return res.status(404).json({'error': 'Aspirant werd niet gevonden'});
        aspi[0].picture = '/aspiranten/single/'+aspi[0].aspi_id+'/picture';
        return res.json({'aspi': aspi[0]});
    })
})

router.get('/single/:id/picture', (req, res) => {
    con.query("SELECT path_pic FROM aspiranten WHERE aspi_id = ?", req.params.id, (err, pic_path) => {
        if (err) return res.status(400).json({"error": err});
        if (pic_path == null || pic_path.length == 0 ||  pic_path[0].path_pic == null) return res.status(404).json({"error": "No picture was found for aspirant"});
        res.sendFile(path.join(__dirname, '..', pic_path[0].path_pic));
    });
})

module.exports = router;