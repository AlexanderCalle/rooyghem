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
// router.get('/', (req, res) => {
//     con.query('SELECT name FROM `groups`', (err, groups) => {
//         if (err) return res.render('badrequest', { error: err })
//         res.render('wafelbak_order', {
//             groups: groups,
//             username: req.user.username
//         });
//     })
// });

// Route GET order by id
router.get('/:id', (req, res) => {
    con.query('SELECT * FROM `orders` WHERE order_id = ?', req.params.id, (err, order) => {
        if (err) return res.render('badrequest', { error: err });
        res.status(200).json({
            firstname: order[0].firstname,
            lastname: order[0].lastname,
            pick_up_moment: order[0].pick_up_moment,
            total_amount: order[0].total_amount,
        })
    })
})

// Route POST order
router.post('/order', (req, res) => {
    const order = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        group: req.body.group,
        total_amount: req.body.total_amount,
        phone: req.body.phone,
        email: req.body.email,
        pick_up_moment: req.body.pick_up_moment
    };
    console.log(req.body)
    console.log("Email order: " + order.email);
    console.log("Order: " + order);
    let moment;

    switch (order.pick_up_moment) {

        case 'donderdag':
            moment = 'donderdag 28 oktober vanaf 19u'
            break;

        case 'vrijdag':
            moment = 'vrijdag 29 oktober vanaf 16u'
            break;

        case 'zaterdag':
            moment = 'zaterdag 30 oktober van 9u tot 12u'
            break;

        default:
            break;
    }



    con.query('INSERT INTO orders SET ?', order, (err, order) => {
        if (err) return res.render('badrequest', { error: err });
        console.log(order.insertId);
        res.status(200).send({
            order_id: order.insertId
        })
    })
});

// Route GET all current orders
// only the orders that are from this year
router.get('/orders', userCheck, authCheck, adminCheck, (req, res) => {
    con.query('SELECT * FROM `orders` WHERE YEAR(order_date) = YEAR(CURRENT_DATE())', (err, orders) => {
        if (err) return res.render('badrequest', { error: err });
        var total_nr = 0;
        orders.forEach(order => {
            total_nr += order.total_amount;
        });
        res.status(200).send({
            orders: orders,
            total_nr: total_nr
        });
    })
});

// Route DELETE order
router.get('/order/delete/:id', userCheck, authCheck, adminCheck, (req, res) => {
    con.query('DELETE FROM `orders` WHERE order_id = ?', req.params.id, (err, orders) => {
        if (err) return res.render('badrequest', { error: err });
        res.status(200).send('succes')
    })
});

//Route GET excel file
// excel file with orders data
router.get('/excel', userCheck, authCheck, adminCheck, (req, res) => {
    con.query('SELECT * FROM `orders` WHERE YEAR(order_date) = YEAR(CURRENT_DATE())', (err, orders, fields) => {
        if (err) return res.render('badrequest', { error: err });

        const jsonOrders = JSON.parse(JSON.stringify(orders));

        let workbook = new excel.Workbook(); // creating workbook
        let worksheet = workbook.addWorksheet('Bestellingen'); // creating worksheet

        // Worksheet Header
        worksheet.columns = [
            { header: 'Order nummer', key: 'order_id', width: 10 },
            { header: 'Voornaam', key: 'firstname', width: 30 },
            { header: 'Achternaam', key: 'lastname', width: 30 },
            { header: 'telefoonnummer', key: 'phone', width: 40 },
            { header: 'Ban', key: 'group', width: 30 },
            { header: 'Aantal pakketten', key: 'total_amount', width: 30 },
            { header: 'Ophaal moment', key: 'pick_up_moment', width: 30 },
            { header: 'Datum', key: 'order_date', width: 30 }
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
