const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Ouder comité page');
});

module.exports = router;