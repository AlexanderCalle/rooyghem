const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    try {
        const token = req.cookies.auth;
        jwt.verify(token, process.env.TOKEN_SECRET, (err, verified)=> {
            if(err) return next();
            res.redirect('/activities');
        });
    } catch (error) {
        next();
    }
};