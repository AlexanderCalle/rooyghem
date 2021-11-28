const con = require('../connect');
const fs = require('fs');

module.exports = (req, res, next) => {
    console.log(req.body);
    if(req.body.title  && req.body.description && req.body.start_publication && req.body.end_publication ) {
        next();
    } else {
        res.status(400).json({"statuscode": 400, error: 'Vul alles in!'});
        if(req.file) {fs.unlinkSync(process.env.NEWSFEED_PATH + req.file.filename);}
    }
}