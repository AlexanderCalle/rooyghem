const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Aspiranten page');
});

module.exports = router;