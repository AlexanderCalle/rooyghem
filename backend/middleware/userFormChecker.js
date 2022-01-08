const con = require('../connect');
const fs = require('fs');

module.exports = (req, res, next) => {
    const data = req.body
    if(data.firstname && data.lastname && data.email && data.username && data.password && data.phone) {
        next();
    } else {
        res.status(400).json({"statuscode": 400, error: 'Vul alles in!'});
        if(req.file) {fs.unlinkSync(process.env.LEIDING_PATH + req.file.filename)}
    }
}