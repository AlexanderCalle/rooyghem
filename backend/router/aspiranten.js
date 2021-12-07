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
const aspirantFormChecker = require('../middleware/aspirantFormChecker');
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

router.post('/create', authCheck, upload.single('image'), aspirantFormChecker, (req, res) => {
    if (req.user.group_id != 6 && !req.admin) {
        return res.status(403).json({"error": "User not authorized to add aspirant"});
    }
    
    if (req.file) {
        const generated_id = crypto.randomBytes(11).toString('hex');
        compression(process.env.TEMP_PATH + req.file.filename, process.env.ASPIRANT_PATH);
        const aspirant = {
            aspi_id: generated_id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            path_pic: process.env.ASPIRANT_PATH + req.file.filename
        }
        con.query('INSERT INTO aspiranten SET ?', aspirant, (err, aspi) => {
            console.log(err);
            if (err) return res.status(500).json({"error": "Something went wrong with database: " + err});
            return res.json({"message": "aspirant werd gemaakt"});
        })
    } else {
        return res.status(422).json({"error": "Geen foto gevonden"});
    }
});

router.put('/single/:id', authCheck, upload.single('image'), aspirantFormChecker, (req, res) => {
    if (req.user.group_id != 6 && !req.admin) {
        return res.status(403).json({"error": "User not authorized to update aspirant"});
    }
    
    const data = req.body;
    var aspi_data = {
        firstname: data.firstname,
        lastname: data.lastname
    };
    if (req.file) {
        con.query('SELECT path_pic FROM aspiranten WHERE aspi_id = ?', req.params.id, (err, path_pic) => {
            if (err) return res.status(500).json({"error": 'Something went wrong with database: ' + err});
            fs.unlinkSync('.' + path_pic[0]);
        })
        compression(process.env.TEMP_PATH + req.file.filename, process.env.ASPIRANT_PATH);
        aspi_data['path_pic'] = process.env.ASPIRANT_PATH + req.file.filename;
    }

    con.query('UPDATE aspiranten SET ? WHERE aspi_id = ?', [aspi_data, req.params.id], (err, aspi) => {
        if (err) {
            return res.status(500).json({"error": "Something went wrong with database: " + err});
        }
        return res.status(200).json({"message": "Aspirant was updated"});
    });
});

router.delete('/delete/single/:id', authCheck, (req, res) => {
    if (req.user.group_id != 6 && !req.admin) {
        return res.status(403).json({"error": "User not authorized to delete aspirant"});
    }
    con.query('DELETE FROM aspiranten WHERE aspi_id = ?', req.params.id, (err, aspi) => {
        if(err) return res.status(500).json({"error": "Something went wrong with database: " + err});
        fs.unlinkSync('.' + aspi[0].path_pic);
        return res.json({"message": "Deletion succesfull"});
    })
});

module.exports = router;