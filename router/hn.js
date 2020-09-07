const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Hernieuwers page');
});

module.exports = router;