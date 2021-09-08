const express = require('express')
const router = express.Router();
const con = require('../connect');
const authCheck = require('../middleware/authCheck');
const adminCheck = require('../middleware/adminCheck');
const userCheck = require('../middleware/userCheck');
const excel = require('exceljs');
const fs = require('fs');

// Route GET form page
// page to order
router.get('/', (req, res) => {
    con.query('SELECT name FROM `groups`', (err, groups) => {
        if(err) return res.render('badrequest', {error: err})
        res.render('wafelbak_order', {
            groups: groups,
            username: req.user.username
        });
    })
});

// Route POST order
router.post('/order', (req, res) => {
   const order = {
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       group: req.body.group,
       total_amount: req.body.total_amount,
       email: req.body.email
    }

    con.query('INSERT INTO orders SET ?', order, (err, order) => {
        if(err) return res.render('badrequest', {error: err});
        res.render('succes_order', {
            username: req.user.username
        })
    })

});

// Route GET all current orders
// only the orders that are from this year
router.get('/orders', userCheck, authCheck, adminCheck,(req, res) => {
    con.query('SELECT * FROM `orders` WHERE YEAR(order_date) = YEAR(CURRENT_DATE())', (err, orders) => {
        if(err) return res.render('badrequest', {error: err});
        res.render("all_orders", {
            orders: orders,
            user: req.user,
            admin: req.admin,
            username: req.user.username
        })
    })
});

// Route DELETE order
router.get('/order/delete/:id', userCheck, authCheck, adminCheck, (req, res) => {
    con.query('DELETE FROM `orders` WHERE order_id = ?', req.params.id, (err, orders) => {
        if(err) return res.render('badrequest', {error: err});
        res.redirect('/wafelbak/orders')
    })
});

//Route GET excel file
// excel file with orders data
router.get('/excel', userCheck, authCheck, adminCheck, (req, res) => {
    con.query('SELECT * FROM `orders` WHERE YEAR(order_date) = YEAR(CURRENT_DATE())', (err, orders, fields) => {
        if(err) return res.render('badrequest', {error: err});

        const jsonOrders = JSON.parse(JSON.stringify(orders));

        let workbook = new excel.Workbook(); // creating workbook
        let worksheet = workbook.addWorksheet('Bestellingen'); // creating worksheet

        // Worksheet Header
        worksheet.columns = [
            {header: 'Order nummer', key: 'order_id', width: 10},
            {header: 'Voornaam', key: 'firstname', width: 30},
            {header: 'Achternaam', key: 'lastname', width: 30},
            {header: 'Email', key: 'email', width: 40},
            {header: 'Ban', key: 'group', width: 30},
            {header: 'Aantal pakketten', key: 'total_amount', width: 30},
            {header: 'Datum', key: 'order_date', width: 30}
        ];

        // Add Array Rows
        worksheet.addRows(jsonOrders);

        // Write to file
        workbook.xlsx.writeFile('./public/excel/orders.xlsx')
            .then(() => {
                const file = './public/excel/orders.xlsx';
                res.download(file);
            })

    })
})

module.exports = router;