const express = require('express');

const app = express();
const port = env.process.PORT || 3000;

app.get('', (req, res)=> {
    res.send('Ksa rooyghem');
});

app.listen(port, ()=> {
    console.log('Server running on port '+port);
});