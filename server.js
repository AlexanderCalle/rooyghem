const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000 || procces.env.PORT;

//middelware
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('', (req, res)=> {
    res.render('index');
});

// Routers
//Route /Bannen
const bannen = require('./router/bannen');
app.use('/bannen', bannen);
// Route /lieding
const leiding = require('./router/leiding');
app.use('/leiding', leiding);
// Route /oc
const oc = require('./router/oc');
app.use('/oc', oc);

app.listen(port, ()=> {
    console.log('Server running on port ' + port);
});