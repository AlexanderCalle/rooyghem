const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    try {
        const token = req.cookies.auth;
        const userdata = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userdata;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Failed Authentication'
        });
    }
};