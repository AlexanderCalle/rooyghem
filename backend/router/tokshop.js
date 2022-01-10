const express = require('express');
const router = express.Router();
const con = require('../connect');
const adminCheck = require('../middleware/adminCheck');
const authCheck = require('../middleware/authCheck');
const tokshopItemFormChecker = require('../middleware/tokshopItemFormCheck');
const tokshopOrderFormChecker = require('../middleware/tokshopOrderFormCheck');
const compression = require('../middleware/compression');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const crypto = require('crypto');

require('dotenv').config();

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

// TOKSHOP/ITEMS

router.get('/items', (req, res) => {
    con.query('SELECT tokshopitem_id, name, description, price FROM tokshopitems', (err, items) => {
        if (err) return res.status(400).json({"error": err});
        items.forEach(item => {
            item.picture = req.protocol + '://' + req.headers.host + '/tokshop/items/' + item.tokshopitem_id + '/picture';
        });
        return res.json({items: items});
    });
});

router.get('/items/:id', (req, res) => {
    con.query('SELECT tokshopitem_id, name, description, price FROM tokshopitems WHERE tokshopitem_id = ?', req.params.id, (err, items) => {
        if (err) return res.status(400).json({error: err});
        if (items.length == 0) return res.status(404).json({error: "Item with id " + req.params.id + " not found."});
        items[0].picture = req.protocol + '://' + req.headers.host + '/tokshop/items/' + req.params.id + '/picture';
        return res.json({item: items[0]});
    });
});

router.get('/items/:id/picture', (req, res) => {
    con.query('SELECT picture_path FROM tokshopitems WHERE tokshopitem_id = ?', req.params.id, (err, picture) => {
        if (err) return res.status(400).json({error: err});
        if (picture.length === 0) return res.status(404).json({"error": "Tokshopitem not found"});
        if (picture[0].picture_path === null) {
            // TODO: return default picture
            res.sendFile(path.join(__dirname, '..', process.env.TOKSHOP_ITEMS_PATH_PIC + 'default.png'));
        } else {
            res.sendFile(path.join(__dirname, '..', picture[0].picture_path));
        }
    });
});

router.post('/items', authCheck, adminCheck, upload.single('image'), tokshopItemFormChecker, (req, res) => {
    var path_pic = null;
    if (req.file) {
        compression(process.env.TEMP_PATH + req.file.filename, process.env.TOKSHOP_ITEMS_PATH_PIC);
        path_pic = process.env.TOKSHOP_ITEMS_PATH_PIC + req.file.filename
    }

    const tokshopItem = {
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        picture_path: path_pic
    };

    con.query('INSERT INTO tokshopitems SET ?', tokshopItem, (err, item) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({error: "Item already exists"});
            } else {
                return res.status(400).json({error: err});
            }
        }
        return res.status(201).json({createdItem: req.protocol + '://' + req.headers.host + '/tokshop/items/' + item.insertId});
    })
});

router.put('/items/:id', authCheck, adminCheck, upload.single('image'), tokshopItemFormChecker, (req, res) => {
    const data = req.body;
    var item_data = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price)
    };
    if (req.file) {
        compression(process.env.TEMP_PATH + req.file.filename, process.env.TOKSHOP_ITEMS_PATH_PIC);
        con.query('SELECT picture_path FROM tokshopitems WHERE tokshopitem_id = ?;', req.params.id, (err, item) => {
            if (err) return res.status(400).json({error: err});
            if (item.length === 0) return res.status(404).json({error: "Item with id " + req.params.id + " not found"});
            if (item[0].picture_path !== null) {
                fs.unlinkSync('.' + item[0].picture_path);
            }
        });
        item_data.picture_path = process.env.TOKSHOP_ITEMS_PATH_PIC + req.file.filename;
    }

    con.query('UPDATE tokshopitems SET ? WHERE tokshopitem_id = ?', [item_data, req.params.id], (err, item) => {
        if(err) {
            if (err.code === `ER_DUP_ENTRY`) {
                return res.status(409).json({'error': 'Already an item with name ' + item_data.name});
            }
        }
        if (item.affectedRows === 0) {
            return res.status(404).json({'error': 'Item with id ' + req.params.id + ' not found'});
        }
        return res.status(200).json({updatedItem: req.protocol + '://' + req.headers.host + '/tokshop/items/' + req.params.id});
    })
});

router.delete('/items/:id', authCheck, adminCheck, (req, res) => {
    con.query('DELETE FROM tokshopitems WHERE tokshopitem_id = ?', req.params.id, (err, result) => {
        if (err) return res.status(400).json({error: err});
        if (result.affectedRows === 0) return res.status(404).json({error: "Item with id " + req.params.id + " not found"});
        return res.status(204);
    });
});

// TOKSHOP/ORDERS

router.get('orders', (req, res) => {});

router.post('/orders', tokshopOrderFormChecker, (req, res) => {
    console.log(req.body);
    const data = req.body;
    const orderId = crypto.randomBytes(11).toString('hex').slice(0, 256);
    const order = {
        tokshoporder_id: orderId,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        group_id: data.group_id,
        ordered_on: moment().format('YYYY-MM-DD'),
        payed_on: data.payed_reference ? moment().format('YYYY-MM-DD') : null,
        payed_reference: data.payed_reference
    };

    var items = [];
    items.forEach(item => {
        const itemId = crypto.randomBytes(11).toString('hex').slice(0, 256);
        items.push([itemId, orderId, item.tokshopitem_id, item.amount]);
    });

    con.query('INSERT INTO tokshoporders SET ?', order, (err, order) => {
        if(err) return res.status(500).json({error: err});
    });

    con.query('INSERT INTO tokshoporderitems (tokshoporderitem_id, tokshoporder_id, tokshopitem_id, amount) VALUES ?', items, (err, result) => {
        if(err) {
            con.query('DELETE FROM tokshoporders WHERE tokshoporder_id = ?', orderId, (err, resp) => {});
            return res.status(500).json({error: err});
        }
        return res.status(204);
    })

})

module.exports = router;