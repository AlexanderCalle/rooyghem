const express = require('express')
const router = express.Router();
const con = require('../connect');

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
router.get('/orders', (req, res) => {
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
router.get('/order/delete/:id', (req, res) => {
    con.query('DELETE FROM `orders` WHERE order_id = ?', req.params.id, (err, orders) => {
        if(err) return res.render('badrequest', {error: err});
        res.redirect('/wafelbak/orders')
    })
});

module.exports = router;