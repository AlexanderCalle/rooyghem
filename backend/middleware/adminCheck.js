const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    if(req.admin) {
        next();
    } else {
        res.status(401).json({error: 'No Admin'});
    }
}