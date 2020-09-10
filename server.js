const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000; //env.process.PORT

//middelware
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('', (req, res)=> {
    res.render('index');
});

const kabbies = require('./router/kabbies');
app.use('/kabouters', kabbies);

const paggies = require('./router/paggies');
app.use('/pagaders', paggies);

const jkn = require('./router/jkn');
app.use('/jongknapen', jkn);

const kn = require('./router/kn');
app.use('/knapen', kn);

const jhn = require('./router/jhn');
app.use('/jonghernieuwers', jhn);

const aspi = require('./router/apsi');
app.use('/aspiranten', aspi);

const leiding = require('./router/leiding');
app.use('/leiding', leiding);

const hn = require('./router/hn');
app.use('/hernieuwers', hn);

const oc = require('./router/oc');
app.use('/oc', oc);

app.listen(port, ()=> {
    console.log('Server running on port '+port);
});