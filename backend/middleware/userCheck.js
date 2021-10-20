const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    try {
        console.log(req.cookies);
        const token = req.cookies.auth;
        const userdata = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userdata;
        console.log(req.user);
        if(userdata.is_admin === 1){
            req.admin = true;
            next();
        } else {
            req.admin = false;
            next();
        }
    } catch (error) {
        console.log(error);
        req.user = {
            username: undefined
        }
        next();
    }
};