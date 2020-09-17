const express = require('express');
const router = express.Router();

const kabouters = require('./bannenRouter/kabbies');
router.use('/kabouters', kabouters);

const paggaders = require('./bannenRouter/paggies');
router.use('/paggaders', paggaders);

const jkn = require('./bannenRouter/jkn');
router.use('/jongknapen', jkn);

const kn = require('./bannenRouter/kn');
router.use('/knapen', kn);

const jhn = require('./bannenRouter/jhn');
router.use('/jonghernieuwers', jhn);

const aspis = require('./bannenRouter/apsi');
router.use('/aspiranten', aspis);

const hn = require('./bannenRouter/hn');
router.use('/hernieuwers', hn);

router.get('/', (req, res)=> {
    res.send('bannen')
});

module.exports = router;